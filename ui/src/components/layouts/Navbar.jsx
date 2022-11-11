import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <nav className='navbar'>
      <div className='logo'>
        <Link to='/' className='nav-link'>
          Focus Dashboard
        </Link>
      </div>
      <ul className='nav-links'>
        {user ? (
          <>
            <li>
              <button className='btn btn-primary' onClick={onLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
