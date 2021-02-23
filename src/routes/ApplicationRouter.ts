import {Router} from 'express';
import {applicationController} from "../controllers/ApplicationController";
import {requestSanitizer} from "../config/globalMiddleware";

const ApplicationRouter:Router = Router();

ApplicationRouter.use(requestSanitizer)
ApplicationRouter.post('/', applicationController.store);

export default ApplicationRouter;