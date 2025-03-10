import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movie:{type : mongoose.Schema.Types.ObjectId, ref : "Movie", required : true},
    rentedAt: { type: Date, default: Date.now }, 
    startedAt: { type: Date, default: null }, 
    expiresAt: { type: Date, default: null } 
});

export default mongoose.model("Rentals", rentalSchema);
