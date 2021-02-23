import {Request, Response, NextFunction} from 'express';

class ApplicationController {

    store = async(req:Request, res:Response, next:NextFunction) => {
        try {
            res.status(200).json(req.body)
        }
         catch (e) {
            console.log(e)
        }
    }
}

export const applicationController = new ApplicationController();