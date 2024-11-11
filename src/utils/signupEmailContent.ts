export const signupEmailContent = (otp: string): string => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Signup OTP Notification</title>
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
                    <h1>Welcome to CinePass</h1>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>Thank you for signing up with CinePass! To complete your registration, please use the OTP below:</p>
                    <p><strong>${otp}</strong></p>
                    <p>This OTP is valid for a limited time. Please use it to finish the signup process.</p>
                    <p>If you did not request this, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 CinePass. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};
