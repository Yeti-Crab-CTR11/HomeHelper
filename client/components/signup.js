import React, { useState, useContext, useEffect, Component } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../App';
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
      if (pass === undefined || typeof pass !== 'string') setErrorMessages({ name: "pass", message: errors.pass });
      if (email === undefined || typeof email !== 'string') setErrorMessages({ name: "email", message: errors.email });
      if (phone === undefined || typeof phone !== 'number') setErrorMessages({ name: "phone", message: errors.phone });

        // ^^^ I should check to see if all of the fields 
        // are submitted correctly before creating the userData variable

      const userData = APIFunctions.createUser(uname, pass, email, phone);

        // I need to create the createUser function
  
      if (userData) {
     
      } 
      else {
      
      }
    };



    const handleClick = (event) => {
        return <Navigate replace to='/signup' />
        //is this enough to exit the login page and enter the signup page?
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
          <div className="button-container">
            <input type="submit" />
          </div>
          <div className="button-container">
          <input type="signup" onClick={handleClick}/>
          </div>
        </form>
      </div>

    );
  
    return (
      <div className="app">
        <div className="login-form">
          <div className="title">Sign In</div>
          {renderForm}
        </div>
      </div>
    );




}


export default SignUp;