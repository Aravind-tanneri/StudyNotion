require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("./models/Course");
const Tag = require("./models/Tag");

mongoose.connect(process.env.MONGODB_URL).then(async () => {
  const tags = await Tag.find().populate("course", "courseName");
  tags.forEach(t => {
    console.log(`\n[${t.name}] → ${t.course.length} courses`);
    t.course.forEach(c => console.log("  -", c.courseName));
  });
  process.exit(0);
});
