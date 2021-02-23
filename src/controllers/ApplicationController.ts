import {Request, Response, NextFunction} from 'express';
import {submitToFrontier} from "../services/rpa";
import {iApplicationModel} from "../models/ApplicationModel";

class ApplicationController {

    store = async(req:Request, res:Response, next:NextFunction) => {
        try {
            await submitToFrontier(req.body as iApplicationModel)
            return res.status(200).json({
                message: "Success"
            })
        }
         catch (e) {
            next(e)
        }
    }
}


export const applicationController = new ApplicationController();