import { Router } from "express";
import {createField,editField,deleteField,findFields} from "./field.controller.js";
import {createFieldValidator,editFieldValidator,deleteUserValidator,fidnFieldsValidator} from "../middlewares/field-validators.js";

const router = Router();

/**
 * @swagger
 * /field/createField:
 *   post:
 *     tags:
 *       - Field
 *     summary: Create a new field
 *     description: Allows ADMINISTRATOR to register a new field.
 *     operationId: createField
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Field data to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Field created successfully.
 *       400:
 *         description: Field already exists or invalid data.
 *       500:
 *         description: Internal server error.
 */
router.post("/createField", createFieldValidator, createField);

/**
 * @swagger
 * /field/editField/{fid}:
 *   put:
 *     tags:
 *       - Field
 *     summary: Edit a field
 *     description: Allows ADMINISTRATOR to modify a field's data.
 *     operationId: editField
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fid
 *         required: true
 *         description: The ID of the field to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Field data to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Field updated successfully.
 *       400:
 *         description: Field not found or invalid ID.
 *       500:
 *         description: Internal server error.
 */
router.put("/editField/:fid", editFieldValidator, editField);

/**
 * @swagger
 * /field/deleteField/{fid}:
 *   delete:
 *     tags:
 *       - Field
 *     summary: Soft delete a field
 *     description: Allows ADMINISTRATOR to deactivate (soft delete) a field.
 *     operationId: deleteField
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fid
 *         required: true
 *         description: The ID of the field to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Field deleted successfully.
 *       404:
 *         description: Field not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/deleteField/:fid", deleteUserValidator, deleteField);

/**
 * @swagger
 * /field/findFields:
 *   post:
 *     tags:
 *       - Field
 *     summary: Find fields with filters
 *     description: Allows ADMINISTRATOR to search fields by ID or name.
 *     operationId: findFields
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Filter by ID or name (optional)
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fid:
 *                 type: string
 *               name:
 *                 type: string
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of results to return
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of results to skip
 *     responses:
 *       200:
 *         description: Fields found successfully.
 *       400:
 *         description: Invalid filters.
 *       500:
 *         description: Internal server error.
 */
router.post("/findFields", fidnFieldsValidator, findFields);

export default router;
