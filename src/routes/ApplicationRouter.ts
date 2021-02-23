import {Router} from 'express';
import {applicationController} from "../controllers/ApplicationController";
import {requestSanitizer} from "../config/globalMiddleware";
import {ApplicationModel} from "../models/ApplicationModel";

const ApplicationRouter:Router = Router();

// ApplicationRouter.use(requestSanitizer(ApplicationModel))

/*ApplicationRouter.get('/get', (req,res,next) => {
    res.redirect("Welcome")
})*/

// requestSanitizer(ApplicationModel)

ApplicationRouter.post('/', requestSanitizer(ApplicationModel), applicationController.store);

export default ApplicationRouter;