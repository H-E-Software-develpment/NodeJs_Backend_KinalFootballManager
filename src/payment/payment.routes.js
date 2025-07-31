import { Router } from "express";
import { createPayment, deletePayment, findPayments } from "./payment.controller.js";
import { createPaymentValidator, deletePaymentValidator, findPaymentsValidator } from "../middlewares/payment-validators.js";

const router = Router();

/**
 * @swagger
 * /payment/createPayment:
 *   post:
 *     tags:
 *       - Payment
 *     summary: Register a new payment method
 *     description: Allows any user to register a payment card.
 *     operationId: createPayment
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Payment data to register.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bank
 *               - type
 *               - holder
 *               - cardNumber
 *               - dueDate
 *               - cvv
 *             properties:
 *               bank:
 *                 type: string
 *                 enum: ["GYT CONTINENTAL", "BANCO INDUSTRIAL", "BANRURAL", "BAC", "BANCO PROMERICA", "BAM", "FICOHSA"]
 *               type:
 *                 type: string
 *                 enum: ["DEBIT", "CREDIT"]
 *               holder:
 *                 type: string
 *               cardNumber:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               cvv:
 *                 type: string
 *     responses:
 *       201:
 *         description: Card registered successfully.
 *       400:
 *         description: Card already exists or invalid data.
 *       500:
 *         description: Internal server error.
 */
router.post("/createPayment", createPaymentValidator, createPayment);

/**
 * @swagger
 * /payment/deletePayment/{pid}:
 *   delete:
 *     tags:
 *       - Payment
 *     summary: Delete a payment card
 *     description: Allows any user to delete their card permanently.
 *     operationId: deletePayment
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: The ID of the payment card to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Card deleted successfully.
 *       404:
 *         description: Card not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/deletePayment/:pid", deletePaymentValidator, deletePayment);

/**
 * @swagger
 * /payment/findPayments:
 *   post:
 *     tags:
 *       - Payment
 *     summary: Find registered payment cards
 *     description: Allows students to see their own cards, and admins to filter by user.
 *     operationId: findPayments
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Optional filters like pid or user ID
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pid:
 *                 type: string
 *               student:
 *                 type: string
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Max results to return
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *         required: false
 *         description: Results to skip
 *     responses:
 *       200:
 *         description: Cards found successfully.
 *       400:
 *         description: Invalid filters.
 *       500:
 *         description: Internal server error.
 */
router.post("/findPayments", findPaymentsValidator, findPayments);

export default router;
