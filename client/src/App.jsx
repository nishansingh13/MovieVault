import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Movies from './components/Movies';
import MovieSpecific from './components/MovieSpecific';

function App() {
  return (
    <div>
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/movies" element={<Movies/>}/>
        <Route path = "/movie/:movieId" element={<MovieSpecific/>}/>
      </Routes>
    </div>
  );
}

export default App;
