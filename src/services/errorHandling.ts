export class RequestValidationError  {
    private statusCode: number
    private message: string

    constructor(message:string) {
        this.message = message;
        this.statusCode = 422
    }
}

export const appErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    err.message = err.message || 'A server error occurred'
    console.log(err)
    res.status(err.statusCode).send({
        status: err.status,
        message: err.message
    })
}
