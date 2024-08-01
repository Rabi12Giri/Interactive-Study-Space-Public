import nodemailer from "nodemailer";
import { FROM_EMAIL, FROM_EMAIL_PASS } from "../config/config.js";

const transporterConfig = {
    service: "gmail",
    auth: {
        user: FROM_EMAIL,
        pass: FROM_EMAIL_PASS,
    },
};

const mailMessage = {
    from: FROM_EMAIL,

    // Email or array of email
    to: " demo@gmail.com",

    subject: "Notice About Upcoming Exam",

    // Mail Message should be here in html format
    html: `        `,
};

const sendMail = async (mailMessage) => {
    const transporter = nodemailer.createTransport(transporterConfig);
    await transporter.sendMail(mailMessage);
};

export default sendMail;
