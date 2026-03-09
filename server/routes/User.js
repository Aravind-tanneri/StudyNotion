const express = require("express");
const router = express.Router();

const { login, signup,sendOTP } = require("../controllers/Auth");


router.post("/signup", signup);
router.post("/login", login);
router.post("/sendotp", sendOTP);

module.exports = router;