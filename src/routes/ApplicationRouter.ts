import { Router } from "express";
import { applicationController } from "../controllers/ApplicationController";
import { requestSanitizer } from "../config/globalMiddleware";
import { ApplicationModel } from "../models/ApplicationModel";

const ApplicationRouter: Router = Router();

ApplicationRouter.post(
  "/async",
  requestSanitizer(ApplicationModel),
  applicationController.asyncStore
);
ApplicationRouter.post(
  "/",
  requestSanitizer(ApplicationModel),
  applicationController.store
);
ApplicationRouter.get("/confirm/:payload", applicationController.confirm);

export default ApplicationRouter;
