import { Navigate } from 'react-router-dom';

/**
 * ********************
 * @module APIFunctions
 * ********************
 **/

const APIFunctions = {};

// VERIFY LOGIN

APIFunctions.verifyLogin = (username, password) => {
  const url = '/api/users/login';

  const data = {
    user_name: username,
    password: password
  }
  
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((returnedData) => returnedData)
  .catch((err) => console.log("Error verifying Login", err))

}

// CREATE ACCOUNT

APIFunctions.createUser = (username, password, email, phoneNumber) => {
  const url ='/api/users/new_user';
  // from server post on Excalidraw
  const data = {
    user_name: username,
    password: password,
    email: email,
    phone: phoneNumber
    }

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((returnedData) => returnedData)
    .catch((err) => console.log("Error creating new user data", err))

}

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
APIFunctions.addItems = (e) => {
  const url = '/api/';
  const data = { user: e.target.value.user, item: e.target.value.item };
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => <Navigate replace to='/items' />)
    .catch((err) => console.log(err));
};

export default APIFunctions;
