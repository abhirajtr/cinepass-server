import { Booking } from "../domain/entities/Booking";

export const ticketCancellationContent = (booking: Booking): string => {
    return `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                }
                .header {
                    text-align: center;
                    padding: 10px 0;
                    color: #fff;
                    background-color: #FF4D4F; /* Red tone for cancellation */
                    border-radius: 8px 8px 0 0;
                }
                .content {
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 0.9em;
                    color: #666;
                }
                .brand {
                    font-weight: bold;
                    color: #007BFF; /* Blue for CinePass branding */
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Booking Cancellation - CinePass</h1>
                </div>
                <div class="content">
                    <p>Dear User,</p>
                    <p>We regret to inform you that your booking has been <strong>cancelled</strong>.</p>
                    <p><strong>Booking Details:</strong></p>
                    <ul>
                        <li><strong>Booking ID:</strong> ${booking.bookingId}</li>
                        <li><strong>Movie Title:</strong> ${booking.movieTitle}</li>
                        <li><strong>Theatre ID:</strong> ${booking.theatreId}</li>
                        <li><strong>Show Time:</strong> ${booking.showTime.toLocaleString()}</li>
                        <li><strong>Seats:</strong> ${booking.seats.join(", ")}</li>
                        <li><strong>Total Price:</strong> $${booking.price.toFixed(2)}</li>
                    </ul>
                    <p>The total amount of <strong>&#8377;${(booking.price / 100).toFixed(2)}</strong> has been refunded to your CinePass Wallet.</p>
                    <p>If you have any questions or need further assistance, please do not hesitate to contact our support team.</p>
                    <p>Thank you for choosing <span class="brand">CinePass</span>.</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} <span class="brand">CinePass</span>. All Rights Reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};
