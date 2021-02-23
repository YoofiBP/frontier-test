import {Request, Response, NextFunction} from 'express';

class ApplicationController {

    store = async(req:Request, res:Response, next:NextFunction) => {
        try {
            console.log(req.body)
            return res.status(200).json(req.body)
        }
         catch (e) {
            next(e)
        }
    }
}

export const applicationController = new ApplicationController();