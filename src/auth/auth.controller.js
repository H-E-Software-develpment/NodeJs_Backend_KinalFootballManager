import { hash,verify } from "argon2";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try {
        const data = req.body;

        const encryptedPassword = await hash(data.password);

        data.password = encryptedPassword;

        const user = await User.create(data);

        return res.status(201).json({
            message: "User registered succesfully",
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed,check the information",
            error: err.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user || user.status === false) {
            return res.status(400).json({
                message: "Information incorrect",
                error: "check the information"
            });
        };

        const correctPassword = await verify(user.password, password);

        if (!correctPassword) {
            return res.status(400).json({
                message: "Information incorrect",
                error: "check the information"
            });
        }
        const token = await generateJWT(user._id);

        return res.status(200).json({
            message: "Login successful",
            token,
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        });
    }
};

