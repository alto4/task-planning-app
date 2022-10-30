import React, { useState, useEffect } from 'react';
import { userSelector, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/layouts/Spinner';
const { login, reset } = require('../features/auth/authSlice');
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isLoading, isSuccess, navigate, dispatch]);

  const onChange = (e) => {
    console.log('ui => ', formData);
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className='register'>
      <h1>Sign In</h1>
      <p className='byline'>Log in to your productivity dashboard below.</p>

      <form onSubmit={onSubmit} className='form register-form'>
        <div className='form-group'>
          <label for='email'>Email</label>
          <input type='email' className='form-control' id='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label for='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-primary'>
            Sign In
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
