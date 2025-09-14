const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendEmail(to, subject, text, html = null){
    try{
        const mailOptions = {
            from:  `"Gas Reminder" <${process.env.EMAIL_USER}`,
            to,
            subject,
            text,
            html: html || text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email Sent:",info.response)
        return info;

    }catch(err){
        console.error("Error sending email",err);
        throw err;
    }
}
module.exports = sendEmail;