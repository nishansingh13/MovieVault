const axios = require('axios');
const Movie = require('../models/Movie');
const { genreMap } = require('../config/database');

const tmdb_url = "https://api.themoviedb.org/3";

/**
 * Search for movies by title
 * @route GET /api/movies/search
 * @param {string} search - Movie title to search for
 * @returns {Object} Search results from TMDB API
 */
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

/**
 * Get trending movies for the week
 * @route GET /api/movies/trending
 * @returns {Array} List of trending movies
 */
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

/**
 * Get detailed information about a specific movie
 * @route GET /api/movies/:id
 * @param {string} id - TMDB movie ID
 * @returns {Object} Detailed movie information
 */
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
const getTrailer = async(req,res)=>{
        try{
            const {id} = req.body;
            const response = await axios.get(`${tmdb_url}/movie/${id}/videos`,{
                params: { api_key: process.env.tmdb_api }
            });
            res.json(response.data.results.length>0? response.data.results[0].key : {error:"No trailer found"});

        }catch(error){
            res.status(500).json({error:"Failed to fetch trailer",error});
        }
}
const saveMovie = async (req, res) => {
    try {
        const { title, id, poster_path, overview, genre_ids, release_date } = req.body;

        const existingMovie = await Movie.findOne({ movieId: id });
        if (existingMovie && existingMovie.isDeleted === true) {
            await Movie.findByIdAndUpdate(existingMovie._id, { isDeleted: false });
           return res.status(200).json({ message: "Movie added successfully" });
        }
        else if(existingMovie){
            return res.status(400).json({ error: "Movie already added" });
        }

       
        const genres = genre_ids.map(genreId => genreMap[genreId] || "Unknown");

        const movie = new Movie({
            title,
            movieId: id,
            poster_path,
            overview,
            genre: genres, 
            release_date
        });

        const savedMovie = await movie.save();
        res.json(savedMovie);
    } catch (error) {
        res.status(500).json({ error: "Failed to save movie", details: error.message });
    }
    
};

module.exports = { searchMovies, getTrendings, getMovieDetails, saveMovie , getTrailer };
