import { Request, Response, NextFunction } from "express";
import { submitToFrontier } from "../services/rpa";
import { iApplicationModel } from "../models/ApplicationModel";
import "../services/queueing/producer";
import channel from "../services/queueing/producer";
import { createToken, findToken } from "../services/databaseServices";

class ApplicationController {
  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await createToken();
      const requestPayload = req.body;
      const tokenPayload = token.payload;
      (await channel).sendToQueue(
        "FRONTIER",
        Buffer.from(JSON.stringify({ requestPayload, tokenPayload }))
      );
      //generate token

      const referral = `localhost:5000/forms/frontier/applications/confirm/${tokenPayload}`;
      //   (await channel).sendToQueue("FRONTIER", Buffer.from(req.body));
      //await submitToFrontier(req.body as iApplicationModel);
      return res.status(200).json({
        referral,
      });
    } catch (e) {
      next(e);
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
