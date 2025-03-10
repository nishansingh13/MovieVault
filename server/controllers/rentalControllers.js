import Rentals from "../models/Rentals.js"; 
import Movies from "../models/Movie.js";

export const addRental = async (req, res) => {
    try {
        const userId = req.user.id;
        const { movieId } = req.body; 

        if (!userId || !movieId) {
            return res.status(400).json({ error: "User ID and Movie ID are required" });
        }
        const movie = await Movies.findOne({ movieId});

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

       
        const rental = new Rentals({ 
            user: userId,
            movie: movie._id
        });

        await rental.save();
        res.status(201).json({ message: "Movie rented successfully", rental });

    } catch (error) {
        res.status(500).json({ error: "Failed to rent movie", details: error.message });
    }
};

export const getRentals = async(req,res)=>{
    try{
        const id = req.user.id;
        const exist = await Rentals.find({user:id}).populate("user" ,"-password").populate("movie");
        res.json(exist);
    }catch(error){
        res.status(500).json({ error: "Failed to fetch rentals", details: error.message });
    }
}
