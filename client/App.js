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
  const [userId, setUserId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // **************************HELPER FUNCTIONS*************************
  const handleSetSelectedItem = (newItem) => {
    setSelectedItem(newItem);
  };
  // ************************END OF HELPER FUNCTIONS********************

  return (
    <div id='root'>
      <UserContext.Provider value={[userId, setUserId]}>
        <ItemContext.Provider value={[selectedItem, setSelectedItem]}>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route
              path='/additems'
              element={<AddItems />}
              handleSetSelectedItem={handleSetSelectedItem}
            />
            <Route
              path='/additemdetails'
              element={<AddItemDetails />}
              itemName='{itemName}'
            />
          </Routes>
        </ItemContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export { App, UserContext, ItemContext };
