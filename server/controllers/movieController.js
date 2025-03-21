const axios = require('axios');
const Movie = require('../models/Movie');
const { genreMap } = require('../config/database');

const tmdb_url = "https://api.themoviedb.org/3";

const searchMovies = async (req, res) => {
    try {
        const { search } = req.query;
        if (!search) return res.status(400).json({ error: "Movie title is required" });

        const response = await axios.get(`${tmdb_url}/search/movie`, {
            params: { api_key: process.env.tmdb_api, query: search }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data", details: error.message });
    }
};

const getTrendings = async (req, res) => {
    try {
        const response = await axios.get(`${tmdb_url}/trending/movie/week`, {
            params: { api_key: process.env.tmdb_api }
        });

        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch trending movies", details: error });
    }
};

const getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                error: "Movie ID is required",
                details: "No movie ID provided in the request"
            });
        }

        const response = await axios.get(`${tmdb_url}/movie/${id}`, {
            params: { api_key: process.env.tmdb_api }
        });

        if (!response.data) {
            return res.status(404).json({
                error: "Movie not found",
                details: `No movie found with ID: ${id}`
            });
        }

        res.json(response.data);
    } catch (error) {
        console.error('Movie details error:', error);
        res.status(500).json({
            error: "Failed to fetch movie details",
            details: error.message
        });
    }
};

const saveMovie = async (req, res) => {
    try {
        const { title, id, poster_path, overview, genre_ids, release_date } = req.body;

        const existingMovie = await Movie.findOne({ movieId: id });
        if (existingMovie) {
            return res.status(400).json({ error: "Movie already added" });
        }

        // Convert genre IDs to genre names
        const genres = genre_ids.map(genreId => genreMap[genreId] || "Unknown");

        const movie = new Movie({
            title,
            movieId: id,
            poster_path,
            overview,
            genre: genres, // ✅ Now storing actual genre names
            release_date
        });

        const savedMovie = await movie.save();
        res.json(savedMovie);
    } catch (error) {
        res.status(500).json({ error: "Failed to save movie", details: error.message });
    }
};

module.exports = { searchMovies, getTrendings, getMovieDetails, saveMovie };
