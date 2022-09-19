import React, { useState, useContext, useEffect, Component } from 'react';
import { Navigate } from 'react-router-dom';
import {UserContext} from '../App';
import APIFunctions from './util/APIfunctions';


/**
 * ********************
 * @module SignUp
 * ********************
 **/


const SignUp = () => {

  const [user, setUser] = useContext(UserContext);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);


  const errors = {
    uname: "Please enter a valid username.",
    pass: "Please enter a valid password.",
    email: "Please enter a valid email address.",
    phone: "Please enter a valid ten-digit phone number."
  };

  const handleSubmit = (event) => {

    //Prevent page reload
    event.preventDefault();

    let { uname, pass, email, phone } = document.forms[0];

    console.log(uname, pass, email, phone);


    if (uname === undefined || typeof uname !== 'string') setErrorMessages({ name: "uname", message: errors.uname });
    else if (pass === undefined || typeof pass !== 'string') setErrorMessages({ name: "pass", message: errors.pass });
    else if (email === undefined || typeof email !== 'string') setErrorMessages({ name: "email", message: errors.email });
    else if (phone === undefined || typeof phone !== 'number') setErrorMessages({ name: "phone", message: errors.phone });
    
    else {
      const userData = APIFunctions.createUser(uname, pass, email, phone);

      if (userData) {
        setIsSubmitted(true);
        setUser(uname);
        return <Navigate replace to='/dashboard' />;
      }
      else console.error("Did not return correct user data from API during CreateUser function in signup")
    }  
  };



  const handleClick = () => {
      return <Navigate replace to='/login' />
  }



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
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label>Phone Number </label>
          <input type="text" name="phone" required />
          {renderErrorMessage("phone")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        <div className="button-container">
          <div className="login-redirect">Already have an account?</div>
          <input type="button" value="Click Here to Log In." onClick={handleClick}/>
        </div>
      </form>
    </div>

  );

  // onClick={() => handleClick()

  return (
    <div className="app">
      <div className="signin-form">
        <div className="title">Sign Up</div>
        {renderForm}
      </div>
    </div>
  );

};


export default SignUp;