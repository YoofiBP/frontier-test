import {Router} from 'express';
import {applicationController} from "../controllers/ApplicationController";
import {requestSanitizer} from "../config/globalMiddleware";
import {ApplicationModel} from "../models/ApplicationModel";

const ApplicationRouter:Router = Router();

ApplicationRouter.post('/', requestSanitizer(ApplicationModel), applicationController.store);

export default ApplicationRouter;