const express = require('express');
const { getMovieDetails, getTrendings, saveMovie, searchMovies, getTrailer } = require('../controllers/movieController');
const { getMoviesfromDB, searchMoviesfromDB } = require('../controllers/userMovieController');

const router = express.Router();

router.get('/', searchMovies);
router.post('/savemovie', saveMovie);
router.get('/movie/:id', getMovieDetails);
router.get('/trending', getTrendings);
router.get('/getfromDB', getMoviesfromDB);
router.get('/searchfromDB', searchMoviesfromDB);
router.post('/trailer',getTrailer);


module.exports = router;
