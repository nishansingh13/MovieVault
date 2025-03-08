import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useConfig } from '../context/ConfigContext';
import Navbar from './layout/Navbar';
import { motion } from 'framer-motion';
import axios from 'axios';

function MovieSpecific() {
    const location = useLocation();
    const navigate = useNavigate();
    const { imageBaseUrl, server } = useConfig();
    const movie = location.state?.movie;
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Check if we have a valid movie ID
                if (!movie?.movieId && !id) {
                    throw new Error('No movie ID provided');
                }

                const movieId = movie?.movieId || id;
                const res = await axios.get(`${server}/api/movie/${movieId}`);
                
                if (res.data) {
                    setMovieDetails(res.data);
                } else {
                    throw new Error('No movie data received');
                }
            } catch (err) {
                console.error("Error fetching movie details:", err);
                setError(err.message);
                // Optionally redirect to home page after error
                // setTimeout(() => navigate('/'), 3000);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movie?.movieId, id, server, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-red-500 text-xl">
                    {error || 'Movie not found'}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="fixed inset-0 z-0"
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${imageBaseUrl}${movie.backdrop_path || movie.poster_path})`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
            </motion.div>

            <Navbar />

            {/* Content */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative z-10 p-8 pt-24"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div 
                        className="flex flex-col md:flex-row gap-8 backdrop-blur-sm bg-gray-900/30 rounded-xl p-6 shadow-2xl"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        {/* Poster */}
                        <motion.div 
                            className="w-full md:w-1/3"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={`${imageBaseUrl}${movie.poster_path}`}
                                alt={movie.title}
                                className="rounded-lg shadow-xl w-full"
                            />
                        </motion.div>

                        {/* Details */}
                        <div className="w-full md:w-2/3 space-y-6">
                            <motion.h1 
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="text-4xl font-bold text-white"
                            >
                                {movie.title}
                            </motion.h1>

                            <motion.p 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="text-gray-300 text-lg leading-relaxed"
                            >
                                {movie.overview}
                            </motion.p>

                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.4 }}
                                className="grid grid-cols-2 gap-4 text-lg"
                            >
                                <div className="p-4 bg-gray-900/50 rounded-lg">
                                    <p className="text-white font-semibold">Release Date</p>
                                    <p className="text-gray-300">{movieDetails?.release_date || "Unknown"}</p>
                                </div>
                                <div className="p-4 bg-gray-900/50 rounded-lg">
                                    <p className="text-white font-semibold">Rating</p>
                                    <p className="text-gray-300">{movieDetails?.vote_average?.toFixed(1)}/10</p>
                                </div>
                                <div className="p-4 bg-gray-900/50 rounded-lg">
                                    <p className="text-white font-semibold">Runtime</p>
                                    <p className="text-gray-300">{movieDetails?.runtime} minutes</p>
                                </div>
                                <div className="p-4 bg-gray-900/50 rounded-lg">
                                    <p className="text-white font-semibold">Genre</p>
                                    <p className="text-gray-300">
                                        {movieDetails?.genres?.map(g => g.name).join(", ")}
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6 }}
                                className="flex gap-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-black text-white px-6 py-2 rounded-lg"
                                >
                                    Watch Now
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gray-800 text-white px-6 py-2 rounded-lg"
                                >
                                    Add to Watchlist
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default MovieSpecific;
