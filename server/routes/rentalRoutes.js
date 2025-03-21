const express = require("express");
const { addRental, getRentals } = require("../controllers/rentalControllers");
const { authenticate } = require("../middleware/authController");

const router = express.Router();

router.post("/", authenticate, addRental);
router.get("/", authenticate, getRentals);

module.exports = router;