import nodemailer from "nodemailer";

export async function sendEmail(toEmail: string, subject: string, htmlContent: string): Promise<void> {
    // Read environment variables
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;
    const service = process.env.MAIL_SERVICE;

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: service,
        auth: {
            user: user,
            pass: pass,
        },
    });

    const mailOptions = {
        from: user,
        to: toEmail,
        subject: subject,
        html: htmlContent,
    };    
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${toEmail}`);
    } catch (error) {
        console.error(`Error sending email to ${toEmail}:`, error);
        throw new Error("Failed to send email.");
    }
}
