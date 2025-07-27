import { Router } from "express";
import {findUsers,editUser,deleteUser,showProfile,editUserProfile,changeUserPassword} from "./user.controller.js";
import {findUsersValidator,editUserValidator,deleteUserValidator,showProfileValidator,editUserProfileValiator,changePasswordValidator} from "../middlewares/user-validators.js";

const router = Router();

/**
 * @swagger
 * /user/findUsers:
 *   post:
 *     tags:
 *       - User
 *     summary: Find users with filters (Admin Only)
 *     description: Allows ADMINISTRATOR users to search for users using filters like ID, name, email, academic code or role.
 *     operationId: findUsers
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Filters for user search (optional)
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               academic:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: ["STUDENT", "ADMINISTRATOR"]
 *     responses:
 *       200:
 *         description: Users found successfully.
 *       403:
 *         description: Unauthorized request (only ADMINISTRATOR can use this endpoint).
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal server error.
 */
router.post("/findUsers", findUsersValidator, findUsers);

/**
 * @swagger
 * /user/editUser/{uid}:
 *   put:
 *     tags:
 *       - User
 *     summary: Edit a student's information
 *     description: Allows ADMINISTRATORs to update student accounts only.
 *     operationId: editUser
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: The ID of the user to modify.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User data to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               academic:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: ["STUDENT", "ADMINISTRATOR"]
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Invalid request or user not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/editUser/:uid", editUserValidator, editUser);

/**
 * @swagger
 * /user/deleteUser/{uid}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a student's account
 *     description: Allows ADMINISTRATORs to soft delete student accounts.
 *     operationId: deleteUser
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       400:
 *         description: Invalid ID or user not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);

/**
 * @swagger
 * /user/showProfile:
 *   get:
 *     tags:
 *       - User
 *     summary: Show the logged-in user's profile
 *     description: Retrieves profile information of the currently authenticated user.
 *     operationId: showProfile
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data retrieved successfully.
 *       400:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/showProfile", showProfileValidator, showProfile);

/**
 * @swagger
 * /user/editUserProfile:
 *   put:
 *     tags:
 *       - User
 *     summary: Edit logged-in user's profile
 *     description: Allows any logged-in user to edit their personal data.
 *     operationId: editUserProfile
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Profile data to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               academic:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: User not found or invalid data.
 *       500:
 *         description: Internal server error.
 */
router.put("/editUserProfile", editUserProfileValiator, editUserProfile);

/**
 * @swagger
 * /user/changeUserPassword:
 *   put:
 *     tags:
 *       - User
 *     summary: Change logged-in user's password
 *     description: Allows a user to change their password securely.
 *     operationId: changeUserPassword
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Password update data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - confirmation
 *             properties:
 *               password:
 *                 type: string
 *               confirmation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       400:
 *         description: Validation error or password mismatch.
 *       500:
 *         description: Internal server error.
 */
router.put("/changeUserPassword", changePasswordValidator, changeUserPassword);

export default router;
