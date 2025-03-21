const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    rentedAt: { type: Date, default: Date.now },
    startedAt: { type: Date, default: null },
    expiresAt: { type: Date, default: null }
});

module.exports = mongoose.model("Rentals", rentalSchema);
