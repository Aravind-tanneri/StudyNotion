const express = require("express");
const router = express.Router();

const { auth, isStudent, isInstructor, isAdmin } = require("../middlewares/auth");
const {
    createCourse,
    showAllCourses,
    getCourseDetails,
    editCourse,
    deleteCourse,
    getFullCourseDetails,
    getInstructorCourses,
    updateCourseProgress,
    getCategoryPageDetails,
} = require("../controllers/Course");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/Subsection");
const { createCategory, showAllCategories } = require("../controllers/Category");
const { createRating, getAverageRating, getAllRating } = require("../controllers/RatingAndReview");

// Course Routes
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/editCourse", auth, isInstructor, editCourse);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.get("/getAllCourses", showAllCourses);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

// Section Routes
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

// SubSection Routes
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// Category Routes
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", getCategoryPageDetails);

// Rating and Review
router.post("/createRating", auth, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRating", getAllRating);

// Course Progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

module.exports = router;