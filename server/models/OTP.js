const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5,
    }
});

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email, 
            "Verification Email from StudyNotion", 
            `<h1>Please confirm your OTP</h1>
             <p>Here is your OTP code: <b>${otp}</b></p>
             <p>This code will expire in 5 minutes.</p>`
        );
        console.log("Email sent successfully: ", mailResponse.response);
    } catch (error) {
        console.log("Error occurred while sending mails: ", error);
        throw error;
    }
}


OTPSchema.pre("save", async function() {
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
});

module.exports = mongoose.model("OTP", OTPSchema);