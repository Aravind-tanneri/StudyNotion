const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from: 'StudyNotion - by Aravind',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        
        console.log("Email Sent Successfully:", info.response);
        return info;
    } catch (error) {
        console.log("Error in sending email: ", error.message);
        return error;
    }
}

module.exports = mailSender;