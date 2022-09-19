
import React from 'react';

import { Navigate } from 'react-router-dom';

/**
 * ********************
 * @module APIFunctions
 * ********************
 **/

//API FUNCTIONS OBJECT
const APIFunctions = {};

// VERIFY LOGIN

APIFunctions.verifyLogin = async (username, password) => {
  const url = '/api/users/login';

  const data = {
    user_name: username,
    password: password
  };
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((returnedData) => {
      // console.log('This runs second.');
      return returnedData;
    })
    .catch((err) => console.log("Error verifying Login", err));

  return response;

};

// CREATE ACCOUNT

APIFunctions.createUser = async (username, password, email, phoneNumber) => {
  const url = '/api/users/new_user';
  // from server post on Excalidraw
  const data = {
    user_name: username,
    password: password,
    email: email,
    phone: phoneNumber
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((returnedData) => returnedData)
    .catch((err) => console.log('Error creating new user data', err));

  return response;
};

// GET ITEMS IN USER LIST
APIFunctions.getItems = (user) => {
  const url = `/api/${user}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => data) //
    .catch((err) => console.log(err));

  // expected return object
  // [{  name: String,
  //     lastSvc: String,
  //     nextSvc: String  }]
};

//ADD NEW ITEM TO USER LIST
APIFunctions.addItem = (user, e) => {
  const url = '/api/item';
  const data = { user: user, item: e.target.value };
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => <Navigate replace to='/dashboard' />)
    .catch((err) => console.log(err));
};

//ADD NEW ITEM DETAILS
APIFunctions.addItemDetails = (user, newItemDetails) => {
  const url = '/api/itemdetails';
  const data = { user_name: user, item: newItemDetails };
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => <Navigate replace to='/dashboard' />)
    .catch((err) => console.log(err));
};

export default APIFunctions;
