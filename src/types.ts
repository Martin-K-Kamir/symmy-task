// export type APISuccessResponse<T> = {
//     error: false;
//     data: T;
// };

export type APIErrorResponse = {
    message: string;
};

export type APIResponse<T> = T | APIErrorResponse;
