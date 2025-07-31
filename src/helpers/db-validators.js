import User from "../user/user.model.js";
import Field from "../field/field.model.js";
import Event from "../event/event.model.js";
import Payment from "../payment/payment.model.js";

export const findUser = async (uid = " ") => {
    const user = await User.findById(uid);
    if (!user) {
        throw new Error(`The user provided couldn't be found or doesn't exist`);
    }
};

export const findEmail = async (email = " ") => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error(`The account provided couldn't be found or doesn't exist`);
    }
};

export const validKinalEmail = async (email = " ") => {
    const valid =  email.endsWith("@kinal.edu.gt");
    if (!valid) {
        throw new Error(`The email provided is not a valid Kinal email`);
    }
};

export const emailDuplicated = async (email = " ") => {
    const user = await User.findOne({ email });
    if (user) {
        throw new Error(`The email provided is already in use, Log in to your account`);
    }
};

export const validRole = async (role = " ") => {
    if (role !== "STUDENT" && role !== "ADMINISTRATOR") {
        throw new Error(`Unvalid role`);
    };
};

export const findField = async (fid = " ") => {
    const field = await Field.findById(fid);
    if (!field) {
        throw new Error(`The field provided couldn't be found or doesn't exist`);
    }
};

export const findEvent = async (eid = " ") => {
    const event = await Event.findById(eid);
    if (!event) {
        throw new Error(`The event provided couldn't be found or doesn't exist`);
    }
};

export const findPayment = async (pid = " ") => {
    const payment = await Payment.findById(pid);
    if (!payment) {
        throw new Error(`The payment provided couldn't be found or doesn't exist`);
    }
};