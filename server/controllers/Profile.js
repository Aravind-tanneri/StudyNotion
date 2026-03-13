const Profile = require("../models/Profile");
const User = require("../models/User");
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
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();

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
        ).populate("additionalDetails").exec();

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


const Course = require("../models/Course");

// We fetch and calculate the analytics for our instructor dashboard
exports.instructorDashboard = async (req, res) => {
  try {
    // We fetch all courses created by our currently logged-in instructor
    const courseDetails = await Course.find({ instructor: req.user.id });

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