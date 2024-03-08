'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'

import adminRoutes from '../src/Admin/admin.routes.js';
import userRoutes from '../src/user/user.routes.js';
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT

        this.adminPath = '/businessRecords/v2/admin';
        this.userPath = '/businessRecords/v2/user';

        this.middlewares();
        this.connectDB();
        this.routes()
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.adminPath, adminRoutes);
        this.app.use(this.userPath, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server is running on port', this.port);
        });
    }
}

export default Server;