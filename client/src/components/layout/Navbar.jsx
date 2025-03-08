import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav className='bg-gray-800 p-4 fixed top-0 w-full z-10'>
                <div className='container mx-auto flex justify-between items-center'>
                    <div className='text-white text-2xl font-bold'>
                        <Link to='/'>MovieVault</Link>
                    </div>
                    <ul className='flex space-x-4'>
                        <li><Link className='text-white hover:text-gray-400' to='/'>Home</Link></li>
                        <li><Link className='text-white hover:text-gray-400' to='/movies'>Movies</Link></li>
                        <li><Link className='text-white hover:text-gray-400' to='/about'>About</Link></li>
                        <li><Link className='text-white hover:text-gray-400' to='/contact'>Contact</Link></li>
                    </ul>
                </div>
            </nav>
            {/* This div adds space below the fixed navbar */}
            <div className="h-16"></div>
        </>
    );
}

export default Navbar;
