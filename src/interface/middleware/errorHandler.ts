import { NextFunction, Request, Response } from "express";
import { createApiErrorResponse } from "../../infrastructure/http/common-response";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    const statusCode = err.isOperational ? err.statusCode : 500;
    const message = err.isOperational ? err.message : 'Internal Server Error';
    if (!err.isOperational) {
        console.error(err.stack);
    }
    res.status(statusCode).json(createApiErrorResponse([message], statusCode, message));
}