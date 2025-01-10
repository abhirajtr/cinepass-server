import { Booking } from "../domain/entities/Booking";

export const ticketConfirmationContent = (booking: Booking): string => {
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
                    background-color: #007BFF;
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
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Booking Confirmation</h1>
                </div>
                <div class="content">
                    <p>Dear User,</p>
                    <p>Your booking has been <strong>${booking.status}</strong>.</p>
                    <p><strong>Booking Details:</strong></p>
                    <ul>
                        <li><strong>Booking ID:</strong> ${booking.bookingId}</li>
                        <li><strong>Movie Title:</strong> ${booking.movieTitle}</li>
                        <li><strong>Theatre ID:</strong> ${booking.theatreId}</li>
                        <li><strong>Show Time:</strong> ${booking.showTime.toLocaleString()}</li>
                        <li><strong>Seats:</strong> ${booking.seats.join(", ")}</li>
                        <li><strong>Total Price:</strong> $${booking.price.toFixed(2)}</li>
                    </ul>
                    <p>If you have any questions, please contact our support team.</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} CinePass. All Rights Reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}
