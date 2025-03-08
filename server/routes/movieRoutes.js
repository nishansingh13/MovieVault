import express from 'express';
import { getMovieDetails, saveMovie, searchMovies } from '../controllers/movieController.js';

const router = express.Router();

router.get('/movies', searchMovies);
router.post('/savemovie',saveMovie);
router.get('/movie/:id', getMovieDetails);
// router.get('/movie/:id/credits', getMovieCredits);

export default router;
