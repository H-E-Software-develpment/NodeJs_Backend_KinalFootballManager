import { body, param } from "express-validator";
import { findUser,validKinalEmail, findEmail, emailDuplicated, validRole} from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("completeName is required").isString().withMessage("your name must be a valid name"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid").custom(emailDuplicated).custom(validKinalEmail),
    body("phone").notEmpty().withMessage("phone number is required"),
    body("password").notEmpty().withMessage("Password is required").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body("academic").optional().isString().withMessage("academic code is required"),
    validateFields,
    handleErrors
];

export const loginValidator = [
    body("email").notEmpty().withMessage("Email is required").isString().withMessage("Email must be a string")
        .isEmail().withMessage("Invalid email format").custom(findEmail),
    body("password").notEmpty().withMessage("Password is required"),
    validateFields,
    handleErrors
];

/*
export const findUserValidator = [
    validateJWT,
    param("uid").notEmpty().withMessage("user is required").isMongoId().withMessage("The user provided is not valid").custom(findUser),
    validateFields,
    handleErrors
];

export const findUserForAdminValidator = [
    validateJWT,
    hasRoles("PLATFORM_ADMIN"),
    body("uid").optional().isMongoId().withMessage("The user provided is not valid").custom(findUser),
    body("name").optional().isString().withMessage("your name is not a valid name"),
    body("email").optional().isEmail().withMessage("Email is invalid").custom(findEmail),
    body("role").optional().isString().withMessage("role is not valid").custom(validRole),
    validateFields,
    handleErrors
];

export const getUsersValidator = [
    validateJWT,
    hasRoles("PLATFORM_ADMIN", "HOTEL_ADMIN"),
    validateFields,
    handleErrors
]

export const editUserValidator = [
    validateJWT,
    param("uid").notEmpty().withMessage("user is required").isMongoId().withMessage("The user provided is not valid").custom(findUser),
    body("name").optional().isString().withMessage("your name is not a valid name"),
    body("email").optional().isEmail().withMessage("Email is invalid").custom(emailDuplicated),
    validateFields,
    handleErrors
];

export const deleteUserValidator = [
    validateJWT,
    param("uid").notEmpty().withMessage("user is required").isMongoId().withMessage("The user provided is not valid").custom(findUser), 
    validateFields,
    handleErrors
];

export const changePasswordValidator = [
    validateJWT,
    param("uid").notEmpty().withMessage("user is required").isMongoId().withMessage("The user provided is not valid").custom(findUser), 
    body("password").notEmpty().withMessage("Password is required").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body("confirmation").notEmpty().withMessage("confirmation password is required"),
    validateFields,
    handleErrors
];

export const changeRoleValidator = [
    validateJWT,
    hasRoles("PLATFORM_ADMIN", "HOTEL_ADMIN"),
    param("uid").notEmpty().withMessage("user is required").isMongoId().withMessage("The user provided is not valid").custom(findUser), 
    body("role").notEmpty().withMessage("role is required").custom(validRole),
    validateFields,
    handleErrors
];
*/