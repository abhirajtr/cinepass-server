import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    const statusCode = err.isOperational ? err.statusCode : 500;
    const message = err.isOperational ? err.message : 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        message
    })
}