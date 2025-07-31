import { Schema, model } from "mongoose";

const eventSchema = Schema({
    name: {
        type: String,
        required: [true, "Event name is needed"],
        maxLength: [30, "Event name cannot exceed 60 characters"],
        unique: true
    },
    description: {
        type: String,
        maxLength: [200, "Event description cannot exceed 200 characters"],
    },
    dateFrom:{
        type: Date,
        required: [true, "Event date from is needed"],
    },
    dateTo:{
        type: Date,
        required: [true, "Event date to is needed"],
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

eventSchema.methods.toJSON = function () {
    const { __v, _id, ...eventDb } = this.toObject();
    eventDb.eid = _id;
    return eventDb;
};

export default model("Event", eventSchema);
