import React from 'react';
import { Link } from 'react-router-dom';

const LandingNavbar = () => {
    return (
        <div className="flex sticky bg-blue-500 top-0 z-50">
            <nav className="flex justify-between mx-5 py-4 w-full">
                <h1 className="text-xl font-black text-white my-2 cursor-pointer">
                    FUTUREPATH
                </h1>
                <div className="flex bg-white items-center font-bold  text-xs text-gray-800 rounded-xl shadow-md">
                    <Link to="/SignUp" className="relative px-6 py-2 rounded-lg bg-blue-600 text-white shadow-inner shadow-gray-500  m-2">
                        Register
                    </Link>
                    <Link to="/SignIn" className="relative px-6 py-2 rounded-lg hover:text-black m-2 ">
                        Login
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default LandingNavbar;
