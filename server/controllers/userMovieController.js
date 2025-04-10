const axios = require('axios');
const Movie = require('../models/Movie');

const getMoviesfromDB = async (req, res) => {
    try {
        const movies = await Movie.find({isDeleted:false});
        
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies", details: error.message });
    }
};

const searchMoviesfromDB = async (req, res) => {
    try {
        const { search } = req.query;
        if (!search) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const movies = await Movie.find({
            title: { $regex: search, $options: "i" },
            isDeleted: false,
          });
          

        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies", details: error.message });
    }
};
const deleteMoviefromDB = async(req,res)=>{
    try{
        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({ error: "Movie ID is required" });
        }
        const movie = await Movie.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
       

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        res.status(200) . json({ message: "Movie deleted successfully",movie });  
    }catch(error){
        res.status(500).json({ error: "Failed to fetch movies", details: error.message });
    }
    
}

module.exports = { getMoviesfromDB, searchMoviesfromDB,deleteMoviefromDB };