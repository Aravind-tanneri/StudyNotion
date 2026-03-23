const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Import our models
const User = require("./models/User");
const Profile = require("./models/Profile");
const Course = require("./models/Course");
const Tag = require("./models/Tag");
const Section = require("./models/Section");
const SubSection = require("./models/SubSection");

const MONGODB_URL = process.env.MONGODB_URL;

async function seedDatabase() {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(MONGODB_URL);
    console.log("Connected Successfully!");

    // 1. CLEAR EXISTING DATA (Optional but recommended for clean seeding)
    console.log("Clearing old data...");
    await Promise.all([
      Course.deleteMany({}),
      User.deleteMany({}),
      Profile.deleteMany({}),
      Tag.deleteMany({}),
      Section.deleteMany({}),
      SubSection.deleteMany({})
    ]);

    const hashedPassword = await bcrypt.hash("password123", 10);

    // 2. CREATE TAGS (Categories)
    console.log("Creating Tags...");
    const tagsData = [
      { name: "Web Development", description: "Master the MERN stack and modern web tools." },
      { name: "Data Structures & Algorithms", description: "Crack coding interviews with C++ and Java." },
      { name: "Internet of Things", description: "Hardware, microcontrollers, and smart systems." },
      { name: "Entrepreneurship", description: "Micro-SaaS, Stoicism, and business fundamentals." }
    ];
    const createdTags = await Tag.insertMany(tagsData);

    // 3. CREATE PROFILES & USERS
    console.log("Creating Profiles and Users...");
    
    // Instructor 1 Profile
    const profileInstructor1 = await Profile.create({
      gender: "Male", dob: "1990-01-01", about: "Passionate about building scalable web applications.", contactNumber: "9876543210"
    });
    // Instructor 1 User
    const instructor1 = await User.create({
      name: "Code Master", email: "instructor1@studynotion.com", password: hashedPassword, contactNumber: "9876543210", accountType: "Instructor", profile: profileInstructor1._id
    });

    // Instructor 2 Profile
    const profileInstructor2 = await Profile.create({
      gender: "Male", dob: "1985-05-15", about: "Hardware enthusiast and startup founder.", contactNumber: "9123456780"
    });
    // Instructor 2 User
    const instructor2 = await User.create({
      name: "Hardware Guru", email: "instructor2@studynotion.com", password: hashedPassword, contactNumber: "9123456780", accountType: "Instructor", profile: profileInstructor2._id
    });

    // Student Profile
    const profileStudent = await Profile.create({
      gender: "Male", dob: "2005-10-20", about: "Aspiring software engineer.", contactNumber: "8639000000"
    });
    // Student User
    const student = await User.create({
      name: "Test Student", email: "student@studynotion.com", password: hashedPassword, contactNumber: "8639000000", accountType: "Student", profile: profileStudent._id
    });

    // 4. CREATE SUBSECTIONS & SECTIONS
    console.log("Creating Course Content...");
    
    // MERN Subsections
    const subSec1 = await SubSection.create({ title: "Setting up Vite and React", timeDuration: "12:00", description: "Initialize our frontend.", videoUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp4" });
    const subSec2 = await SubSection.create({ title: "Express API Routing", timeDuration: "18:30", description: "Building our backend routes.", videoUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp4" });
    
    // DSA Subsections
    const subSec3 = await SubSection.create({ title: "Arrays and Pointers in C++", timeDuration: "25:00", description: "Memory management basics.", videoUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp4" });
    
    // IoT Subsections
    const subSec4 = await SubSection.create({ title: "Programming the ESP32", timeDuration: "30:00", description: "Writing C++ for microcontrollers.", videoUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp4" });

    // Create Sections and link Subsections
    const sectionMERN = await Section.create({ sectionName: "Module 1: MERN Basics", subSection: [subSec1._id, subSec2._id] });
    const sectionDSA = await Section.create({ sectionName: "Module 1: C++ Fundamentals", subSection: [subSec3._id] });
    const sectionIoT = await Section.create({ sectionName: "Module 1: Vayuvriksh Aeroponics IoT", subSection: [subSec4._id] });

    // 5. CREATE COURSES
    console.log("Creating Courses...");
    const coursesData = [
      {
        courseName: "The Complete MERN Stack Bootcamp",
        courseDescription: "Learn to build full-stack applications like StudyNotion from scratch.",
        instructor: instructor1._id,
        whatYouWillLearn: "React, Node.js, Express, MongoDB, Authentication, and Deployment.",
        courseContent: [sectionMERN._id],
        price: 3999,
        thumbnail: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        tag: [createdTags[0]._id],
      },
      {
        courseName: "Mastering DSA in C++ (100 Day Roadmap)",
        courseDescription: "A highly structured approach to conquering Data Structures and Algorithms.",
        instructor: instructor1._id,
        whatYouWillLearn: "Arrays, Linked Lists, Trees, Graphs, DP, and Competitive Programming strategies.",
        courseContent: [sectionDSA._id],
        price: 2499,
        thumbnail: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        tag: [createdTags[1]._id],
      },
      {
        courseName: "Smart Aeroponics: IoT with ESP32",
        courseDescription: "Build automated, soil-less farming systems from the ground up.",
        instructor: instructor2._id,
        whatYouWillLearn: "Microcontroller programming, sensor integration, and cloud dashboard design.",
        courseContent: [sectionIoT._id],
        price: 4500,
        thumbnail: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        tag: [createdTags[2]._id],
      },
      {
        courseName: "The Stoic Founder: Micro-SaaS & Mindset",
        courseDescription: "Frameworks for building profitable businesses without losing your mind.",
        instructor: instructor2._id,
        whatYouWillLearn: "Bootstrapping, Naval's wealth principles, and Stoic philosophy for stress management.",
        courseContent: [],
        price: 1999,
        thumbnail: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        tag: [createdTags[3]._id],
      }
    ];

    const createdCourses = await Course.insertMany(coursesData);

    // 6. UPDATE RELATIONSHIPS (Link Courses back to Instructors and Tags)
    console.log("Finalizing Database Relationships...");
    for (const course of createdCourses) {
      // Add course to Instructor
      await User.findByIdAndUpdate(course.instructor, { $push: { courses: course._id } });
      // Add course to Tag
      for (const tagId of course.tag) {
        await Tag.findByIdAndUpdate(tagId, { $push: { course: course._id } });
      }
    }

    console.log("✅ Database seeded successfully with robust dummy data!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();