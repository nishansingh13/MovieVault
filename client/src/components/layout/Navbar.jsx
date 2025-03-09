import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon } from "lucide-react";
import { useConfig } from '../../context/ConfigContext';
import axios from 'axios';
function Navbar() {
    const [inputShow, setInputShow] = useState(false);
   const {setHide,setSearchResults,server} = useConfig();
   const navigate  = useNavigate();
    const searchMovies = async (query) => {
        try{
       if(query.length>0){
        const res = await axios.get(`${server}/api/searchfromDB?search=${query}`);
        setSearchResults(res.data); // Ensure this is setting the correct data
        setHide(true);
        // console.log(query)
       }
       else{
        setHide(false);
       }
    }
    catch(err){
        console.error("Error searching movies", err.response?.data || err.message);
    }
    }
    return (
        <nav className='absolute top-0 w-full z-50 bg-gradient-to-b from-black/70 to-transparent p-4'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className='text-white text-2xl font-bold'>
                    <Link to='/'>MovieVault</Link>
                </div>
                <ul className='flex items-center space-x-4'>
                    <li onClick={() =>  setInputShow(true)}>
                        <div className='flex'>
                            <SearchIcon className={` relative ${inputShow&& ' left-6 z-10 top-[0.2rem] '}  text-white hover:text-gray-300 w-5 h-5 cursor-pointer transition-colors`} />
                            <input type='text' onChange={(e)=>searchMovies(e.target.value)} className={`relative bg-black backdrop-blur-md text-white text-[80%] rounded transition-all duration-300 ease-in-out ${inputShow ? 'w-48  px-7 py-1' : 'w-0 p-0'}`} />

                        </div>
                    </li>
                    <li><Link className='text-white hover:text-gray-300 transition-colors' to='/'>Home</Link></li>
                    <li><Link className='text-white hover:text-gray-300 transition-colors' to='/movies'>Movies</Link></li>
                    <li><Link className='text-white hover:text-gray-300 transition-colors' to='/about'>About</Link></li>
                    <li><Link className='text-white hover:text-gray-300 transition-colors' to='/contact'>Contact</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
