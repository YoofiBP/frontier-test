import { Request, Response, NextFunction } from "express";
import { submitToFrontier } from "../services/rpa";
import { iApplicationModel } from "../models/ApplicationModel";
import channel from "../services/queueing/producer";
import { createToken, findToken } from "../services/databaseServices";

class ApplicationController {
  asyncStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //generate token
      const token = await createToken();
      const requestPayload = req.body;
      const tokenPayload = token.payload;

      //place message on queue
      (await channel).sendToQueue(
        "FRONTIER",
        Buffer.from(JSON.stringify({ requestPayload, tokenPayload }))
      );

      //generate and send link to allow user to return to view status
      const referral = `localhost:5000/forms/frontier/applications/confirm/${tokenPayload}`;
      return res.status(200).json({
        referral,
      });
    } catch (e) {
      next(e);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //submit application form to frontier
      await submitToFrontier(req.body as iApplicationModel);
      return res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      next(error);
    }
  };

  confirm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { payload } = req.params;
      const token = await findToken({ payload });
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  };
}

export const applicationController = new ApplicationController();
