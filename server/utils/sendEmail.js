const nodemailer = require("nodemailer");
require("dotenv").config();
const SENDER = process.env.SENDER;
const PASSWORD = process.env.PASSWORD;

let verifyAccountEmailTmp = `
<!DOCTYPE html>
<html><body>
<p>Hi </p>
<p>Please click this <a href=%link>link</a> to verify your account. </p>
<p>If you have any question, please reply to this email</p>
<p>Regards</p>
<p>Old Phone Deals Website</p>
<p>Christin Chen</p>
</body></html>
`

let forgetPswEmailTmp = `
<!DOCTYPE html>
<html><body>
<p>Hi </p>
<p>Please click this <a href=%link>link</a> to change your password. </p>
<p>If you have any question, please reply to this email</p>
<p>Regards</p>
<p>Old Phone Deals Website</p>
<p>Christin Chen</p>
</body></html>
`

const sendEmail = async (emailTo, mode, url) => {
  if (!emailTo || !mode || !url) {
    throw new Error("Missing required parameters to send email.");
  }
  let subject;
  let emailBody;
  if(mode == 'verify') {
    emailBody = verifyAccountEmailTmp;
    subject = 'Verify Your Emai - OldPhoneDeals Website'
  }
  if(mode == 'forget-psw') {
    emailBody = forgetPswEmailTmp;
    subject = 'Reset Your Password - OldPhoneDeals Website'
  }
  emailBody = emailBody.replace("%link", url)

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
    text: 'Hello from OldPhoneDeals Website',
    html:emailBody
  };

  try {
    await emailTransporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};

module.exports = sendEmail;
