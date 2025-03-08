import React from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

function Home() {
  return (

    <div>
        <Navbar/>
      <h2>Welcome to Movie Vault</h2>
      <p>Discover your favorite movies here!</p>
      <Footer/>
    </div>
  );
}

export default Home;
