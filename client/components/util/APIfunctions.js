import React from 'react';

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
    password: password,
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
    .catch((err) => console.log('Error verifying Login', err));

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
    phone: phoneNumber,
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

// DELETE ACCOUNT
APIFunctions.deleteUser = (payload) => {
  const url = '/api/users/delete_user';
  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log('APIFunctions.deleteUser error', err));
};

//MAINTENANCE API CALLS
APIFunctions.maintenance = async (request, payload) => {
  let method, url, options;
  //determine method, url and options
  if (request === 'getItems') {
    options = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
    };
  } else {
    options = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };
  }

  switch (request) {
    //get items request
    case 'getItems':
      (options.method = 'GET'), (url = `/api/maintenance/${payload}`);
      break;
    //add item request
    case 'addItem':
      (options.method = 'POST'), (url = '/api/maintenance/add_item');
      break;
    //delete item request
    case 'deleteItem':
      (options.method = 'DELETE'), (url = '/api/maintenance/delete_item');
      break;
    //get item detail request
    case 'getitemDetails':
      (options.method = 'GET'),
        (url = `/api/maintenance/item_details/${payload}`);
      break;
    //add item detail request
    case 'addItemDetails':
      (options.method = 'POST'), (url = `/api/maintenance/add_item_details/`);
      break;
    //update item detail request
    case 'updateItemDetails':
      (options.method = 'PUT'), (url = `/api/maintenance/update_item_details/`);
  }
  console.log('METHOD AND URL =====>', options.method, url);

  //fetch call
  const response = await fetch(url, options)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log('APIFunctions.maintenance error', err));
  // console.log('THIS IS SECOND');
  //return response
  return response;
};

export default APIFunctions;
