import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import MovieSpecific from './components/MovieSpecific';
import About from './components/About';
import Login from './components/auth/Login';
import Rentals from './components/rentals/Rentals';

function App() {
  return (
    <div>
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/movies" element={<Movies/>}/>
        <Route path = "/movie/:id" element={<MovieSpecific/>}/>
        <Route path = "/about" element={<About/>}/>
        <Route path = "/rentals" element={<Rentals/>}/>
      </Routes>
    </div>
  );
}

export default App;
