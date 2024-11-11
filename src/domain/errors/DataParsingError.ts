import { AppError } from "./AppError";

export class DataParsingError extends AppError {
    constructor(message: string = "Failed to parse data.") {
        super(message, 500);
    }
}