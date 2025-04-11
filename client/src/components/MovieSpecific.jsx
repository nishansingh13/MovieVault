import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useConfig } from '../context/ConfigContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner'
function MovieSpecific() {
    const { imageBaseUrl, server } = useConfig();
    const [movie, setmovie] = useState(null);
    const [pageLoading,setPageLoading] = useState(true); 
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchmovie = async () => {
           
            try {
                setPageLoading(true);
              
                const res = await axios.get(`${server}/api/movies/movie/${id}`);
                
                setmovie(res.data);
            } catch (err) {
                console.error("Error fetching movie details:", err);
                
            } finally {
                setPageLoading(false);
            }
        };
    
        fetchmovie();
    }, [id]);
    const rentMovie = async() => {
        try {
            setLoading(true);
            const movieId = parseInt(id);
            const res = await axios.post(`${server}/api/rentals`, 
                { movieId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
         
            await axios.post(`${server}/api/sendMail`, 
                {
                  movieName: movie.title
                
                }, 
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  }
                }
              );
              toast.success('Movie rented successfully');
              
        } catch(err) {
            console.log(err)
            toast.error(err.response?.data?.error || "Failed to rent movie" , err);
        }finally{
            setLoading(false);
        }
    }

    if (pageLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white  animate-spin"><Loader2/></div>
            </div>
        );
    }

   

    return (
        <div className="min-h-screen relative overflow-hidden">
           <div 
    className="z-50 absolute top-0 left-0 p-4 cursor-pointer text-white"
    onClick={() => navigate(-1)}
>
   <ArrowLeft className="w-8 h-8 scale-125" />
</div>     
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${imageBaseUrl}${movie.backdrop_path || movie.poster_path})`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
            </motion.div>


       
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative z-10 p-8 top-4 pt-[3rem]"
            >
                <div className="max-w-6xl mx-auto relative bottom-[3rem]">
                    <motion.div 
                        className="flex flex-col md:flex-row gap-8 backdrop-blur-sm bg-gray-900/30 rounded-xl p-6 shadow-2xl"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                     
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
                                    <p className="text-gray-300">{movie?.release_date || "Unknown"}</p>
                                </div>
                                <div className="p-4 bg-gray-900/50 rounded-lg">
                                    <p className="text-white font-semibold">Rating</p>
                                    <p className="text-gray-300">{movie?.vote_average?.toFixed(1)}/10</p>
                                </div>
                                <div className="p-4 bg-gray-900/50 rounded-lg">
                                    <p className="text-white font-semibold">Runtime</p>
                                    <p className="text-gray-300">{movie?.runtime} minutes</p>
                                </div>
                                <div className="p-4 bg-gray-900/50 rounded-lg">
                                    <p className="text-white font-semibold">Genre</p>
                                    <p className="text-gray-300">
                                        {movie?.genres?.map(g => g.name).join(", ")}
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6 }}
                                className="flex gap-4"
                            >   {!loading?(
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-zinc-700 text-white px-6 py-2 rounded-lg cursor-pointer"
                                    onClick={()=>rentMovie()}
                                >
                                    Rent Now
                                </motion.button>):
                                <div  className="bg-zinc-800 text-white px-6 py-2 rounded-lg cursor-pointer "> Renting movie <Loader2 className=' animate-spin inline-block p-1'/>
                                    </div>}
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
