import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';

function ResultSearch() {
    const { searchResults, imageBaseUrl } = useConfig();
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring" }
        }
    };

    return (
        <div className="min-h-screen bg-black pt-24">
            {searchResults.length > 0 ? (
                <div className="container mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-purple-500">Search Results</h2>
                    </motion.div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5"
                    >
                        {searchResults.map((movie) => (
                            <motion.div 
                                key={movie._id} 
                                variants={itemVariants}
                                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-900/20 transition-shadow duration-300"
                            >
                                <div className="aspect-[2/3] overflow-hidden">
                                    <img 
                                        onClick={() => navigate(`/movie/${movie.movieId}`)}
                                        src={`${imageBaseUrl}${movie.poster_path}`} 
                                        alt={movie.title} 
                                        className="w-full h-full object-cover hover:scale-105 transition-all duration-300 cursor-pointer"
                                    />
                                </div>
                                <div className="p-2">
                                    <h3 className="text-sm text-white font-medium text-center truncate">
                                        {movie.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-[60vh] text-gray-400"
                >
                    <Film className="w-16 h-16 mb-4 opacity-30" />
                    <p className="text-xl">No results found</p>
                    <p className="text-sm mt-2">Try searching for something else</p>
                </motion.div>
            )}
        </div>
    );
}

export default ResultSearch;
