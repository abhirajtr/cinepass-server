import { AppError } from "./AppError";

export class BadRequestError extends AppError {
    constructor(message: string = "Bad request. Invalid input.") {
        super(message, 400);
    }
}
