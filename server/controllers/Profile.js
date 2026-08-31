const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const { uploadImageToCloudinary } = require("../utils/fileUploader");
require("dotenv").config();

exports.updateProfile = async (req, res) => {
    try {
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        const id = req.user.id; 

        if (!contactNumber || !gender || !id) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const userDetails = await User.findById(id);
        const profileId = userDetails.profile;
        const profileDetails = await Profile.findById(profileId);

        profileDetails.dob = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        const updatedUserDetails = await User.findById(id).populate("profile").exec();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;

        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        ).populate("profile").exec();

        res.send({
            success: true,
            message: "Image Updated successfully",
            data: updatedProfile,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// We fetch and calculate the analytics for our instructor dashboard
exports.instructorDashboard = async (req, res) => {
  try {
    // Admins see platform-wide stats, instructors see only their own courses
    const courseFilter = req.user.accountType === "Admin" ? {} : { instructor: req.user.id };
    const courseDetails = await Course.find(courseFilter);

    // We map through our array of courses to calculate the math for each one
    const courseData = courseDetails.map((course) => {
      // We count exactly how many students are inside the enrolled array
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      
      // We multiply the student count by the price to find our total revenue
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // We create a fresh object containing only the specific stats our charts need
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });

    // We successfully send our calculated analytics back to the frontend
    res.status(200).json({
      success: true,
      courses: courseData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        await Profile.findByIdAndDelete({ _id: user.profile });
        
        // TODO: Unenroll user from all enrolled courses
        
        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "User cannot be deleted successfully" });
    }
};

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("profile").exec();
        res.status(200).json({ success: true, message: "User Data fetched successfully", data: userDetails });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        let userDetails = await User.findOne({ _id: userId })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: { path: "subSection" },
                },
            })
            .exec();
        if (!userDetails) {
            return res.status(400).json({ success: false, message: `Could not find user with id: ${userId}` });
        }

        const progressRecords = await CourseProgress.find({ userId });

        const courses = userDetails.courses.map((course) => {
            const totalSubSections = course.courseContent.reduce(
                (total, section) => total + (section.subSection?.length || 0),
                0
            );
            const progressRecord = progressRecords.find(
                (record) => String(record.courseID) === String(course._id)
            );
            const completedVideos = progressRecord?.completedVideos?.length || 0;
            const progressPercentage =
                totalSubSections === 0 ? 0 : Math.round((completedVideos / totalSubSections) * 100);

            const totalDuration = course.courseContent.reduce(
                (total, section) =>
                    total +
                    (section.subSection || []).reduce(
                        (sum, subSection) =>
                            sum + (Number(subSection.timeDuration) || 0),
                        0
                    ),
                0
            );

            return {
                ...course._doc,
                totalSubSections,
                completedVideos,
                progressPercentage,
                totalDuration,
            };
        });

        return res.status(200).json({ success: true, data: courses });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Marks every lecture of a course as completed for the current student
exports.markCourseComplete = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        if (!courseId) {
            return res.status(400).json({ success: false, message: "courseId is required" });
        }

        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: { path: "subSection" },
        });

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const allSubSectionIds = course.courseContent.flatMap((section) =>
            (section.subSection || []).map((subSection) => subSection._id)
        );

        const courseProgress = await CourseProgress.findOneAndUpdate(
            { courseID: courseId, userId },
            { $addToSet: { completedVideos: { $each: allSubSectionIds } } },
            { new: true, upsert: true }
        );

        return res.status(200).json({
            success: true,
            message: "Course marked as completed",
            data: { completedVideos: courseProgress.completedVideos },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Unenrolls the current student from a course and clears related progress
exports.removeCourseFromEnrollment = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        if (!courseId) {
            return res.status(400).json({ success: false, message: "courseId is required" });
        }

        await User.findByIdAndUpdate(userId, { $pull: { courses: courseId } });
        await Course.findByIdAndUpdate(courseId, { $pull: { studentsEnrolled: userId } });
        await CourseProgress.deleteMany({ courseID: courseId, userId });

        return res.status(200).json({
            success: true,
            message: "Course removed from your enrollments",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};