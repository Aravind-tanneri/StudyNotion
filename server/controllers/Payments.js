const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const { courseRegistrationEmail } = require("../mail/templates/courseRegistrationEmail");

// =========================================================
// 1. Capture Payment for Multiple Courses
// =========================================================
exports.capturePayment = async (req, res) => {
    try {
        const { courses } = req.body; 
        const userId = req.user.id;

        if (!courses || courses.length === 0) {
            return res.status(400).json({ success: false, message: "Please provide valid course IDs." });
        }

        let totalAmount = 0;

        // Loop through all courses in the cart to calculate the total price
        for (const courseId of courses) {
            let course;
            try {
                course = await Course.findById(courseId);
                if (!course) {
                    return res.status(404).json({ success: false, message: "Could not find the course." });
                }

                // Security Check: Make sure the student isn't double-buying
                const uid = new mongoose.Types.ObjectId(userId);
                if (course.studentsEnrolled.includes(uid)) {
                    return res.status(400).json({ success: false, message: "Student is already enrolled in one of the courses." });
                }

                totalAmount += course.price;
            } catch (error) {
                console.error("Error finding course inside loop:", error);
                return res.status(500).json({ success: false, message: error.message });
            }
        }

        const currency = "INR";
        const options = {
            amount: totalAmount * 100, // Convert to Paisa
            currency,
            receipt: `RCPT_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        };

        try {
            // Initiating the real Razorpay order creation
            const paymentResponse = await instance.orders.create(options);
            console.log("Real Razorpay Order Created:", paymentResponse);

            return res.status(200).json({
                success: true,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            });
        } catch (error) {
            console.error("Error creating real Razorpay order:", error);
            return res.status(500).json({ success: false, message: "Could not initiate order." });
        }

    } catch (error) {
        console.error("Capture Payment Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


// =========================================================
// 2. Verify Signature and Enroll in Multiple Courses
// =========================================================
exports.verifySignature = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(400).json({ success: false, message: "Payment details are incomplete" });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    // We are now enforcing the strict signature check
    if (expectedSignature === razorpay_signature) { 
        try {
            await Promise.all(courses.map(async (courseId) => {
                
                // 1. Add student to the course
                const enrolledCourse = await Course.findOneAndUpdate(
                    { _id: courseId },
                    { $push: { studentsEnrolled: userId } },
                    { new: true }
                );

                if (!enrolledCourse) {
                    throw new Error(`Course not found for ID: ${courseId}`);
                }
                
                // 2. Add course to the student's profile
                const enrolledStudent = await User.findOneAndUpdate(
                    { _id: userId },
                    { $push: { courses: courseId } },
                    { new: true }
                );

                // 3. Send an email receipt for each course
                try {
                    const dashboardUrl = (process.env.FRONTEND_URL || "http://localhost:5173") + "/dashboard/enrolled-courses";
                    
                    await mailSender(
                        enrolledStudent.email,
                        `Payment Successful - Welcome to ${enrolledCourse.courseName}!`,
                        courseRegistrationEmail({
                            name: enrolledStudent?.name,
                            courseName: enrolledCourse?.courseName,
                            dashboardUrl,
                        })
                    );
                    console.log(`Confirmation Email Sent for ${enrolledCourse.courseName}`);
                } catch (emailError) {
                    console.error("Failed to send confirmation email for course:", enrolledCourse.courseName, emailError);
                }
            }));

            return res.status(200).json({
                success: true,
                message: "Signature Verified and Courses Added Successfully",
            });

        } catch (error) {
            console.error("Error during enrollment process:", error);
            return res.status(500).json({ success: false, message: error.message });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "Payment Verification Failed: Invalid Signature",
        });
    }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({ success: false, message: "Please provide all the details" });
    }

    try {
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            `<h1>Payment Successful</h1>
             <p>Your payment of Rs. ${amount / 100} has been received.</p>
             <p>Order ID: ${orderId}</p>
             <p>Payment ID: ${paymentId}</p>`
        );
        return res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
        console.log("Error in sending mail", error);
        return res.status(500).json({ success: false, message: "Could not send email" });
    }
};