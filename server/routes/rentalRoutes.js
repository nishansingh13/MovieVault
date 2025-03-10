import express from "express";
import { addRental, getRentals } from "../controllers/rentalControllers.js";
import { authenticate } from "../middleware/authController.js";
const router = express.Router();

router.post("/",authenticate,addRental);
router.get("/",authenticate,getRentals);


export default router;