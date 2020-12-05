import CrudController from "./CrudController";
import express from 'express';
import {IUserDocument, UserModel} from "../models/UserModel";
import {databaseService} from "../services/userServices";
import ac, {ACCESS_CONTROL_ERROR_MESSAGE, adminRoles} from '../config/accessControl'
import {AuthError} from "../services/errorHandling";

class UserController extends CrudController {

    constructor(dbService:databaseService) {
        super();
        this.dbService = dbService;
    }

     index = async (req: express.Request, res: express.Response) => {
        const users = await this.dbService.findAllUsers();
        return res.send(users)
    }

     confirm = async (req: express.Request, res: express.Response, next: express.NextFunction):Promise<express.Response> => {
        try{
            const { token: tokenCode } = req.query;
            await  this.dbService.findTokenAndVerifyUser((tokenCode as string))
            return res.status(200).send("Proceed to Login")
        } catch (err) {
            next(err)
        }
    }

     store = async (req: express.Request, res: express.Response, next:express.NextFunction):Promise<express.Response>  => {
        try {
            const user:IUserDocument = await this.dbService.saveUser(req.body)
            const token = await user.generateAuthToken()
            return res.status(201).send({user, token})
        } catch (err) {
            next(err)
        }
    }

    //Uses Passport middleware too authenticate and obtain active user
     login = async (req: express.Request, res: express.Response, next:express.NextFunction): Promise<express.Response> => {
        try {
            const user = req.user;
            const token = req.token;
            return res.status(200).send({user, token})
        } catch (err) {
            next(err)
        }
    }

     update = async (req: express.Request, res: express.Response, next:express.NextFunction): Promise<express.Response> => {
        try{
            if(req.body.password){delete req.body.password}
            const user = await this.dbService.findUserByIdAndUpdate(req.params.id, req.body)
            return res.status(200).send(user)
        } catch (err) {
            next(err)
        }
    }

     destroy = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> => {
        try{
            const user = await this.dbService.findUserById(req.params.id)
            await user.delete();
            return res.status(200).send("Deleted")
        } catch (err) {
            next(err)
        }

    }

    show = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> => {
        try{
            const user = await this.dbService.findUserById(req.params.id)
            return res.status(200).send(user);
        } catch (err){
            next(err)
        }
    }

    grantAccess = (action, resource) => async (req,res,next) => {
        try {
            if(adminRoles.includes(req.user.role)){
                return next()
            }
            const permission = ac.can(req.user.role)[action](resource)
            if(!permission.granted){throw new AuthError(ACCESS_CONTROL_ERROR_MESSAGE)}
            if(req.params.id){
                if(req.user._id.toString() !== req.params.id){
                    throw new AuthError(ACCESS_CONTROL_ERROR_MESSAGE)
                }
                return next()
            }
            return next()
        } catch(err) {
            next(err)
        }
    }
}

export default UserController;