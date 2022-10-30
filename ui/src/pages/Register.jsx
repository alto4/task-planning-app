import React, { useState, useEffect } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className='register'>
      <h1>Register</h1>
      <p className='byline'>Create an account using the form below.</p>

      <form onSubmit={onSubmit} className='form register-form'>
        <div className='form-group'>
          <label for='name'>Name</label>
          <input type='text' className='form-control' id='name' name='name' value={name} onChange={onChange} />
        </div>
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
          <label for='passwordConfirm'>Confirm Password</label>
          <input
            type='password'
            className='form-control'
            id='passwordConfirm'
            name='passwordConfirm'
            value={passwordConfirm}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-primary'>
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
