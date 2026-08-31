const express = require("express");
const router = express.Router();
const { auth, isInstructorOrAdmin } = require("../middlewares/auth");
const { updateProfile, updateDisplayPicture, getAllUserDetails, getEnrolledCourses, deleteAccount, instructorDashboard, markCourseComplete, removeCourseFromEnrollment } = require("../controllers/Profile");

router.put("/updateProfile", auth, updateProfile);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getUserDetails", auth, getAllUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.post("/markCourseComplete", auth, markCourseComplete);
router.post("/removeCourse", auth, removeCourseFromEnrollment);
router.delete("/deleteProfile", auth, deleteAccount);
router.get("/instructorDashboard", auth, isInstructorOrAdmin, instructorDashboard);
module.exports = router;