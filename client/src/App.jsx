import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Movies from './components/Movies';

function App() {
  return (
    <div>
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/movies" element={<Movies/>}/>
      </Routes>
    </div>
  );
}

export default App;
