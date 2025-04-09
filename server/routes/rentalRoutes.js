const express = require("express");
const { addRental, getRentals, getRentalById } = require("../controllers/rentalControllers");
const { authenticate } = require("../middleware/authController");

const router = express.Router();

router.post("/", authenticate, addRental);
router.get("/", authenticate, getRentals);
router.put('/rentalbyId',getRentalById)
module.exports = router;