import Event from './event.model.js';

// ---------- ADMINISTRATOR ROLE ---------- //
export const createEvent = async (req, res) => {
    try {
        const logged = req.userJwt;
        const { name, description, dateFrom, dateTo } = req.body;

        const exists = await Event.findOne({ name });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'This event already exists'
            });
        };

        const event = await Event.create({ name, description, dateFrom, dateTo });

        return res.status(201).json({
            success: true,
            message: 'Event created successfully',
            event
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create event',
            error: err.message
        });
    }
};

export const editEvent = async (req, res) => {
    try {
        const logged = req.userJwt;
        const { eid } = req.params;
        const { name, description, dateFrom, dateTo } = req.body;

        const found = await Event.findById(eid);

        if (!found || !eid || found.status === false) {
            return res.status(400).json({
                success: false,
                message: "Event not found"
            });
        };

        const newData = {
            name: name || found.name,
            description: description || found.description,
            dateFrom: dateFrom || found.dateFrom,
            dateTo: dateTo || found.dateTo
        };

        const event = await Event.findByIdAndUpdate(eid, newData, { new: true });

        return res.status(200).json({
            success: true,
            msg: 'Event changes updated successfully',
            event
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update event',
            error: err.message
        });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { eid } = req.params;
        const logged = req.userJwt;

        const found = await Event.findOne({ _id: eid, status: true });

        if (!found) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        await Event.findByIdAndUpdate(eid, {
            status: false,
            name: `deleted: ${found.name}`,
            description: `deleted: ${found.description}`
        });

        return res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete event',
            error: err.message
        });
    }
};

// ------------- ALL ROLES -------------- //
//Allows to find and see details of events
//Allows to filter by event ID, name, or date range
export const findEvents = async (req, res) => {
    try {
        const logged = req.userJwt;
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };
        const { eid, name } = req.body;

        let filterParameter = { ...query };

        if (eid) filterParameter._id = eid;
        if (name) filterParameter.name = { $regex: name, $options: "i" };

        const event = await Event.find(filterParameter).skip(Number(from)).limit(Number(limit));

        return res.status(200).json({
            success: true,
            message: "Events found successfully",
            event
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to find the events you sought",
            error: err.message,
        });
    }
};
