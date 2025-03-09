import React, { useEffect } from 'react'
import { useConfig } from '../context/ConfigContext';
import { useNavigate } from 'react-router-dom';

function ResultSearch() {
    const { searchResults , imageBaseUrl } = useConfig();
  const navigate = useNavigate();
    useEffect(() => {
        console.log(searchResults);
    }, [searchResults]);

    return (
        <div>
            {searchResults.length > 0 ? (
                <div className="container mx-auto py-8 my-[5rem]">
                    <h2 className="text-2xl font-bold text-white mb-4">Search Results</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {searchResults.map((movie) => (
                            <div key={movie._id} className="space-y-2">
                                <img 
                                  onClick={() => navigate(`/movie/${movie.movieId}`)}
                                    src={`${imageBaseUrl}${movie.poster_path}`} 
                                    alt={movie.title} 
                                    className="rounded-xl h-[15rem] sm:w-full object-cover object-top hover:scale-105 transition-all duration-300 cursor-pointer"
                                />
                                <h3 className="text-[0.7rem] font-bold text-white text-center">{movie.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-white text-center py-8">No results found</div>
            )}
        </div>
    );
}

export default ResultSearch;
