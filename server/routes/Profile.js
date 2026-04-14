const express = require("express");
const router = express.Router();
const { auth,isInstructor } = require("../middlewares/auth");
const { updateProfile, updateDisplayPicture, getAllUserDetails, getEnrolledCourses, deleteAccount, instructorDashboard } = require("../controllers/Profile");

router.put("/updateProfile", auth, updateProfile);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getUserDetails", auth, getAllUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.delete("/deleteProfile", auth, deleteAccount);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);
module.exports = router;