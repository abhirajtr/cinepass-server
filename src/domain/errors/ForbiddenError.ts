import { AppError } from "./AppError";

export class ForbiddenError extends AppError {
    constructor(message: string = "You do not have permission to access this resource") {
        super(message, 403, true);
    }
}
