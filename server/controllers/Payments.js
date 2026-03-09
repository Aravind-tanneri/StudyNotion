const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");

exports.capturePayment = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id; 

        if (!courseId) {
            return res.status(400).json({ success: false, message: "Please provide valid course ID." });
        }

        let course;
        try {
            course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ success: false, message: "Could not find the course." });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(400).json({ success: false, message: "Student is already enrolled." });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }

        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: courseId,
                userId: userId,
            }
        };

        try {
            // const paymentResponse = await instance.orders.create(options);
            const paymentResponse = {
                id: "order_dummy_" + Math.random().toString(36).substring(2, 10),
                currency: "INR",
                amount: options.amount,
            };


            console.log("Razorpay Order Created:", paymentResponse);

            return res.status(200).json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id, 
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Could not initiate order." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};



exports.verifySignature = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courseId || !userId) {
        return res.status(400).json({ success: false, message: "Payment details are incomplete" });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(500).json({ success: false, message: "Course not found" });
            }
            const enrolledStudent = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true }
            );

            try {
                const emailResponse = await mailSender(
                    enrolledStudent.email,
                    `Payment Successful - Welcome to ${enrolledCourse.courseName}!`,
                    `
                    <h1>Congratulations! 🎉</h1>
                    <p>Dear ${enrolledStudent.firstName},</p>
                    <p>Your payment was verified successfully. You are now officially enrolled in <b>${enrolledCourse.courseName}</b>.</p>
                    <p>Log in to your dashboard to start learning right away!</p>
                    `
                );
                console.log("Confirmation Email Sent:", emailResponse.response);
            } catch (emailError) {
                console.error("Failed to send confirmation email:", emailError);
            }

            return res.status(200).json({
                success: true,
                message: "Signature Verified and Course Added Successfully",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "Payment Verification Failed",
        });
    }
};