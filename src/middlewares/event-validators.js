import { body, param } from "express-validator";
import { findEvent } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createEventValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    body("name").notEmpty().withMessage("Event name is required").isString().withMessage("Event name must be a valid string"),
    body("description").notEmpty().withMessage("Event description is required").isString().withMessage("Event description must be a valid string"),
    body("dateFrom").notEmpty().withMessage("Start date is required").isISO8601().withMessage("Start date must be a valid ISO date"),
    body("dateTo").notEmpty().withMessage("End date is required").isISO8601().withMessage("End date must be a valid ISO date"),
    validateFields,
    handleErrors
];

export const editEventValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("eid").notEmpty().withMessage("Event ID is required").isMongoId().withMessage("Invalid event ID format").custom(findEvent),
    body("name").optional().isString().withMessage("Event name must be a valid string"),
    body("description").optional().isString().withMessage("Event description must be a valid string"),
    body("dateFrom").optional().isISO8601().withMessage("Start date must be a valid ISO date"),
    body("dateTo").optional().isISO8601().withMessage("End date must be a valid ISO date"),
    validateFields,
    handleErrors
];

export const deleteEventValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("eid").notEmpty().withMessage("Event ID is required").isMongoId().withMessage("Invalid event ID format").custom(findEvent),
    validateFields,
    handleErrors
];

export const findEventsValidator = [
    validateJWT,
    body("eid").optional().isMongoId().withMessage("Invalid event ID format").custom(findEvent),
    body("name").optional().isString().withMessage("Event name must be a valid string"),
    body("dateFrom").optional().isISO8601().withMessage("Start date must be a valid ISO date"),
    body("dateTo").optional().isISO8601().withMessage("End date must be a valid ISO date"),
    validateFields,
    handleErrors
];
