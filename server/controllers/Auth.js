const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({ success: false, message: "User is already registered." });
        }

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully! 📧",
            otp,
        });
    } catch (error) {
        console.log("ACTUAL ERROR IN SEND_OTP:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.signup = async (req, res) => {
    try {

        const { name, email, password, accountType, contactNumber, otp } = req.body;

        if (!name || !email || !password || !otp) {
            return res.status(403).json({ success: false, message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already registered." });
        }

        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        
        if (recentOtp.length === 0) {
            return res.status(400).json({ success: false, message: "OTP not found." });
        } else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dob: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            accountType,
            contactNumber,
            profile: profileDetails._id,
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully! ",
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Signup failed. Please try again." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).populate("profile");
        if (!user) {
            return res.status(401).json({ success: false, message: "User is not registered." });
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };
            
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully! ✅",
            });
        } else {
            return res.status(401).json({ success: false, message: "Incorrect password." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Login failed." });
    }
};  