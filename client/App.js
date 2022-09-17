import React, { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Signup from './components/signup';
import AddItems from './components/additems';
import AddItemDetails from './components/additemdetails';

/**
 * ********************
 * @module App
 * ********************
 **/

const UserContext = createContext([{}, () => {}]);
const ItemContext = createContext([{}, () => {}]);

const App = () => {
  //set user state
  const [user, setUser] = useState(null);
  const [itemName, setItemName] = useState(null);

  // **************************HELPER FUNCTIONS*************************
  const handleSetItemName = (newItem) => {
    setItemName(newItem);
  };
  // ************************END OF HELPER FUNCTIONS********************

  return (
    <div id='root'>
      <UserContext.Provider value={[user, setUser]}>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/additems'
            element={<AddItems />}
            handleSetItemName={handleSetItemName}
          />
          <Route
            path='/additemdetails'
            element={<AddItemDetails />}
            itemName='{itemName}'
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default { App, UserContext, ItemContext };
