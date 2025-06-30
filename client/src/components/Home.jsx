import React, { useEffect, useState } from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import axios from 'axios';
import { useConfig } from '../context/ConfigContext';
import { PlayCircle} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ResultSearch from './ResultSearch';
import MovieCarousel from './extras/MovieCarousel';

function Home() {
  const navigate = useNavigate();
  const {server, imageBaseUrl,hide} = useConfig();
  const [trendingMovie, setTrendingMovie] = useState(null);
  const [availMovies, setAvailMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const genresToShow = [ "Action", "Comedy", "Horror", "Adventure", "Animation"]; 


  async function getTop(movie) {
    try {
      setTrendingMovie(movie);
    } catch(err) {
        console.error("Error getting trending data", err.response?.data || err.message);
    }
  }

  async function getMoviesfromDB(){
    try {
        setIsLoading(true);
        const res = await axios.get(`${server}/api/movies/getfromDB`);
        if(res.status === 200) {
            setAvailMovies(res.data);
        }
    } catch(err) {
        console.error("Error getting movies from DB", err.response?.data || err.message);
    } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    const data = localStorage.getItem("user");
    const parsedData = JSON.parse(data);
    if(!data || parsedData?.role==1){
      navigate("/login"); 
    }
    getMoviesfromDB();
    getTop();
  
  }, []);
  useEffect(()=>{
    getTop(availMovies[0]);

  },[availMovies])
  

  const trendingAnimation ={
      hidden:{
        opacity :0
      },
      visible : {
        opacity :1,
        transition : {
          duration :2,
          ease: "easeOut"
        }
      }
  }
  const soloAnimation = {
    hidden :{
      
      opacity :0
    },
    visible :{
      y:0,
      opacity:1,
      transition:{
        duration :1.5,
        ease : "easeOut"
      }
    }
  }
  // Loader component (purple theme, animated)
  const Loader = () => (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-20 h-20 rounded-full border-8 border-purple-500 border-t-transparent animate-spin mb-6"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        style={{ borderTopColor: '#a78bfa' }}
      />
      <motion.div
        className="text-xl font-semibold text-purple-300 tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Loading Movie Vault...
      </motion.div>
    </motion.div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-black">
       <Navbar />
       {isLoading ? (
      <Loader />
    ) : (
      <>
        <motion.div className={`relative h-[40vh] sm:h-[50vh] md:h-[60vh] ${hide && 'hidden'}`} variants={trendingAnimation} initial="hidden" animate="visible">
     
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{
            backgroundImage: `url(${imageBaseUrl}${trendingMovie?.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/90" />
        </div>

 
        
        <div className="relative z-10 container mx-auto px-4 pt-20 md:pt-24"> {/* Reduced padding top */}
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold mb-3">{trendingMovie?.title}</h2>
            <p className="text-sm md:text-lg text-gray-200 mb-6 max-w-2xl line-clamp-3 md:line-clamp-none">{trendingMovie?.overview}</p>
            <motion.button className="bg-red-800 cursor-pointer text-white px-4 md:px-6 py-2 rounded-lg hover:bg-red-900 transition-colors duration-300 text-sm md:text-base"
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/movie/${trendingMovie?.movieId}`)}  
            >
              Watch This <PlayCircle className="w-4 h-4 md:w-6 md:h-6 inline-block ml-2" />
            </motion.button>
          </div>
        </div>
      </motion.div>
       

      <div className={`flex-grow py-4 md:py-8 bg-black  ${hide && 'hidden'}`}>
        {genresToShow.map((genre) => (
          availMovies.length > 0 && (
            <MovieCarousel  movies={availMovies} genre={genre} />
          )
        ))}
      </div>
      {hide && <ResultSearch/>}
      </>
    )}
    <Footer/>
    </div>
  );
}

export default Home;
