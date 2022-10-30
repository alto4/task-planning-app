import React, { useState, useEffect } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

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
