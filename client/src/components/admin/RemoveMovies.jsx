import axios from 'axios';
import { useConfig } from '../../context/ConfigContext';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Loader2, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function RemoveMovies() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { server, imageBaseUrl } = useConfig();
    const [loading, setLoading] = useState(false);
    const [loadingMovieId, setLoadingMovieId] = useState(null);
   
    const removeMovie = async(movie)=>{
        
            try {
                setLoadingMovieId(movie._id);
             
                const res = await axios.delete(`${server}/api/movies/removemovie`,
                    {data: { id: movie._id } }
                );
                console.log(res.data);
                if (res.status === 200) {
                    setMovies(movies.filter(m => m._id !== movie._id));
                    setFilteredMovies(filteredMovies.filter(m => m._id !== movie._id));
                    toast.success("Movie removed from collection");
                }
            } catch (err) {
                console.error("Error removing movie", err.response?.data || err.message);
            } finally {
                setLoadingMovieId(null);
            }
        
    }
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };
    useEffect(() => {
        const data = localStorage.getItem("user");
        const parsedData = JSON.parse(data);
        if(!data || parsedData?.role==0){
          navigate("/"); 
        }
       
      
      }, []);
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring" }
        }
    };

    async function getMoviesfromDB(){
        try{
            setLoading(true);
            const res = await axios.get(`${server}/api/movies/getfromDB`);
            
            if(res.status === 200) {
                
                setMovies(res.data);
                
                setFilteredMovies(res.data);
            }
        }catch(err){
            console.error("Error getting movies from DB", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMoviesfromDB(); 
    }, []);
    
    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setFilteredMovies(movies);
        } else {
            const filtered = movies.filter(movie => 
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredMovies(filtered);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);
      
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 pt-10 pb-20">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4"
                >
                    <h1 className="text-3xl font-bold text-purple-500">
                        Remove Movies
                    </h1>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-initial">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-64 px-10 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                                placeholder="Search movie to remove"
                            />
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={getMoviesfromDB}
                            className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition duration-300 flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Film className="w-5 h-5" />}
                            Refresh
                        </motion.button>
                    </div>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
                    </div>
                ) : filteredMovies.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-64 text-gray-400"
                    >
                        <Film className="w-16 h-16 mb-4 opacity-30" />
                        <p className="text-xl">No movies found</p>
                        <p className="text-sm mt-2">There are no movies to remove in the collection</p>
                    </motion.div>
                ) : (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredMovies.map((movie) => (
                            <motion.div 
                                key={movie._id}
                                variants={itemVariants}
                                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-900/20 transition-shadow duration-300"
                            >
                                <div className="relative">
                                    <img 
                                        src={`${imageBaseUrl}${movie.poster_path}`} 
                                        alt={movie.title} 
                                        className="w-full h-[400px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h2 className="text-xl font-bold truncate">{movie.title}</h2>
                                    </div>
                                </div>
                                
                                <div className="p-4 space-y-3">
                                    <p className="text-gray-300 text-sm line-clamp-3">{movie.overview}</p>
                                    
                                    {loadingMovieId === movie._id ? (
                                        <div className='w-full py-2 bg-red-900/60 cursor-pointer rounded-lg text-white flex items-center justify-center gap-2'>
                                            Removing <Loader2 className='p-1 animate-spin'/>
                                        </div>
                                    ) : (
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={()=>removeMovie(movie)}
                                            className="w-full py-2 bg-red-800 cursor-pointer hover:bg-red-700 rounded-lg text-white flex items-center justify-center gap-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Remove from Collection
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default RemoveMovies;
