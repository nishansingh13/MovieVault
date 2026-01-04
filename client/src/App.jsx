import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/admin/Movies';
import MovieSpecific from './components/MovieSpecific';
import About from './components/About';
import Login from './components/auth/Login';
import Rentals from './components/rentals/Rentals';
import { Toaster } from 'sonner'
import Admin from './components/admin/Admin';
import RemoveMovies from './components/admin/RemoveMovies';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/admin/add-movie" element={<Movies/>}/>
        <Route path = "/movie/:id" element={<MovieSpecific/>}/>
        <Route path = "/about" element={<About/>}/>
        <Route path = "/rentals" element={<Rentals/>}/>
        <Route path ="/admin" element={<Admin/>}/>
        <Route path = "/admin/remove-movie" element={<RemoveMovies/>}/>


      </Routes>
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default App;
