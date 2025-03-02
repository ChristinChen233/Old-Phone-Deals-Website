const nodemailer = require("nodemailer");
require("dotenv").config();
const SENDER = process.env.SENDER;
const PASSWORD = process.env.PASSWORD;

const sendEmail = async (emailTo, subject, url) => {
  if (!emailTo || !subject || !url) {
    throw new Error("Missing required parameters to send email.");
  }

  const emailTransporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SENDER,
      pass: PASSWORD,
    },
  });

  const mailOptions = {
    from: SENDER,
    to: emailTo,
    subject: subject,
    text: url,
  };

  try {
    await emailTransporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};

module.exports = sendEmail;
