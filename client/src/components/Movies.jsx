import React, { useState } from 'react'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import axios from 'axios'
import { useConfig } from '../context/ConfigContext';

function Movies() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const {imageBaseUrl,server} = useConfig();

    async function getMovies() {
        try {
            const res = await axios.get(`${server}/api/movies?search=${searchQuery || 'avengers'}`);
            setData(res.data.results);
        } catch(err) {
            console.error(err)
        }
    }
    async function saveData(movie) {
        try {
            console.log('Movie data being sent:', movie); 
            const response = await axios.post(`${server}/api/savemovie`, movie);
            
            if (response.status === 200) {
                console.log("Movie saved successfully");
            }
        } catch (err) {
            console.error("Error saving movie:", err.response.data.error || err.message);
        }
    }
   
    return (
        <>
         
            <div className="min-h-screen bg-neutral-100 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8 gap-4">
                        <h1 className="text-3xl font-bold text-white">MovieVault</h1>
                        <div className="flex gap-2">
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                                placeholder="Search movies..."
                            />
                            <button 
                                onClick={getMovies}
                                className="bg-black hover:bg-neutral-800 text-white px-6 py-2 rounded-lg transition duration-300"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.filter(movie => !movie.adult).map((movie) => (
                            <div 
                                key={movie.id} 
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
                            >
                                <img 
                                    src={imageBaseUrl + movie.poster_path} 
                                    alt={movie.title} 
                                    className="w-full h-96 object-cover"
                                />
                                <button className='p-2 bg-black text-white rounded-sm m-2 cursor-pointer' onClick={()=>saveData(movie)}>Add</button>
                                <div className="p-4">
                                    <h1 className="text-xl font-bold text-white mb-2">{movie.title}</h1>
                                    <p className="text-gray-300 text-sm line-clamp-3">{movie.overview}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Movies
