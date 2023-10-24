const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    }
})
const sendMail = function (room, ip) {

    let mailOptions = {
        from: process.env.EMAIL_USERNAME , 
        to: process.env.EMAIL_USERNAME, 
        subject: `******PORTFOLIO ${ip}**********`,
        html: `http://localhost:3000?room=${room}`
    }
    return transporter.sendMail(mailOptions)
}

module.exports = sendMail