const express = require("express");
const router = express.Router();

const { auth,isStudent, isInstructor,isAdmin } = require("../middlewares/auth");
const { createCourse, showAllCourses } = require("../controllers/Course");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");

const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/Subsection");
const { createCategory, showAllCategories } = require("../controllers/Category");

const { capturePayment, verifySignature } = require("../controllers/Payments");

const { updateProfile, updateDisplayPicture } = require("../controllers/Profile");

router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getAllCourses", showAllCourses);

router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection/:sectionId", auth, isInstructor, deleteSection);

router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", auth, isStudent, verifySignature);

router.put("/updateProfile", auth, updateProfile); 
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

module.exports = router;