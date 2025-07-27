import { body, param } from "express-validator";
import { findUser,validKinalEmail, findEmail, emailDuplicated, validRole} from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

//---------------- WITHOUT ROLES ---------------- // 
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
    body("email").notEmpty().withMessage("Email is required").isString().withMessage("Email must be a string").
        isEmail().withMessage("Invalid email format").custom(findEmail).custom(validKinalEmail),
    body("password").notEmpty().withMessage("Password is required"),
    validateFields,
    handleErrors
];

//---------------- ONLY ADMINISTRATOR ROLES ---------------- // 
export const findUsersValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    body("uid").optional().isMongoId().withMessage("The user provided is not valid").custom(findUser),
    body("name").optional().isString().withMessage("your name is not a valid name"),
    body("email").optional().isEmail().withMessage("Email is invalid").custom(findEmail).custom(validKinalEmail),
    body("academic").optional().isString().withMessage("your academic code is not valid"),
    body("role").optional().isString().withMessage("role is not valid").custom(validRole),
    validateFields,
    handleErrors
];

export const editUserValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("uid").notEmpty().withMessage("user is required").isMongoId().withMessage("The user provided is not valid").custom(findUser),
    body("name").optional().isString().withMessage("your name is not a valid name"),
    body("phone").optional().isString().withMessage("your phone number is not a valid"),
    body("email").optional().isEmail().withMessage("Email is invalid").custom(findEmail).custom(validKinalEmail),
    body("academic").optional().isString().withMessage("your academic code is not valid"),
    body("role").optional().isString().withMessage("role is not valid").custom(validRole),
    validateFields,
    handleErrors
];

export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMINISTRATOR"),
    param("uid").notEmpty().withMessage("user is required").isMongoId().withMessage("The user provided is not valid").custom(findUser), 
    validateFields,
    handleErrors
];

//---------------- ALL ROLES ---------------- // 

export const showProfileValidator = [
    validateJWT,
    validateFields,
    handleErrors
];

export const editUserProfileValiator = [
    validateJWT,
    body("name").optional().isString().withMessage("your name is not a valid name"),
    body("phone").optional().isString().withMessage("your phone number is not a valid"),
    body("email").optional().isEmail().withMessage("Email is invalid").custom(findEmail).custom(validKinalEmail),
    body("academic").optional().isString().withMessage("your academic code is not valid"),
    validateFields,
    handleErrors
]

export const changePasswordValidator = [
    validateJWT,
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

