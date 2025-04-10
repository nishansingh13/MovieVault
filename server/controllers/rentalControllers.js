const Rentals = require("../models/Rentals");
const Movies = require("../models/Movie");

const addRental = async (req, res) => {
    try {
        const userId = req.user.id;
        const { movieId } = req.body;
        
        if (!userId || !movieId) {
            return res.status(400).json({ error: "User ID and Movie ID are required" });
        }
        const movie = await Movies.findOne({ movieId });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const exists = await Rentals.findOne({ user: userId, movie: movie._id });
        if (exists) return res.status(400).json({ error: "Movie already rented" });
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

const getRentals = async (req, res) => {
    try {
        const id = req.user.id;
        const exist = await Rentals.find({ user: id }).populate("user", "-password").populate("movie");
        res.json(exist);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch rentals", details: error.message });
    }
};
const getRentalById = async (req, res) => {
    try {
        const {id} = req.body;
        const rental = await Rentals.findByIdAndUpdate(id, {
            startedAt: new Date(),
            expiresAt : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) 
            
        },{new:true});
 

        if (!rental) {
            return res.status(404).json({ error: "Rental not found" });
        }
        res.json(rental)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch rental", details: error.message });
    }
}
module.exports = { addRental, getRentals,getRentalById };
