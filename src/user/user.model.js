import { Schema, model } from "mongoose";

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "complete name is needed for your account"],
        maxLength: [60, "Name cannot exceed 60 characters"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "phone numer is needed for your account"],
        maxLength: [8, "phone numer cannot exceed 8 characters"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "An email is required for your account"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "A password is required for your account"]
    },
    role: {
        type: String,
        enum: ["STUDENT", "ADMINSTRATOR"],
        default: "STUDENT"
    },
    academic:{
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        versionKey: false,
        timestamps: true
    });

userSchema.methods.toJSON = function () {
    const { __v,password, _id, ...userDb } = this.toObject();
    userDb.uid = _id;
    return userDb;
};

export default model("User", userSchema);
