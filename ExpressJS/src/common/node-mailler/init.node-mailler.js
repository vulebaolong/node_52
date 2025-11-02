import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "vulebaolong@gmail.com",
        pass: "jdvtrufjyrsqfdtp",
    },
});

setInterval(() => {
    
}, 2000);

export const sendMail = async (emailTo, subject = "Hello") => {
    const info = await transporter.sendMail({
        from: "Anh Long",
        to: emailTo,
        subject: subject,
        text: "Hello world?", // plain‑text body
        html: "<b>Hello world?</b>", // HTML body
    });

    console.log("Message sent:", info.messageId);
};
