import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='logo'>
        <Link to='/' className='nav-link'>
          Focus Dashboard
        </Link>
      </div>
      <ul className='nav-links'>
        <li>
          <Link to='/' className='nav-link'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/login' className='nav-link'>
            Login
          </Link>
        </li>
        <li>
          <Link to='/register' className='nav-link'>
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
