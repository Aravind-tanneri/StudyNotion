const express = require("express");
const router = express.Router();
const { auth,isInstructor } = require("../middlewares/auth");
const { updateProfile, updateDisplayPicture } = require("../controllers/Profile");
const { instructorDashboard } = require("../controllers/Profile")

router.put("/updateProfile", auth, updateProfile);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
module.exports = router;