import { Schema, model } from "mongoose";

const fieldSchema = Schema({
    name: {
        type: String,
        required: [true, "Field name is needed"],
        maxLength: [30, "Field name cannot exceed 60 characters"],
        unique: true
    },
    description: {
        type: String,
        maxLength: [200, "Field description cannot exceed 200 characters"],
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

fieldSchema.methods.toJSON = function () {
    const { __v, _id, ...fieldDb } = this.toObject();
    fieldDb.fid = _id;
    return fieldDb;
};

export default model("Field", fieldSchema);
