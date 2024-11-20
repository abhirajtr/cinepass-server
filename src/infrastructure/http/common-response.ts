interface ApiResponse<T> {
    responseCode: number;
    responseMessage: string;
    responseData?: T;
    errors?: string[];
    timeStamp: string;
}

export function createApiResponse<T>(
    data?: T,
    responseCode: number = 200,
    responseMessage: string = "Success",
): ApiResponse<T> {
    return { responseCode, responseMessage, responseData: data, timeStamp: new Date().toISOString() }
}

export function createApiErrorResponse<T>(
    errors: string[],
    responseCode: number = 500,
    responseMessage: string = "Error",
): ApiResponse<T> {
    return { responseCode, responseMessage, errors, timeStamp: new Date().toISOString() }
}