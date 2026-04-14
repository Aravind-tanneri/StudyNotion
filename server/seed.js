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
const RatingAndReview = require("./models/RatingAndReview");
const CourseProgress = require("./models/CourseProgress");

const MONGODB_URL = process.env.MONGODB_URL;

async function seedDatabase() {
  try {
    console.log("🔌 Connecting to Database...");
    await mongoose.connect(MONGODB_URL);
    console.log("✅ Connected Successfully!\n");

    // ─── 1. CLEAR EXISTING DATA ───
    console.log("🧹 Clearing old data...");
    await Promise.all([
      Course.deleteMany({}),
      User.deleteMany({}),
      Profile.deleteMany({}),
      Tag.deleteMany({}),
      Section.deleteMany({}),
      SubSection.deleteMany({}),
      RatingAndReview.deleteMany({}),
      CourseProgress.deleteMany({}),
    ]);
    console.log("   Done.\n");

    const hashedPassword = await bcrypt.hash("password123", 10);

    // ─── 2. CREATE TAGS (Categories) ───
    console.log("🏷️  Creating Categories...");
    const tagsData = [
      { name: "Web Development", description: "Master the MERN stack and modern web tools." },
      { name: "Data Structures & Algorithms", description: "Crack coding interviews with C++ and Java." },
      { name: "Internet of Things", description: "Hardware, microcontrollers, and smart systems." },
      { name: "Entrepreneurship", description: "Micro-SaaS, Stoicism, and business fundamentals." },
      { name: "Machine Learning", description: "Build intelligent systems with Python and TensorFlow." },
      { name: "Mobile Development", description: "Create cross-platform apps with React Native and Flutter." },
    ];
    const tags = await Tag.insertMany(tagsData);
    console.log(`   Created ${tags.length} categories.\n`);

    // ─── 3. CREATE PROFILES & USERS ───
    console.log("👤 Creating Users...");

    const mkUser = async (name, email, type, about, gender = "Male") => {
      const profile = await Profile.create({
        gender, dob: "1990-01-15", about, contactNumber: "9" + Math.floor(100000000 + Math.random() * 900000000),
      });
      const user = await User.create({
        name, email, password: hashedPassword,
        contactNumber: profile.contactNumber,
        accountType: type,
        profile: profile._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(name)}`,
      });
      return user;
    };

    // Instructors
    const instructor1 = await mkUser("Aravind Tanneri", "aravind@studynotion.com", "Instructor", "Full-stack developer and educator with 5+ years of teaching experience.");
    const instructor2 = await mkUser("Priya Sharma", "priya@studynotion.com", "Instructor", "IoT researcher and startup founder building smart farming solutions.", "Female");
    const instructor3 = await mkUser("Rahul Verma", "rahul@studynotion.com", "Instructor", "ML engineer at a Fortune 500 company. Loves simplifying complex topics.");

    // Students
    const student1 = await mkUser("Ankit Kumar", "ankit@studynotion.com", "Student", "CS sophomore hungry for knowledge.");
    const student2 = await mkUser("Sneha Reddy", "sneha@studynotion.com", "Student", "Aspiring data scientist and competitive programmer.", "Female");
    const student3 = await mkUser("Dev Patel", "dev@studynotion.com", "Student", "Self-taught developer transitioning from mechanical engineering.");
    const student4 = await mkUser("Meera Joshi", "meera@studynotion.com", "Student", "UX-focused frontend developer.", "Female");
    const student5 = await mkUser("Rohan Singh", "rohan@studynotion.com", "Student", "Final year BTech student preparing for placements.");

    // Admin
    const admin = await mkUser("Admin User", "admin@studynotion.com", "Admin", "Platform administrator.");

    const allStudents = [student1, student2, student3, student4, student5];
    console.log(`   Created 3 instructors, 5 students, 1 admin.\n`);

    // ─── 4. HELPER: Create Course Content ───
    const mkSubSec = (title, duration, desc) => SubSection.create({
      title, timeDuration: duration, description: desc,
      videoUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp4",
    });

    const mkSection = async (name, subSections) => {
      const subs = await Promise.all(subSections.map(s => mkSubSec(s.title, s.duration, s.desc)));
      return Section.create({ sectionName: name, subSection: subs.map(s => s._id) });
    };

    // ─── 5. CREATE COURSES ───
    console.log("📚 Creating Courses with Sections & Lectures...");

    // ---------- Course 1: MERN Stack ----------
    const mernSections = [
      await mkSection("Getting Started", [
        { title: "Course Introduction & Roadmap", duration: "08:30", desc: "What you'll build and how the course is structured." },
        { title: "Setting up VS Code & Node.js", duration: "12:00", desc: "Configuring your development environment." },
        { title: "Git & GitHub Crash Course", duration: "15:45", desc: "Version control fundamentals every developer needs." },
      ]),
      await mkSection("React Fundamentals", [
        { title: "JSX, Components & Props", duration: "22:10", desc: "Core building blocks of React applications." },
        { title: "State Management with useState & useReducer", duration: "28:00", desc: "Managing component state effectively." },
        { title: "React Router v6 Deep Dive", duration: "18:30", desc: "Client-side routing and navigation." },
        { title: "Building a Reusable UI Library", duration: "35:00", desc: "Creating buttons, modals, and form components." },
      ]),
      await mkSection("Backend with Express & MongoDB", [
        { title: "REST API Design Principles", duration: "20:00", desc: "Designing clean and scalable APIs." },
        { title: "Express Middleware & Error Handling", duration: "16:45", desc: "Writing production-ready middleware." },
        { title: "MongoDB Schema Design & Mongoose", duration: "25:30", desc: "Data modeling for real applications." },
        { title: "JWT Authentication from Scratch", duration: "32:00", desc: "Secure your API with JSON Web Tokens." },
      ]),
      await mkSection("Deployment & DevOps", [
        { title: "Deploying to Render & Vercel", duration: "14:00", desc: "Going live with your full-stack app." },
        { title: "Environment Variables & Security", duration: "10:30", desc: "Keeping secrets safe in production." },
      ]),
    ];

    const course1 = await Course.create({
      courseName: "The Complete MERN Stack Bootcamp 2026",
      courseDescription: "Build production-ready full-stack applications from absolute scratch. This hands-on bootcamp covers React 19, Node.js, Express, MongoDB, authentication, payments, and cloud deployment. You'll build 3 real projects including a clone of this very platform.",
      instructor: instructor1._id,
      whatYouWillLearn: "React 19 with hooks and context\nNode.js & Express REST APIs\nMongoDB with Mongoose ODM\nJWT Authentication & Authorization\nRazorpay Payment Integration\nCloudinary File Uploads\nResponsive UI with TailwindCSS\nDeployment on Render & Vercel",
      courseContent: mernSections.map(s => s._id),
      price: 3999,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      tag: [tags[0]._id],
      studentsEnrolled: [student1._id, student2._id, student3._id, student4._id],
    });

    // ---------- Course 2: DSA ----------
    const dsaSections = [
      await mkSection("Foundations", [
        { title: "Time & Space Complexity Analysis", duration: "20:00", desc: "Big O notation and how to analyze algorithms." },
        { title: "Arrays: Patterns & Techniques", duration: "35:00", desc: "Two-pointer, sliding window, and prefix sum." },
        { title: "Strings & Hashing", duration: "28:00", desc: "String manipulation and hash map patterns." },
      ]),
      await mkSection("Core Data Structures", [
        { title: "Linked Lists: Single, Double & Circular", duration: "30:00", desc: "Node-based data structures." },
        { title: "Stacks & Queues with Real Applications", duration: "25:00", desc: "LIFO and FIFO with browser history and BFS." },
        { title: "Binary Trees & BST", duration: "40:00", desc: "Tree traversals, LCA, and balanced trees." },
        { title: "Graphs: BFS, DFS & Shortest Path", duration: "45:00", desc: "Graph algorithms that appear in every interview." },
      ]),
      await mkSection("Advanced Techniques", [
        { title: "Dynamic Programming Masterclass", duration: "50:00", desc: "From recursion to tabulation — 20 classic problems." },
        { title: "Greedy Algorithms & Interval Scheduling", duration: "22:00", desc: "When greedy beats DP." },
        { title: "Mock Interview Practice Session", duration: "60:00", desc: "Live problem solving with explanations." },
      ]),
    ];

    const course2 = await Course.create({
      courseName: "Mastering DSA in C++ — 100 Day Roadmap",
      courseDescription: "A battle-tested, highly structured approach to conquering Data Structures and Algorithms for FAANG interviews. Includes 200+ hand-picked problems from LeetCode, Codeforces, and past interview rounds.",
      instructor: instructor1._id,
      whatYouWillLearn: "Arrays, Strings & Hashing patterns\nLinked Lists, Stacks & Queues\nBinary Trees, BSTs & Heaps\nGraph algorithms (BFS, DFS, Dijkstra)\nDynamic Programming (1D, 2D, on Trees)\nGreedy & Backtracking\nCompetitive programming strategies",
      courseContent: dsaSections.map(s => s._id),
      price: 2499,
      thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aeb9?w=800&q=80",
      tag: [tags[1]._id],
      studentsEnrolled: [student1._id, student2._id, student5._id],
    });

    // ---------- Course 3: IoT ----------
    const iotSections = [
      await mkSection("IoT Fundamentals", [
        { title: "What is IoT? Architecture Overview", duration: "15:00", desc: "Understanding the IoT ecosystem." },
        { title: "Setting up Arduino IDE for ESP32", duration: "12:00", desc: "Flashing your first program." },
        { title: "Sensor Integration: DHT22, Soil Moisture", duration: "25:00", desc: "Reading real-world data." },
      ]),
      await mkSection("Building the Smart Farm", [
        { title: "Aeroponic System Design", duration: "30:00", desc: "Designing a soil-less vertical farm." },
        { title: "WiFi & MQTT Communication", duration: "28:00", desc: "Sending sensor data to the cloud." },
        { title: "Building a Live Dashboard with React", duration: "35:00", desc: "Visualizing data in real-time." },
      ]),
    ];

    const course3 = await Course.create({
      courseName: "Smart Aeroponics: IoT with ESP32",
      courseDescription: "Build automated, soil-less farming systems from the ground up. This project-based course covers microcontroller programming, sensor integration, MQTT communication, and building live dashboards — all through the lens of sustainable agriculture.",
      instructor: instructor2._id,
      whatYouWillLearn: "ESP32 microcontroller programming in C++\nSensor integration (temperature, humidity, soil)\nMQTT protocol for real-time data\nReact dashboard for live monitoring\nCloud deployment with AWS IoT Core",
      courseContent: iotSections.map(s => s._id),
      price: 4500,
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
      tag: [tags[2]._id],
      studentsEnrolled: [student3._id, student4._id],
    });

    // ---------- Course 4: Entrepreneurship ----------
    const bizSections = [
      await mkSection("Foundations of Micro-SaaS", [
        { title: "Finding Your Niche", duration: "18:00", desc: "How to validate ideas before writing code." },
        { title: "MVP in a Weekend", duration: "22:00", desc: "Ship fast, learn faster." },
        { title: "Pricing Psychology", duration: "15:00", desc: "Value-based pricing that converts." },
      ]),
      await mkSection("Stoic Mindset for Founders", [
        { title: "Marcus Aurelius on Decision-Making", duration: "20:00", desc: "Ancient wisdom for modern startups." },
        { title: "Handling Failure & Burnout", duration: "25:00", desc: "Building mental resilience." },
      ]),
    ];

    const course4 = await Course.create({
      courseName: "The Stoic Founder: Micro-SaaS & Mindset",
      courseDescription: "Frameworks for building profitable one-person businesses without losing your mind. Combines Naval Ravikant's wealth principles, bootstrapping tactics, and Stoic philosophy.",
      instructor: instructor2._id,
      whatYouWillLearn: "Bootstrapping a Micro-SaaS\nNaval's wealth creation principles\nStoic philosophy for stress management\nGrowth hacking on a $0 budget\nBuilding in public strategies",
      courseContent: bizSections.map(s => s._id),
      price: 1999,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      tag: [tags[3]._id],
      studentsEnrolled: [student1._id, student5._id],
    });

    // ---------- Course 5: Machine Learning ----------
    const mlSections = [
      await mkSection("Python for ML", [
        { title: "NumPy & Pandas Crash Course", duration: "30:00", desc: "Data manipulation essentials." },
        { title: "Matplotlib & Seaborn Visualization", duration: "22:00", desc: "Telling stories with data." },
      ]),
      await mkSection("Supervised Learning", [
        { title: "Linear & Logistic Regression", duration: "35:00", desc: "The workhorses of ML." },
        { title: "Decision Trees & Random Forests", duration: "28:00", desc: "Ensemble methods explained." },
        { title: "Support Vector Machines", duration: "25:00", desc: "Finding the optimal hyperplane." },
      ]),
      await mkSection("Deep Learning with TensorFlow", [
        { title: "Neural Networks from Scratch", duration: "40:00", desc: "Understanding backpropagation." },
        { title: "CNNs for Image Classification", duration: "45:00", desc: "Building an image classifier." },
        { title: "Transfer Learning with ResNet", duration: "30:00", desc: "Leveraging pretrained models." },
      ]),
    ];

    const course5 = await Course.create({
      courseName: "Machine Learning A-Z: From Zero to Hero",
      courseDescription: "A comprehensive journey through machine learning, from basic statistics to deep learning. Includes hands-on projects with real datasets, Kaggle competitions, and a capstone project.",
      instructor: instructor3._id,
      whatYouWillLearn: "Python, NumPy, Pandas, Matplotlib\nSupervised & Unsupervised Learning\nNeural Networks & Deep Learning\nTensorFlow & Keras\nModel evaluation & hyperparameter tuning\nReal-world ML projects",
      courseContent: mlSections.map(s => s._id),
      price: 4999,
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
      tag: [tags[4]._id],
      studentsEnrolled: [student2._id, student3._id, student5._id],
    });

    // ---------- Course 6: React Native ----------
    const rnSections = [
      await mkSection("React Native Basics", [
        { title: "Expo vs Bare Workflow", duration: "15:00", desc: "Choosing the right setup." },
        { title: "Core Components & Styling", duration: "25:00", desc: "View, Text, Image, and Flexbox." },
        { title: "Navigation with React Navigation", duration: "30:00", desc: "Tab, Stack, and Drawer navigators." },
      ]),
      await mkSection("Building a Real App", [
        { title: "State Management with Redux Toolkit", duration: "28:00", desc: "Global state in React Native." },
        { title: "REST API Integration", duration: "20:00", desc: "Fetching and displaying data." },
        { title: "Push Notifications & Deep Linking", duration: "22:00", desc: "Engaging your users." },
        { title: "Publishing to App Store & Play Store", duration: "18:00", desc: "Going live with your app." },
      ]),
    ];

    const course6 = await Course.create({
      courseName: "React Native: Build Production Mobile Apps",
      courseDescription: "Build cross-platform mobile applications that feel truly native. From Expo setup to App Store deployment, this course covers navigation, state management, API integration, and push notifications.",
      instructor: instructor3._id,
      whatYouWillLearn: "React Native with Expo\nReact Navigation (v6)\nRedux Toolkit state management\nREST API integration\nPush notifications\nApp Store & Play Store deployment",
      courseContent: rnSections.map(s => s._id),
      price: 3499,
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      tag: [tags[5]._id],
      studentsEnrolled: [student1._id, student4._id],
    });

    const allCourses = [course1, course2, course3, course4, course5, course6];
    console.log(`   Created ${allCourses.length} courses with full content.\n`);

    // ─── 6. UPDATE RELATIONSHIPS ───
    console.log("🔗 Linking Courses ↔ Instructors ↔ Tags ↔ Students...");
    for (const course of allCourses) {
      // Add course to instructor's courses array
      await User.findByIdAndUpdate(course.instructor, { $push: { courses: course._id } });
      // Add course to tag's course array
      for (const tagId of course.tag) {
        await Tag.findByIdAndUpdate(tagId, { $push: { course: course._id } });
      }
      // Add course to each enrolled student's courses array
      for (const studentId of course.studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, { $addToSet: { courses: course._id } });
      }
    }
    console.log("   Done.\n");

    // ─── 7. CREATE RATINGS & REVIEWS ───
    console.log("⭐ Creating Ratings & Reviews...");
    const reviews = [
      { user: student1._id, rating: 5, review: "Best MERN course on the internet. The project-based approach is incredible!", course: course1 },
      { user: student2._id, rating: 4, review: "Very well structured. Wish there were more advanced React patterns.", course: course1 },
      { user: student3._id, rating: 5, review: "Went from zero to deploying my first full-stack app. Life-changing.", course: course1 },
      { user: student1._id, rating: 5, review: "The DP section alone is worth the price. Incredible explanations.", course: course2 },
      { user: student2._id, rating: 5, review: "Cracked my Amazon interview after completing this. Highly recommend!", course: course2 },
      { user: student5._id, rating: 4, review: "Great content but would love more graph problems.", course: course2 },
      { user: student3._id, rating: 5, review: "As a hardware hobbyist, this course connected all the dots for me.", course: course3 },
      { user: student4._id, rating: 4, review: "Fascinating real-world application. The dashboard project is amazing.", course: course3 },
      { user: student1._id, rating: 4, review: "Naval's principles explained beautifully. Short but packed with value.", course: course4 },
      { user: student5._id, rating: 5, review: "Changed my perspective on entrepreneurship. Must-watch for founders.", course: course4 },
      { user: student2._id, rating: 5, review: "The TensorFlow section is gold. Built my first image classifier!", course: course5 },
      { user: student3._id, rating: 4, review: "Comprehensive ML course. The math explanations could be deeper.", course: course5 },
      { user: student5._id, rating: 5, review: "From Kaggle noob to top 10% in my first competition. Thank you!", course: course5 },
      { user: student1._id, rating: 4, review: "Clean teaching style. The navigation section saved me hours of debugging.", course: course6 },
      { user: student4._id, rating: 5, review: "Published my first app on the Play Store thanks to this course!", course: course6 },
    ];

    for (const r of reviews) {
      const rr = await RatingAndReview.create({ user: r.user, rating: r.rating, review: r.review });
      await Course.findByIdAndUpdate(r.course._id, { $push: { ratingAndReviews: rr._id } });
    }
    console.log(`   Created ${reviews.length} ratings & reviews.\n`);

    // ─── 8. CREATE COURSE PROGRESS ───
    console.log("📊 Creating Course Progress...");
    // Student1 has completed some lectures in MERN course
    const mernSubSections = [];
    for (const sec of mernSections) {
      const populated = await Section.findById(sec._id).populate("subSection");
      mernSubSections.push(...populated.subSection);
    }

    await CourseProgress.create({
      courseID: course1._id,
      userId: student1._id,
      completedVideos: mernSubSections.slice(0, 8).map(s => s._id), // 8 of 13 lectures completed
    });

    await CourseProgress.create({
      courseID: course2._id,
      userId: student1._id,
      completedVideos: [], // Just enrolled
    });

    await CourseProgress.create({
      courseID: course1._id,
      userId: student2._id,
      completedVideos: mernSubSections.slice(0, 5).map(s => s._id),
    });

    const dsaSubSections = [];
    for (const sec of dsaSections) {
      const populated = await Section.findById(sec._id).populate("subSection");
      dsaSubSections.push(...populated.subSection);
    }

    await CourseProgress.create({
      courseID: course2._id,
      userId: student5._id,
      completedVideos: dsaSubSections.slice(0, 6).map(s => s._id),
    });
    console.log("   Done.\n");

    // ─── SUMMARY ───
    console.log("═══════════════════════════════════════════════════");
    console.log("  ✅ DATABASE SEEDED SUCCESSFULLY!");
    console.log("═══════════════════════════════════════════════════");
    console.log("");
    console.log("  📧 Login Credentials (all passwords: password123)");
    console.log("  ─────────────────────────────────────────────────");
    console.log("  Instructor : aravind@studynotion.com");
    console.log("  Instructor : priya@studynotion.com");
    console.log("  Instructor : rahul@studynotion.com");
    console.log("  Student    : ankit@studynotion.com");
    console.log("  Student    : sneha@studynotion.com");
    console.log("  Student    : dev@studynotion.com");
    console.log("  Student    : meera@studynotion.com");
    console.log("  Student    : rohan@studynotion.com");
    console.log("  Admin      : admin@studynotion.com");
    console.log("");
    console.log("  📚 6 Courses | 🏷️  6 Categories | ⭐ 15 Reviews");
    console.log("═══════════════════════════════════════════════════");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();