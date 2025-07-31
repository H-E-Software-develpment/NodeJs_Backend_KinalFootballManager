import { Schema, model } from "mongoose";

const reservationSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Student ID is required"]
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
        required: [true, "Payment metod ID is required"]
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Teacher ID is required"]
    },
    date:{
        type: Date,
        required: [true, "Event date from is needed"],
    },
    timeRange: {
        type: TimeRanges,
        required: [true, "Check-in date is required"]
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

reservationSchema.methods.toJSON = function () {
    const { __v, _id, ...reservationDb } = this.toObject();
    reservationDb.reid = _id;
    return reservationDb;
};

export default model("Reservation", reservationSchema);
