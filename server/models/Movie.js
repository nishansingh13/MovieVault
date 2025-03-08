import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    movieId: { type: Number, required: true },
    poster_path: String,
    overview: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Movie', movieSchema);
