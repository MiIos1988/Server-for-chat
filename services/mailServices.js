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
    console.log(ip.data.country_name)
    let mailOptions = {
        from: process.env.EMAIL_USERNAME , 
        to: process.env.EMAIL_USERNAME, 
        subject: `******PORTFOLIO ${ip.data.country_name}**********`,
        html: `
        https://sudimacmilos.vercel.app/?room=${room}
            <div>
                <p>Ip address: ${ip.data.ip}</p>
                <p>City: ${ip.data.city}  - Country: ${ip.data.country_name}</p>
                <p>Org: ${ip.data.org}</p>
                <p>Map: </p> https://www.google.com/maps?q=${ip.data.latitude},${ip.data.longitude}
            </div>
                    `
    }
    return transporter.sendMail(mailOptions)
}

module.exports = sendMail