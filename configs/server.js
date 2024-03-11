'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'

import adminRoutes from '../src/Admin/admin.routes.js';
import userRoutes from '../src/user/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import categoryRoutes from '../src/categories/categories.routes.js';
import productsRoutes from '../src/products/products.routes.js';
import shoppingCartRoutes from '../src/shoppingCart/shoppingCart.routes.js';
import invoiceRouter from '../src/invoice/invoice.routes.js';
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT

        this.adminPath = '/businessRecords/v2/admin';
        this.userPath = '/businessRecords/v2/user';
        this.loginPath = '/businessRecords/v2/login';

        this.categoryPath = '/businessRecords/v2/admin/category';
        this.productPath = '/businessRecords/v2/admin/products';
        this.shoppingCartPath = '/businessRecords/v2/customer/shoppingCart';
        this.invoicePath = '/businessRecords/v2/customer/invoice';

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
        this.app.use(this.loginPath, authRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
        this.app.use(this.productPath, productsRoutes);
        this.app.use(this.shoppingCartPath, shoppingCartRoutes);
        this.app.use(this.invoicePath, invoiceRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server is running on port', this.port);
        });
    }
}

export default Server;