import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import helmet from "helmet";
import ApplicationRouter from "./routes/ApplicationRouter";
import {appErrorHandler} from "./services/errorHandling"

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/forms/frontier/applications', ApplicationRouter)

app.all('*', (req, res) => {
    res.status(404).send({message: "Nothing to see here"})
})

app.use(appErrorHandler);
export default app;
