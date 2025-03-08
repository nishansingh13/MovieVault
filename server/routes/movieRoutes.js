import express from 'express';
import { getMovieDetails, getTrendings, saveMovie, searchMovies } from '../controllers/movieController.js';
import { getMoviesfromDB } from '../controllers/userMovieController.js';

const router = express.Router();

router.get('/movies', searchMovies);
router.post('/savemovie',saveMovie);
router.get('/movie/:id', getMovieDetails);
router.get('/trending', getTrendings);
router.get('/getfromDB', getMoviesfromDB);
// router.get('/movie/:id/credits', getMovieCredits);

export default router;
