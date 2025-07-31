import { body, param } from "express-validator";
import { findPayment } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const createPaymentValidator = [
    validateJWT,
    body("bank").notEmpty().withMessage("Bank is required").isString().withMessage("Bank must be a valid string"),
    body("type").notEmpty().withMessage("Card type is required").isIn(["DEBIT", "CREDIT"]).withMessage("Card type must be DEBIT or CREDIT"),
    body("holder").notEmpty().withMessage("Card holder name is required").isString().withMessage("Holder must be a valid string"),
    body("cardNumber").notEmpty().withMessage("Card number is required").isLength({ max: 17 }).withMessage("Card number cannot exceed 17 characters"),
    body("dueDate").notEmpty().withMessage("Due date is required").isISO8601().toDate().withMessage("Due date must be a valid date"),
    body("cvv").notEmpty().withMessage("CVV is required").isLength({ max: 4 }).withMessage("CVV cannot exceed 4 characters"),
    validateFields,
    handleErrors
];

export const deletePaymentValidator = [
    validateJWT,
    param("pid").notEmpty().withMessage("Card ID is required").isMongoId().withMessage("Card ID must be valid").custom(findPayment),
    validateFields,
    handleErrors
];

export const findPaymentsValidator = [
    validateJWT,
    param("pid").optional().isMongoId().withMessage("Card ID must be valid"),
    body("user").optional().isMongoId().withMessage("Student ID must be valid"),
    validateFields,
    handleErrors
];
