import { Request, Response, NextFunction, query } from "express";
import { GetShowsByMovieIdUseCase } from "../../useCases/User/GetShowsByMovieIdUseCase";
import { DIContainer } from "../../infrastructure/DIContainer";
import { createApiErrorResponse, createApiResponse } from "../../infrastructure/http/common-response";
import { BadRequestError } from "../../domain/errors/BadRequestError";
import { GetSeatLayoutUseCase } from "../../useCases/User/GetSeatLayoutUseCase";
import { BookSeatsUseCase } from "../../useCases/User/BookSeatsUseCase";
import { SuccessBookingUseCase } from "../../useCases/User/SuccessBookingUseCase";
import { HttpStatusCode } from "axios";
import { CustomRequest } from "../middleware/jwtMiddleware";
import { GetBookingsUseCase } from "../../useCases/User/GetBookingsUseCase";
import QRCode from 'qrcode';
import { CancelTicketUseCase } from "../../useCases/User/CancelTicketUseCase";

export class ShowController {
    private getShowByMovieIdUseCase = new GetShowsByMovieIdUseCase(DIContainer.getShowRepository(), DIContainer.getMovieRepository());
    private getSeatLayoutUseCase = new GetSeatLayoutUseCase(DIContainer.getShowRepository());
    private bookSeatsUseCase = new BookSeatsUseCase(DIContainer.getShowRepository(), process.env.STRIPE_SECRET_KEY!);
    private successBookingUseCase = new SuccessBookingUseCase(DIContainer.getShowRepository(), DIContainer.getBookingRepository(), process.env.STRIPE_SECRET_KEY!);
    private getBookingsUseCase = new GetBookingsUseCase(DIContainer.getBookingRepository());
    private cancelTicketUseCase = new CancelTicketUseCase(DIContainer.getBookingRepository(), DIContainer.getUserRepository(), DIContainer.getShowRepository(), DIContainer.getWalletRepository());

    async getShowsByMovieId(req: Request, res: Response, next: NextFunction) {
        try {
            const { movieId } = req.params;
            const { date } = req.query;
            if (typeof date !== 'string') {
                throw new BadRequestError("Invalid or missing date parameter");
            }

            const parsedDate = new Date(date);
            if (isNaN(parsedDate.getTime())) {
                throw new BadRequestError("Invalid date format");
            }

            const data = await this.getShowByMovieIdUseCase.execute(movieId, parsedDate);
            res.status(HttpStatusCode.Ok).json(createApiResponse(data));
        } catch (error) {
            next(error);
        }
    }

    async getShowDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const { showId } = req.params;
            const show = await this.getSeatLayoutUseCase.execute(showId);
            // console.log(showLayout);

            res.status(HttpStatusCode.Ok).json(createApiResponse({ show }))
        } catch (error) {
            next(error);
        }
    }

    async bookSeats(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            // const response = await 
            console.log(req.body);
            const userId = req.userId;
            const { showId, selectedSeats } = req.body;
            if (userId == undefined) {
                throw new BadRequestError();
            }
            const response = await this.bookSeatsUseCase.execute({ showId, userId, selectedSeats })
            console.log("paymentprocess-->", response);

            res.status(HttpStatusCode.Ok).json(createApiResponse(response));
        } catch (error) {
            next(error);
        }
    }

    async bookSeatsSuccess(req: Request, res: Response, next: NextFunction) {
        try {
            const { sessionId } = req.query;
            if (!sessionId || typeof sessionId !== 'string') {
                throw new BadRequestError("Invalid session ID");
            }
            await this.successBookingUseCase.execute(sessionId);
            // res.status(200).json(createApiResponse());
            res.status(HttpStatusCode.Found).redirect(`http://localhost:4000/bookings`);
        } catch (error) {
            next(error);
        }
    }

    async bookings(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            const bookings = await this.getBookingsUseCase.execute(userId!);
            console.log("b", bookings);

            res.status(HttpStatusCode.Ok).json(createApiResponse({ bookings }));
        } catch (error) {
            next(error);
        }
    }

    async getQrCOde(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const ticketDetails = {
                movieName: 'Avengers: Endgame',
                theater: 'Cineplex 123',
                seat: 'A10',
                time: '2024-12-25 18:00',
                bookingId: 'ABC123',
                user: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                },
            };
            const qrData = JSON.stringify(ticketDetails);
            const qrCode = await QRCode.toDataURL(qrData);
            res.status(200).json({
                qrCode,
                message: 'QR Code generated successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    async cancelTicket(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { userId } = req;
            const { bookingId } = req.params;
            if (!bookingId || typeof bookingId !== 'string') {
                res.status(HttpStatusCode.BadRequest)
                    .json(createApiErrorResponse(["Invalid booking ID format"], HttpStatusCode.BadRequest, "Invalid booking ID format"))
                return
            }
            console.log("Cancellation requested by user:", userId, "for booking:", bookingId);
            await this.cancelTicketUseCase.execute(userId!, bookingId);
            res.status(HttpStatusCode.Ok).json(createApiResponse());
        } catch (error) {
            next(error);
        }
    }
}