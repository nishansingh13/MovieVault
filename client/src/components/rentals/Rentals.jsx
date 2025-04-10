import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useConfig } from '../../context/ConfigContext';
import { motion } from 'framer-motion';
import { Calendar, Clock, Film, Loader2 } from 'lucide-react';
import Navbar from '../layout/Navbar';

function Rentals() {
  const { server, imageBaseUrl } = useConfig();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const display = async (rental) => {
    const query = rental.movie.movieId;

    try {
      const res = await axios.put(`${server}/api/rentals/rentalbyId`, { id: rental._id });
      console.log(res.data);
      const nres = await axios.post(`${server}/api/movies/trailer`, { id: query });
      const data = nres.data;
      window.open(`https://www.youtube.com/watch?v=${data}`);
    } catch (err) {
      console.error(err);
    }
  };

  const getRentals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${server}/api/rentals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setData(res.data.filter(r => r.movie));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRentals();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring'
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-3xl font-bold text-purple-500 ">
            My Rentals
          </h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={getRentals}
            disabled={loading}
            className="px-6 py-2 cursor-pointer rounded-lg bg-zinc-800 text-white font-medium flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Film className="w-4 h-4" />}
            Refresh
          </motion.button>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
          </div>
        ) : data.length === 0 ? (
          <motion.div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Film className="w-16 h-16 mb-4 opacity-30" />
            <p className="text-xl">No rentals found</p>
            <p className="text-sm mt-2">Rent a movie to see it here</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {data.map((rental, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-900/20 transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={`${imageBaseUrl}${rental.movie.poster_path}`}
                    alt={rental.movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-xl font-bold truncate">{rental.movie.title}</h2>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                    <span>Rented on: {new Date(rental.rentedAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center text-gray-300 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-purple-400" />
                    <span>
                      {rental.expiresAt
                        ? `Expires: ${new Date(rental.expiresAt).toLocaleDateString()}`
                        : 'Not started yet'}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => display(rental)}
                    className={`w-full py-2 cursor-pointer mt-2 rounded-lg ${
                      rental.startedAt
                        ? 'bg-purple-900/50 text-purple-200'
                        : 'bg-zinc-800 text-white'
                    } text-sm font-medium`}
                  >
                    {rental.startedAt ? 'Continue Watching' : 'Start Watching'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Rentals;
