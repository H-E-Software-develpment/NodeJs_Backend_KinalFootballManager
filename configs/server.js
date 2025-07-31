'use strict'
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { hash } from "argon2";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/user/user.routes.js";
import fieldRoutes from "../src/field/field.routes.js";
import eventRoutes from "../src/event/event.routes.js";
import { dbConnection } from './mongo.js';
import { swaggerDocs, swaggerUi } from "./swagger.js";

class ExpressServer {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        try {
            await dbConnection();
        } catch (err) {
            console.log(`Database connection failed: ${err}`);
            process.exit(1);
        }
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        this.app.use("/kinalfootballfield/v1/auth", authRoutes);
        this.app.use("/kinalfootballfield/v1/user", userRoutes);
        this.app.use("/kinalfootballfield/v1/field", fieldRoutes);
        this.app.use("/kinalfootballfield/v1/event", eventRoutes);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default ExpressServer;

