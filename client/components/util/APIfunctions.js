import { Navigate } from 'react-router-dom';

const APIFunctions = {};

// VERIFY LOGIN

// CREATE ACCOUNT

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
  const data = { user: user, item: e.target.value };
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
