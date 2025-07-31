import { body, param } from "express-validator";
import { findField} from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

//---------------- ADMINISTRATOR ROLES ---------------- // 
export const createFieldValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    body("name").notEmpty().withMessage("Field name is required").isString().withMessage("Your field name must be a valid name"),
    body("description").notEmpty().withMessage("Field description is required").isString().withMessage("Your field description must be a valid description"),
    validateFields,
    handleErrors
];

export const editFieldValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("fid").notEmpty().withMessage("user is required").isMongoId().withMessage("The field provided is not valid").custom(findField),
    body("name").optional().isString().withMessage("Your field name must be a valid name"),
    body("description").optional().isString().withMessage("Your field description must be a valid description"),
    validateFields,
    handleErrors
];

export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("fid").notEmpty().withMessage("user is required").isMongoId().withMessage("The user provided is not valid").custom(findField), 
    validateFields,
    handleErrors
];

//---------------- ALL ROLES ---------------- // 
export const findFieldsValidator = [
    validateJWT,
    param("fid").optional().isMongoId().withMessage("The field provided is not valid").custom(findField),
    body("name").optional().isString().withMessage("Your field name must be a valid name"),
    validateFields,
    handleErrors
];
