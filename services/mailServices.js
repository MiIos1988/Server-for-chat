const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.AUTH_PASS,
    }
})
const sendMail = function (room, ip) {

    let mailOptions = {
        from: process.env.MY_EMAIL , 
        to: process.env.MY_EMAIL, 
        subject: `******PORTFOLIO ${ip}**********`,
        html: `http://localhost:3000?room:${room}`
    }
    return transporter.sendMail(mailOptions)
}

module.exports = sendMail