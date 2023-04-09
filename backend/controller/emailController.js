const nodemailer = require('nodemailer')
require('dotenv').config()
const sendMail = async (data, req, res) => {
    let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAIL_ID, // generated ethereal user
            pass: process.env.MAIL_PASS, // generated ethereal password
        },
    });


    let info = await transporter.sendMail({
        from: '<endsemproject@zohomail.in>',
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.html, // html body
    });
    
}

module.exports = sendMail;