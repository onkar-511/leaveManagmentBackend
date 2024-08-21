const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'angelica47@ethereal.email',
                pass: '5Yr6gCHTCMhY1F2tuT'
            }
            
        });

        const mailOptions = {
            from: '"Onkar Mali" <onkar.mali511@gmail.com>', // sender address
            //sanjaysant2021@gmail.com
            to: req.body.email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello Onkar", // plain text body
            html: "<b>Hello Onkar Node mail</b>" // html body
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);

        res.json(info);
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
};


module.exports = sendMail;
