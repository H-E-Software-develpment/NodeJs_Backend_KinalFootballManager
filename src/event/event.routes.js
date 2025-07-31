import { Router } from "express";
import { createEvent, editEvent, deleteEvent, findEvents } from "../event/event.controller.js";
import { createEventValidator, editEventValidator, deleteEventValidator, findEventsValidator } from "../middlewares/event-validators.js";

const router = Router();

/**
 * @openapi
 * /kinalfootballfield/v1/event/createEvent:
 *   post:
 *     tags: [Event]
 *     summary: Create a new event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: Campeonato 2025 }
 *               description: { type: string, example: Torneo anual de fútbol }
 *               dateFrom: { type: string, format: date-time, example: "2025-08-01T10:00:00Z" }
 *               dateTo: { type: string, format: date-time, example: "2025-08-10T18:00:00Z" }
 *     responses:
 *       201: { description: Event created }
 */
router.post("/createEvent", createEventValidator, createEvent);

/**
 * @openapi
 * /kinalfootballfield/v1/event/editEvent/{eid}:
 *   put:
 *     tags: [Event]
 *     summary: Edit an existing event
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eid
 *         schema: { type: string }
 *         required: true
 *         description: Mongo ID of the event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: Torneo Final 2025 }
 *               description: { type: string, example: Evento modificado }
 *               dateFrom: { type: string, format: date-time }
 *               dateTo: { type: string, format: date-time }
 *     responses:
 *       200: { description: Event updated }
 */
router.put("/editEvent/:eid", editEventValidator, editEvent);

/**
 * @openapi
 * /kinalfootballfield/v1/event/deleteEvent/{eid}:
 *   delete:
 *     tags: [Event]
 *     summary: Delete an event
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eid
 *         schema: { type: string }
 *         required: true
 *         description: Event ID to delete
 *     responses:
 *       200: { description: Event deleted }
 */
router.delete("/deleteEvent/:eid", deleteEventValidator, deleteEvent);

/**
 * @openapi
 * /kinalfootballfield/v1/event/findEvents:
 *   post:
 *     tags: [Event]
 *     summary: Find events with filters
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eid: { type: string, example: 64f2c9245b0e87b95c0dcf11 }
 *               name: { type: string, example: Campeonato }
 *               dateFrom: { type: string, format: date-time, example: "2025-08-01T00:00:00Z" }
 *               dateTo: { type: string, format: date-time, example: "2025-08-31T23:59:59Z" }
 *     responses:
 *       200: { description: Events retrieved }
 */
router.post("/findEvents", findEventsValidator, findEvents);

export default router;
