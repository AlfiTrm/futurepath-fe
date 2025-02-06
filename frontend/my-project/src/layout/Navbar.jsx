import React, { useState } from 'react';
import { MdOutlineLightMode } from "react-icons/md";
import { Link } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import Menu from './Menu.jsx';
import Logo from '../images/FUTUREPATH.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 bg-white p-3 border border-blue-200 z-50">
      <nav className="flex justify-between items-center p-2 px-10">
        <img src={Logo} className='w-[40px]' alt="" />
        <div className='flex items-center space-x-10'>
          <ul className="flex font-bold text-lg space-x-5 text-md  overflow-hidden">
            <li className='xs'>
              <Link to="/Home" className="relative px-6 py-2 hover:text-blue-500">
                Home
              </Link>
            </li>
            <li className=''>
              <Link to="/News" className="relative px-6 py-2 hover:text-blue-500">
                News
              </Link>
            </li>
            <li className=''>
              <Link to="/FAQ" className="relative px-6 py-2 hover:text-blue-500">
                FAQ
              </Link>
            </li>
          </ul>
          <div className="flex items-center">
            <CiMenuBurger
              onClick={handleToggleMenu}
              size={30}
              className='text-blue-600 cursor-pointer hover:bg-slate-100 p-1 xl:hidden md:hidden rounded-r-xl' />
          </div>
        </div>
      </nav>
      {isOpen && <Menu />}
    </div>
  );
};

export default Navbar;
