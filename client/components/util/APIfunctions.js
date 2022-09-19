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
  let method, url;
  //determine method and url
  switch (request) {
    //get items request
    case 'getItems':
      (method = 'GET'), (url = `/api/maintenance/${payload}`);
      break;
    //add item request
    case 'addItem':
      (method = 'POST'), (url = '/api/maintenance/add_item');
      break;
    //delete item request
    case 'deleteItem':
      (method = 'DELETE'), (url = '/api/maintenance/delete_item');
      break;
    //get item detail request
    case 'getitemDetails':
      (method = 'GET'), (url = `/api/maintenance/item_details/${payload}`);
      break;
    //add item detail request
    case 'addItemDetails':
      (method = 'POST'), (url = `/api/maintenance/add_item_details/`);
      break;
    //update item detail request
    case 'updateItemDetails':
      (method = 'PUT'), (url = `/api/maintenance/update_item_details/`);
  }
  console.log(method, url);
  //fetch call
  response = await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log('APIFunctions.maintenance error', err));

  //return response
  return response;
};

export default APIFunctions;
