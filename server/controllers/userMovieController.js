import axios from 'axios';
import Movie from '../models/Movie.js';

export const getMoviesfromDB = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies", details: error.message });
    }
}
export const searchMoviesfromDB = async (req, res) => {
    try {
        const {search} = req.query;
        if(!search) {
            return res.status(400).json({ error: "Search query is required" });
        }
        const movies = await Movie.find({ title: { $regex: search, $options: "i" } });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies", details: error.message });
    }
}