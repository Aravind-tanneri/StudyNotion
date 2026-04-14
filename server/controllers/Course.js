const Course = require("../models/Course");
const Tag = require("../models/Tag");
const User = require("../models/User");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
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

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const courseDetails = await Course.findOne({ _id: courseId })
            .populate({ path: "instructor", populate: { path: "profile" } })
            .populate({ path: "courseContent", populate: { path: "subSection" } })
            .populate("ratingAndReviews")
            .populate("tag")
            .exec();

        if (!courseDetails) {
            return res.status(400).json({ success: false, message: `Could not find course with id: ${courseId}` });
        }

        return res.status(200).json({
            success: true,
            data: { courseDetails },
            message: "Course Details Fetched Successfully",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const updates = req.body;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        if (req.files) {
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url;
        }

        for (const key in updates) {
            if (updates.hasOwnProperty(key) && key !== "courseId" && key !== "thumbnailImage") {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key]);
                } else {
                    course[key] = updates[key];
                }
            }
        }
        await course.save();

        const updatedCourse = await Course.findOne({ _id: courseId })
            .populate({ path: "instructor", populate: { path: "profile" } })
            .populate({ path: "courseContent", populate: { path: "subSection" } })
            .populate("ratingAndReviews")
            .populate("tag")
            .exec();

        return res.json({ success: true, message: "Course updated successfully", data: updatedCourse });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // Unenroll students
        const studentsEnrolled = course.studentsEnrolled;
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, { $pull: { courses: courseId } });
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent;
        for (const sectionId of courseSections) {
            const section = await Section.findById(sectionId);
            if (section) {
                const subSections = section.subSection;
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }
            await Section.findByIdAndDelete(sectionId);
        }

        await Course.findByIdAndDelete(courseId);
        return res.status(200).json({ success: true, message: "Course deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        const courseDetails = await Course.findOne({ _id: courseId })
            .populate({ path: "instructor", populate: { path: "profile" } })
            .populate({ path: "courseContent", populate: { path: "subSection" } })
            .populate("ratingAndReviews")
            .populate("tag")
            .exec();

        if (!courseDetails) {
            return res.status(400).json({ success: false, message: `Could not find course with id: ${courseId}` });
        }

        let courseProgressCount = await CourseProgress.findOne({ courseID: courseId, userId: userId });
        let completedVideos = courseProgressCount?.completedVideos || [];

        return res.status(200).json({
            success: true,
            data: { courseDetails, completedVideos },
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.getInstructorCourses = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const instructorCourses = await Course.find({ instructor: instructorId }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: instructorCourses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Failed to retrieve instructor courses", error: error.message });
    }
};

exports.updateCourseProgress = async (req, res) => {
    try {
        const { courseId, subSectionId } = req.body;
        const userId = req.user.id;

        const subSection = await SubSection.findById(subSectionId);
        if (!subSection) {
            return res.status(404).json({ success: false, message: "Invalid SubSection" });
        }

        let courseProgress = await CourseProgress.findOne({ courseID: courseId, userId: userId });
        if (!courseProgress) {
            return res.status(404).json({ success: false, message: "Course progress does not exist" });
        }

        if (courseProgress.completedVideos.includes(subSectionId)) {
            return res.status(400).json({ success: false, message: "Lecture already completed" });
        }

        courseProgress.completedVideos.push(subSectionId);
        await courseProgress.save();

        return res.status(200).json({ success: true, message: "Lecture completed" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // Fetch selected category and populate all courses (no status filter - seed data has no status)
        const selectedCategory = await Tag.findById(categoryId)
            .populate({
                path: "course",
                populate: [
                    { path: "ratingAndReviews", populate: { path: "user", select: "name image" } },
                    { path: "instructor", select: "name image" },
                    { path: "tag", select: "name" },
                ],
            })
            .exec();

        if (!selectedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Fetch a different (random) category to use as "differentCategory"
        const otherCategories = await Tag.find({ _id: { $ne: categoryId } })
            .populate({
                path: "course",
                populate: [
                    { path: "ratingAndReviews", populate: { path: "user", select: "name image" } },
                    { path: "instructor", select: "name image" },
                    { path: "tag", select: "name" },
                ],
            })
            .exec();

        // Pick a random category that has at least one course
        const categoriesWithCourses = otherCategories.filter(c => c.course && c.course.length > 0);
        const differentCategory = categoriesWithCourses.length > 0
            ? categoriesWithCourses[Math.floor(Math.random() * categoriesWithCourses.length)]
            : otherCategories[0] || null;

        // Get top selling courses across all categories
        const allCourses = await Course.find({})
            .populate({ path: "ratingAndReviews", populate: { path: "user", select: "name image" } })
            .populate({ path: "instructor", select: "name image" })
            .populate({ path: "tag", select: "name" });

        const mostSellingCourses = [...allCourses]
            .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
            .slice(0, 10);

        return res.status(200).json({
            success: true,
            data: { selectedCategory, differentCategory, mostSellingCourses },
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};