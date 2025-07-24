import { Router } from "express";
import { login, register } from "./auth.controller.js";
import { loginValidator, registerValidator } from "../middlewares/user-validators.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Creates a new user account and returns account details.
 *     operationId: register
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - email
 *               - password
 *              - academic  
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address (must be unique)
 *               password:
 *                 type: string
 *                 description: User's password (must meet security criteria)
 * *              academic:
 *                 type: string
 *                 description: User's academic code
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid data or email already in use
 *       500:
 *         description: Internal server error
 */
router.post("/register", registerValidator, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login to the system
 *     description: Authenticates a user and returns a JWT token.
 *     operationId: login
 *     requestBody:
 *       description: Login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful. Returns a JWT.
 *       400:
 *         description: Invalid credentials or missing fields.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", loginValidator, login);


export default router;
