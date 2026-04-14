const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
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

        const userImage = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            accountType,
            contactNumber,
            profile: profileDetails._id,
            image: userImage,
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

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const token = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = token;
        user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
        await user.save();

        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
        const resetLink = `${frontendUrl}/update-password/${token}`;

        const title = "Password Reset Link";
        const body = `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2>Password Reset</h2>
                <p>We received a request to reset your password.</p>
                <p>
                    Click the link below to set a new password (valid for 15 minutes):
                </p>
                <p>
                    <a href="${resetLink}" target="_blank" rel="noreferrer">${resetLink}</a>
                </p>
                <p>If you did not request this, you can safely ignore this email.</p>
            </div>
        `;

        await mailSender(email, title, body);

        return res.status(200).json({
            success: true,
            message: "Password reset link sent to email.",
        });
    } catch (error) {
        console.error("RESET PASSWORD TOKEN ERROR:", error);
        return res.status(500).json({ success: false, message: "Could not send reset email." });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, password, confirmPassword } = req.body;

        if (!token || !password) {
            return res.status(400).json({ success: false, message: "Token and new password are required." });
        }

        if (confirmPassword !== undefined && password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match." });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Token is invalid or has expired." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successful.",
        });
    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);
        return res.status(500).json({ success: false, message: "Could not reset password." });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const userDetails = await User.findById(req.user.id);
        const { oldPassword, newPassword } = req.body;
        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Old Password does not match" });
        }
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password for your account has been updated",
                "Password updated successfully"
            );
            console.log("Email sent successfully:", emailResponse);
        } catch (error) {
            console.error("Error in sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error in sending email",
                error: error.message,
            });
        }
        return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Error in updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating password",
            error: error.message,
        });
    }
};