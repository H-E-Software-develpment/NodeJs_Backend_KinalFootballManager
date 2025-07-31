import Field from './field.model.js';

// ---------- ADMINISTRATOR ROLE ---------- //
//Registration of a new field
export const createField = async (req, res) => {
    try {
        const logged = req.userJwt;
        const { name, description } = req.body;

        const exists = await Field.findOne({ name });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'This field already exists'
            });
        };

        const field = await Field.create({ name, description });

        return res.status(201).json({
            success: true,
            message: 'Field created successfully',
            field
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create field',
            error: err.message
        });
    }
};

export const editField = async (req, res) => {
    try {
        const logged = req.userJwt;
        const { fid } = req.params;
        const { name, description } = req.body;

        const found = await Field.findById(fid);

        if (!found || !fid || found.status === false) {
            return res.status(400).json({
                success: false,
                message: "field not found"
            });
        };

        const newData = {
            name: name || found.name,
            description: description || found.description
        };

        const field = await Field.findByIdAndUpdate(fid, newData, { new: true });

        res.status(200).json({
            success: true,
            msg: 'field changes updated succesfully',
            field
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update field',
            error: err.message
        });
    }
};

export const deleteField = async (req, res) => {
    try {
        const { fid } = req.params;
        const logged = req.userJwt;

        const found = await Field.findOne({ _id: fid, status: true });

        if (!found) {
            return res.status(404).json({
                success: false,
                message: 'Field not found'
            });
        }

        await Field.findByIdAndUpdate(fid, {
            status: false,
            name: `deleted: ${found.name}`, description: `deleted: ${found.description}`
        });

        return res.status(200).json({
            success: true,
            message: 'Field deleted successfully'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete field',
            error: err.message
        });
    }
};

//------------- ALL ROLES --------------//
//Allows to find and see details of each individual field by its id (fid)
// Allows to find by name of the field
export const findFields = async (req, res) => {
    try {
        const logged = req.userJwt;
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };
        const { fid, name } = req.body;

        let filterParameter = { ...query };

        if (fid) filterParameter._id = fid;
        if (name) filterParameter.name = { $regex: name, $options: "i" };

        let field = await Field.find(filterParameter).skip(Number(from)).limit(Number(limit));

        return res.status(200).json({
            success: true,
            message: "Fields found successfully",
            field
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to find the fields you sought",
            error: err.message,
        });
    }
};
