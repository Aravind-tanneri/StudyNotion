const Course = require("../models/Course");
const Tag = require("../models/Tag");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/fileUploader");
require("dotenv").config();

exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body;
        
        const thumbnail = req.files.thumbnailImage;

        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        
        if (!instructorDetails) {
            return res.status(404).json({ success: false, message: "Instructor details not found" });
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag: tag,
            thumbnail: thumbnailImage.secure_url,
        });

        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            { $push: { courses: newCourse._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Course Created Successfully! 🎓",
            data: newCourse,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Failed to create course" });
    }
};

exports.showAllCourses = async (req, res) => {
    try {
        
        const allCourses = await Course.find(
            {}, 
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true,
            }
        )
        .populate("instructor")
        .exec();

        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data",
            error: error.message,
        });
    }
};