import mongoose from "mongoose";

const sendmoneySchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    moneyto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    accountnmbr: {
        type: Number,
    },
    money: {
        type: Number
    },

})
export const Transfer = mongoose.model("Transfer", sendmoneySchema)