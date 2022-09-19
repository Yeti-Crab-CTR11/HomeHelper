import React, { useState, useContext, useEffect, Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {UserContext} from '../App';
import APIFunctions from './util/APIfunctions';


/**
 * ********************
 * @module Login
 * ********************
 **/


const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useContext(UserContext);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  // const database = ???

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = async (event) => {

    //Prevent page reload
    event.preventDefault();
    const { uname, pass } = document.forms[0];

    // Find user login info


    // console.log('username and pw is', uname.value, pass.value);
    
    console.log("This runs first");
    const userData = await APIFunctions.verifyLogin(uname.value, pass.value);
    console.log("this runs third.");
    // What syntax do we need to find this data?
    // I should make a post request to my server(api)

    // console.log("Is the async working correctly? userData is ", userData);

    // Compare user info
    if (userData) {
      // if (userData.password !== pass.value) {
      //   // Invalid password
      //   setErrorMessages({ name: "pass", message: errors.pass });
      // } else {
      console.log(userData);
      setIsSubmitted(true);
      setUserId(userData);
      // I want to set the state for the user by pulling data from the database
      // return <Navigate replace to='index' />;
      return navigate('/');
      //is this correct syntax?
    }
    else {
      // Username not found
      // doesn't this catch null as a falsy value?
      setErrorMessages({ name: 'uname', message: errors.uname });
    }
  };



  const handleClick = () => {
    console.log('Navigating to Sign Up');
    return navigate('/signup');
    // return <Navigate to='/signup' />;
    //is this enough to exit the login page and enter the signup page?
  };



  // Generates code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // code for login form
  const renderForm = (

    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname"  required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        <div className="button-container">
          <input type="button" value="Sign Up Here" onClick={() => handleClick()}/>
        </div>
      </form>
    </div>

  );

  // onClick={() => handleClick()

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );


};

export default Login;