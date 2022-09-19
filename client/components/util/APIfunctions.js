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

APIFunctions.verifyLogin = (username, password) => {
  const url = '/api/users/login';

  const data = {
    user_name: username,
    password: password,
  };

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((returnedData) => returnedData)
    .catch((err) => console.log('Error verifying Login', err));
};

// CREATE ACCOUNT

APIFunctions.createUser = (username, password, email, phoneNumber) => {
  const url = '/api/users/new_user';
  // from server post on Excalidraw
  const data = {
    user_name: username,
    password: password,
    email: email,
    phone: phoneNumber,
  };

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((returnedData) => returnedData)
    .catch((err) => console.log('Error creating new user data', err));
};

// DELETE ACCOUNT
APIFunctions.deleteUser = (payload) => {
  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log('APIFunctions.deleteUser error', err));
};

// GET ITEMS IN USER LIST
APIFunctions.getItems = (payload) => {
  const url = `/api/maintenance/${payload}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log('APIFunctions.getItems error', err));
};

//ADD NEW ITEM DETAILS
APIFunctions.addItemDetails = (payload) => {
  const url = '/api/itemdetails';
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log('APIFunctions.addItemDetails error', err));
};

export default APIFunctions;
