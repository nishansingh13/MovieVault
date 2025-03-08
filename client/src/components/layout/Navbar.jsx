import React from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from "lucide-react";

function Navbar() {
    return (
        <nav className='absolute top-0 w-full z-50 bg-gradient-to-b from-black/70 to-transparent p-4'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className='text-white text-2xl font-bold'>
                    <Link to='/'>MovieVault</Link>
                </div>
                <ul className='flex items-center space-x-4'>
                    <li>
                        <SearchIcon className="text-white hover:text-gray-300 w-5 h-5 cursor-pointer transition-colors" />
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
