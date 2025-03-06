const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.APP_PASS,
        },
      });

    const mailOptions = {
        from: process.env.USER_MAIL,
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
