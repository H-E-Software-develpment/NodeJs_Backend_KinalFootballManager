import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Student ID is required"]
    },
    bank: {
        type: String,
        enum: ["GYT CONTINENTAL", "BANCO INDUSTRIAL",
            "BANRURAL", "BAC", "BANCO PROMERICA", "BAM", "FICOHSA"],
    },
    type: {
        type: String,
        enum: ["DEBIT", "CREDIT"],
    },
    card: {
        type: String,
        enum: ["VISA", "MASTERCARD"],
    },
    holder: {
        type: String,
        required: [true, "the holders name is needed"],
        maxLength: [60, "Name cannot exceed 60 characters"],
    },
    cardNumber: {
        type: String,
        required: [true, "the card numnber is needed"],
        maxLength: [17, "card number cannot exceed 60 characters"],
    },
    dueDate: {
        type: Date,
        required: [true, "The card due date is needed"],
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: "Due date must be a future date"
        }
    },
    cvv: {
        type: String,
        required: [true, "the card security code is needed"],
        maxLength: [4, "card cvv cannot exceed 4 characters"],
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

paymentSchema.pre('save', function(next) {
    if (!this.card) { 
        const visaBanks = ["BANCO INDUSTRIAL", "BANRURAL", "BAC"];
        const mastercardBanks = ["GYT CONTINENTAL", "BANCO PROMERICA", "BAM", "FICOHSA"];

        if (visaBanks.includes(this.bank)) {
            this.card = "VISA";
        } else if (mastercardBanks.includes(this.bank)) {
            this.card = "MASTERCARD";
        }
    }
    next();
});

paymentSchema.methods.toJSON = function () {
    const { __v, _id, cardNumber, cvv, ...paymentDb } = this.toObject();
    paymentDb.pid = _id;
    paymentDb.cardNumber = `**** **** **** ${cardNumber.slice(-4)}`;
    return paymentDb;
};

export default model("Payment", paymentSchema);
