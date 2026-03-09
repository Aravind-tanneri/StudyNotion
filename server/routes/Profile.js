const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { updateProfile, updateDisplayPicture } = require("../controllers/Profile");

router.put("/updateProfile", auth, updateProfile);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

module.exports = router;