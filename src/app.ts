//Set up CI on heroku and experiment with CD

import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import helmet from "helmet";

import ApplicationRouter from "./routes/ApplicationRouter";
import {appErrorHandler} from "./services/errorHandling"

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/application', ApplicationRouter)
app.use(appErrorHandler);
app.all('*', (req, res) => {
    res.status(404).send({message: "Nothing to see here"})
})

export default app;
