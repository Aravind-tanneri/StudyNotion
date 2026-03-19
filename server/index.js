const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("./config/cloudinary");
const database = require("./config/database");

const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");

const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

database.connect();
cloudinary.cloudinaryConnect()
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

app.use(cors({ origin: "*", credentials: true }));

app.use("/api/auth", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "StudyNotion server is up and running perfectly! ",
    });
});

app.listen(PORT, () => {
    console.log(`App is running successfully at port ${PORT}`);
});


//self ping

const URL = "https://studynotion-ulxv.onrender.com";

setInterval(() => {
  axios.get(URL)
    .then(() => console.log("Self-ping successful! Server is awake."))
    .catch((err) => console.error("Self-ping failed:", err.message));
}, 14 * 60 * 1000); // 14 minutes in milliseconds