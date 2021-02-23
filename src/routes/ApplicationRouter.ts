import {Router} from 'express';
import {applicationController} from "../controllers/ApplicationController";

const ApplicationRouter:Router = Router();

ApplicationRouter.post('/', applicationController.store);

export default ApplicationRouter;