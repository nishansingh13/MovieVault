import axios from 'axios';
import Movie from '../models/Movie.js';

const tmdb_api = "6c420884d135e913472960df62122413";
const tmdb_url = "https://api.themoviedb.org/3";

export const getMoviesfromDB = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies", details: error.message });
    }
}