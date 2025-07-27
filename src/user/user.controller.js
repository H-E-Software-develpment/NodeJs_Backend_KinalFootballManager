import User from "./user.model.js";
import { hash, verify } from "argon2";

// ---------- ADMINISTRATOR ROLE ---------- //
//Allows ADMINISTRATORS to find users based on different parameters
//allows to find users to get their individual and detailed information (uid)
// allows to find users by name and email 
//allows to find users by their academic code
export const findUsers = async (req, res) => {
    try {
        const logged = req.userJwt;
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };
        const { uid, name, email, academic, role } = req.body;

        let filterParameter = { ...query };

        if (uid) filterParameter._id = uid;
        if (name) filterParameter.name = { $regex: name, $options: "i" };
        if (email) filterParameter.email = email;
        if (academic) filterParameter.academic = academic;
        if (role) filterParameter.role = role;

        let user = await User.find(filterParameter).skip(Number(from)).limit(Number(limit));

        const total = await User.countDocuments(filterParameter);

        return res.status(200).json({
            success: true,
            message: "Users found successfully",
            total,
            user
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to find the Users you sought",
            error: err.message,
        });
    }
};

//allows administratoras to edit only students accounts not other admins
//allows to change role of account student to administrator in case needed
export const editUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const newData = req.body;
        const logged = req.userJwt;

        const found = await User.findOne({ role: "STUDENT", status: true, uid });

        if (!found) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            });
        };

        const user = await User.findByIdAndUpdate(uid, newData, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Profile changes updated succesfully',
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'failed to update profile changes for the employee',
            error: err.message
        });
    }
};

//Allows to delete users account (only students not others admins)
export const deleteUser = async (req, res) => {
    try {
        const logged = req.userJwt;
        const { uid } = req.params;

        const found = await User.findOne({ role: "STUDENT", status: true, uid });
        if (!found) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        };

        await User.findByIdAndUpdate(uid, {
            status: false, name: `deleted: ${found.name}`,
            phone: `deleted: ${found.phone}`, email: `deleted: ${found.email}`
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully "
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "failed to delete account",
            error: err.message
        });
    }
};

// ---------- ALL ROLES - GENERAL ---------- //
//Shows the profile of the user logged in
export const showProfile = async (req, res) => {
    try {
        const logged = req.userJwt._id;
        const user = await User.findById(logged);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Account found successfully",
            user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to find this account",
            error: err.message
        });
    }
};

//edits the profile of the user logged in
export const editUserProfile = async (req, res) => {
    try {
        const logged = req.userJwt._id;
        const { name, phone, email, academic } = req.body;

        const found = await User.findById(logged);

        if (!found) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            });
        };
        const newData = {
            name: name || found.name,
            phone: phone || found.phone,
            email: email || found.email,
            academic: academic || found.academic
        };

        const user = await User.findByIdAndUpdate(logged, newData, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Profile changes updated succesfully',
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'failed to update profile changes',
            error: err.message
        });
    }
};

//Allows to change de password of the account logged in
export const changeUserPassword = async (req, res) => {
    try {
        const logged = req.userJwt._id;
        const { password, confirmation } = req.body;

        const found = await User.findById(logged);

        if (!found) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            });
        };

        const checkOldNew = await verify(found.password, password);
        if (checkOldNew) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be the same as the old one"
            });
        }

        if (password !== confirmation) {
            return res.status(400).json({
                success: false,
                message: "To confirm your password it needs to be the same as the new password"
            });
        }

        const newEncryptedPassword = await hash(password);

        await User.findByIdAndUpdate(logged, { password: newEncryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Password changed succesfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to update password",
            error: err.message
        });
    }
};