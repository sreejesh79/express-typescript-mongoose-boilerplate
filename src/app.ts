/* eslint-disable */ 
import "reflect-metadata";
import * as http from 'http';
import * as https from 'https';
import express, {Router} from 'express';
import bodyParser from 'body-parser'; //used to parse the form data that you pass in the request
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { Log, ErrorLog } from './config/logger';
import Bootstrap from 'config/bootstrap';
import * as path from 'path';
import * as fs from 'fs';
import { Middlewares, Controllers } from './config/routes';
import Environment from './config/environment';
import { router } from './decorators/controller.decorator'
import { mwRouter } from './decorators/middleware.decorator';
import { ErrorHandler } from "config/errors";
import { Logger } from 'config/logger';
import { BASE_PATH } from 'config/routes';
import mongoose from 'mongoose';


class App {

    public _app: express.Application;
    protected _port: string
    constructor() {
        global.__basepath = path.join(__dirname, '../');
        this._app = express();
        this.config(this._app);
    }

    private async config(app) {
        Environment.init();
        Logger.init();
        // Middlewares
        Middlewares();
        // import controllers
        Controllers();
        // middlewares
        app.use(helmet())
        // support application/json type post data
        app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        app.use(bodyParser.urlencoded({
            extended: false
        }));

        app.use(cookieParser());
        //Enables cors   
        app.use(cors());

        Log(app);
        app.use(mwRouter);
        app.use(router);
        ErrorLog(app);
        ErrorHandler.init(app);
        // db connection
       // await this.initDbConnections();
       
        this.setMongoConfig();
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        const MONGO_DB: string = process.env.MONGO_URL
        // mongoose.set('useCreateIndex', true);
        const db: any = mongoose.connect(MONGO_DB);
        const mongo = mongoose.connection
        mongo.once("connected", async () => {
            console.log(`Connected to database at ${MONGO_DB}`);
           // const response = await Bootstrap.init();
           Bootstrap.init();
           this.listen();
        });
        mongo.on('disconnected', () => { console.log('mongo: Disconnected') })
    }

    private listen() {
        this._port = process.env.PORT;
        // const isProduction = (process.env.NODE_ENV === 'production');
        const httpServer = http.createServer(this._app);
        httpServer.listen(this._port, () => {
            // Logger.info(`App listening on the http://localhost:${this._port}`);
            console.log('\x1b[35mINFO\x1b[0m',`App listening on  http://localhost:${this._port}${BASE_PATH}`);
        })
        
    }

}

const server: App = new App();