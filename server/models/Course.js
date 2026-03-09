const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true,
    }, 
    courseDescription: {
        type: String,
        required: true,
        trim: true,
    }, 
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, 
    whatYouWillLearn: {
        type: String,
    }, 
    
    // Core Content
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }
    ],
    
    // Media & Pricing
    price: {
        type: Number,
        required: true,
    }, 
    thumbnail: {
        type: String, // Cloudinary URL
        required: true,
    },
    
    // Tags and Feedback
    tag: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
        }
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        }
    ], 
    
    // Enrollment Tracking
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ], 
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);