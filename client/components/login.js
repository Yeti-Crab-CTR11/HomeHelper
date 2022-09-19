import React, { useState, useContext, useEffect, Component } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import APIFunctions from './util/APIfunctions';

/**
 * ********************
 * @module Login
 * ********************
 **/

const Login = () => {
  const [userId, setUserId] = useContext(UserContext);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  // const database = ???

  const errors = {
    uname: 'invalid username',
    pass: 'invalid password',
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    let { uname, pass } = document.forms[0];

    // Find user login info

    //   const userData = database.find((user) => user.username === uname.value);

    const userData = APIFunctions.verifyLogin(uname.value, pass.value);

    // What syntax do we need to find this data?
    // I should make a post request to my server(api)

    // Compare user info
    if (userData) {
      // if (userData.password !== pass.value) {
      //   // Invalid password
      //   setErrorMessages({ name: 'pass', message: errors.pass });
      // } else {
      setIsSubmitted(true);
      setUserId(userData);
      // I want to set the state for the user by pulling data from the database
      return <Navigate replace to='/' />;
      //is this correct syntax?
      // }
    } else {
      // Username not found
      // doesn't this catch null as a falsy value?
      setErrorMessages({ name: 'uname', message: errors.uname });
    }
  };

  const handleClick = () => {
    return <Navigate replace to='/signup' />;
    //is this enough to exit the login page and enter the signup page?
  };

  // Generates code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className='error'>{errorMessages.message}</div>
    );

  // code for login form
  const renderForm = (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label>Username </label>
          <input type='text' name='uname' required />
          {renderErrorMessage('uname')}
        </div>
        <div className='input-container'>
          <label>Password </label>
          <input type='password' name='pass' required />
          {renderErrorMessage('pass')}
        </div>
        <div className='button-container'>
          <input type='submit' />
        </div>
        <div className='button-container'>
          <input type='signup' onClick={handleClick} />
        </div>
      </form>
    </div>
  );

  return (
    <div className='app'>
      <div className='login-form'>
        <div className='title'>Sign In</div>
        {renderForm}
      </div>
    </div>
  );
};

export default Login;
