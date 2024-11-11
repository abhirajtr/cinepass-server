export const resetPasswordEmailContent = (otp: string): string => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset OTP</title>
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
                    background: #28a745;
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
                    <h1>Password Reset Request</h1>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>You requested a password reset for your CinePass account. To complete the reset, please use the following OTP:</p>
                    <p><strong>${otp}</strong></p>
                    <p>This OTP is valid for a limited time. Please use it to reset your password.</p>
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
