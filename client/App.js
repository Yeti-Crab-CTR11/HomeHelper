import React, { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Signup from './components/signup';
import Items from './components/items';
import ItemDetails from './components/itemdetails';

const UserContext = createContext([{}, () => {}]);

const App = () => {
  //set user state
  const [user, setUser] = useState(null);

  return (
    <RootDiv>
      <UserContext.Provider value={[user, setUser]}>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/items' element={<Items />} />
          <Route path='/itemdetails' element={<ItemDetails />} />
        </Routes>
      </UserContext.Provider>
    </RootDiv>
  );
};

export default { App, UserContext };
