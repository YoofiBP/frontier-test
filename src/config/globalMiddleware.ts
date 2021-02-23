import {Request, Response, NextFunction} from 'express'
import pick from 'lodash/pick';
import {ApplicationModel} from "../models/ApplicationModel";
import {RequestValidationError} from "../services/errorHandling";

export const requestSanitizer = (model:object) => (req:Request, res:Response, next:NextFunction) => {
    if(req.method === "POST") {
        //remove unexpected fields from JSON body
        req.body = pick(req.body, Object.keys(model));

        //check if all fields are present
        Object.keys(model).forEach((prop: string) => {
            if (!Object.keys(req.body).includes(prop)) {
                next(new RequestValidationError(`Field '${prop}' is missing from request body`));
                return
            }
        })
    }
    next();
    return
}

