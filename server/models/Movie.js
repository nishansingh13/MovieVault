const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    movieId: { type: Number, required: true },
    poster_path: String,
    genre: [String],
    release_date: String,
    overview: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
    , isDeleted: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Movie', movieSchema);
