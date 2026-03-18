const mongoose = require("mongoose");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;

    if (!rating || !review || !courseId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const course = await Course.findById(courseId).select(
      "studentsEnrolled ratingAndReviews"
    );

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found." });
    }

    const isEnrolled = course.studentsEnrolled.some(
      (id) => id.toString() === userId
    );
    if (!isEnrolled) {
      return res.status(401).json({
        success: false,
        message: "User is not enrolled in this course.",
      });
    }

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      _id: { $in: course.ratingAndReviews },
    });
    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "You have already reviewed this course.",
      });
    }

    const ratingReview = await RatingAndReview.create({
      user: userId,
      rating,
      review,
    });

    await Course.findByIdAndUpdate(
      courseId,
      { $push: { ratingAndReviews: ratingReview._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully.",
      data: ratingReview,
    });
  } catch (error) {
    console.error("CREATE RATING ERROR:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create rating." });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res
        .status(400)
        .json({ success: false, message: "courseId is required." });
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const result = await Course.aggregate([
      { $match: { _id: courseObjectId } },
      {
        $lookup: {
          from: "ratingandreviews",
          localField: "ratingAndReviews",
          foreignField: "_id",
          as: "reviews",
        },
      },
      { $unwind: "$reviews" },
      {
        $group: {
          _id: "$_id",
          averageRating: { $avg: "$reviews.rating" },
          ratingCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          averageRating: 1,
          ratingCount: 1,
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Average rating fetched successfully.",
        averageRating: 0,
        ratingCount: 0,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Average rating fetched successfully.",
      averageRating: result[0].averageRating,
      ratingCount: result[0].ratingCount,
    });
  } catch (error) {
    console.error("GET AVERAGE RATING ERROR:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch average rating." });
  }
};

exports.getAllRating = async (req, res) => {
  try {
    const allRatings = await RatingAndReview.aggregate([
      { $sort: { _id: -1 } }, // "most recent" without timestamps
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $lookup: {
          from: "courses",
          let: { ratingId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$$ratingId", "$ratingAndReviews"] },
              },
            },
            {
              $project: {
                _id: 1,
                courseName: 1,
              },
            },
          ],
          as: "courseDetails",
        },
      },
      {
        $unwind: {
          path: "$courseDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          rating: 1,
          review: 1,
          user: {
            _id: "$userDetails._id",
            name: "$userDetails.name",
          },
          course: {
            _id: "$courseDetails._id",
            courseName: "$courseDetails.courseName",
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "All ratings fetched successfully.",
      data: allRatings,
    });
  } catch (error) {
    console.error("GET ALL RATING ERROR:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch ratings." });
  }
};

