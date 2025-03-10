import React, { useEffect, useState } from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import axios from 'axios';
import { useConfig } from '../context/ConfigContext';
import { PlayCircle} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ResultSearch from './ResultSearch';

function Home() {
  const navigate = useNavigate();
  const {server, imageBaseUrl,hide} = useConfig();
  const [trendingMovie, setTrendingMovie] = useState(null);
  const [availMovies, setAvailMovies] = useState([]);
  

  async function getTrending() {
    try {
        const res = await axios.get(`${server}/api/movies/trending`);
        if(res.status === 200) {
            setTrendingMovie(res.data[0]);
        }
    } catch(err) {
        console.error("Error getting trending data", err.response?.data || err.message);
    }
  }

  async function getMoviesfromDB(){
    try {
        const res = await axios.get(`${server}/api/movies/getfromDB`);
        if(res.status === 200) {
            setAvailMovies(res.data);
        }
    } catch(err) {
        console.error("Error getting movies from DB", err.response?.data || err.message);
    }
  }

  useEffect(() => {
    const data = localStorage.getItem("user");
    if(!data){
      navigate("/login");
    }
    getTrending();
    getMoviesfromDB();
  }, []);
  

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
 
  return (
    <div className="flex flex-col min-h-screen bg-black">
       <Navbar />
      <motion.div className={ `relative h-[60vh] ${hide && 'hidden'}`} variants={trendingAnimation} initial="hidden" animate="visible">
     
        <div 
          className="absolute inset-0 bg-cover bg-center" // Changed from bg-center to bg-top
          style={{
            backgroundImage: `url(${imageBaseUrl}${trendingMovie?.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/90" />
        </div>

 
        
        <div className="relative z-10 pt-24 px-8 max-w-7xl mx-auto"> {/* Reduced padding top */}
          <h2 className="text-4xl text-white font-bold mb-3">{trendingMovie?.title}</h2>
          <p className="text-lg text-gray-200 mb-6 max-w-2xl">{trendingMovie?.overview}</p>
          <motion.button className="bg-red-800 text-white px-6 cursor-pointer py-2 rounded-lg hover:bg-red-900 transition-colors duration-300"
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}

          >
            Watch This <PlayCircle className="w-6 h-6 inline-block ml-2" />
          </motion.button>
        </div>
      </motion.div>


      <div className={`flex-grow py-2 bg-black  ${hide && 'hidden'}`}>
       {availMovies.length > 0 && (
        <motion.div className="container mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Available Movies</h2>
          <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 "
          // variants={movieAnimation}
          initial="hidden"
          animate="visible"
          >
            {availMovies.map((movie) => (
              <motion.div key={movie._id} className="space-y-2" variants={soloAnimation} >
                <img 
                  onClick={() => navigate(`/movie/${movie.movieId}`)}
                  src={`${imageBaseUrl}${movie.poster_path}`} 
                  alt={movie.title} 
                  className="rounded-xl h-[15rem] sm:w-full object-cover object-top hover:scale-105 transition-all duration-300 cursor-pointer"
                />
                <h3 className="text-[0.7rem] font-bold text-white text-center">{movie.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
      </div>
      {hide &&
      <ResultSearch/>}
      <Footer/>
    </div>
  );
}

export default Home;
