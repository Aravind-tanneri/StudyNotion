const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // Basic Details
    name: {
        type: String,
        required: true,
        trim: true,
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
    }, 
    password: {
        type: String,
        required: true,
    }, 
    contactNumber: {
        type: String,
        required: true,
    }, 
    
    // Role & Status
    accountType: {
        type: String,
        enum: ["Admin", "Student", "Instructor"],
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    }, 
    approve: {
        type: Boolean,
        default: true,
    }, 

    // Relationships
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }
    ],
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress",
        }
    ],

    // Password reset
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);