import {Request,Response,NextFunction} from 'express'

import pick from 'lodash/pick';
import {ApplicationModel} from "../models/ApplicationModel";
import {RequestValidationError} from "../services/errorHandling";

export const requestSanitizer = (req:Request, res:Response, next:NextFunction) => {

    //remove unexpected fields from JSON body
    req.body = pick(req.body, Object.keys(ApplicationModel));

    //check if all fields are present
    Object.keys(ApplicationModel).forEach(prop => {
        if(!Object.keys(req.body).includes(prop)){
            next(new RequestValidationError(`Field '${prop}' is missing from request body`));
            return
        }
    })
    next();
}

