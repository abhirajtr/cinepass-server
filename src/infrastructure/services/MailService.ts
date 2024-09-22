import { IMailService } from "../../domain/interfaces/IMailService";
import nodemailer from "nodemailer"

export class MailService implements IMailService {
    private tarnsporter;
    private user = process.env.MAIL_USER;
    private pass = process.env.MAIL_PASS;
    private service = process.env.MAIL_SERVICE;
    constructor() {
        // console.log(process.env);
        
        this.tarnsporter = nodemailer.createTransport({
            service: this.service,
            auth: {
                user: this.user,
                pass: this.pass,
            },
        })
    }

    async sendVerificationEmail(email: string, otp: string): Promise<void> {
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Notification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: auto;
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .header {
                    background: #007bff;
                    color: white;
                    padding: 20px;
                    text-align: center;
                }
                .content {
                    padding: 20px;
                }
                .footer {
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Your OTP Code</h1>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>Your OTP code is: <strong>${otp}</strong></p>
                    <p>Please use this code to complete your verification process. The code is valid for a limited time.</p>
                    <p>If you did not request this code, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 CinePass. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
        const mailOptions = {
            from: "cinepass@gmail.com",
            to: "abhirajtr007@gmail.com",
            subject: "Email Verification",
            html: htmlContent,
        };

        await this.tarnsporter.sendMail(mailOptions);
    }
}