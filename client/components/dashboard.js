import React, { useState, useContext, useEffect, Component } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import APIFunctions from './util/APIfunctions';
import Card from './card';

/**
 * ********************
 * @module Dashboard
 * ********************
 **/

const Dashboard = () => {
  //create the state
  const [userId, setUserId] = useContext(UserContext);
  const [items, setItems] = useState(null);

  //redirect to login page if user is not logged in
  if (!userId) return <Navigate replace to='/login' />;
  if (!items) return <Navigate replace to='/additems' />;

  //listen to changes in state
  useEffect(() => {
    const currentItems = APIFunctions.getItems(userId);
    setItems(currentItems);
  });

  // **************************HELPER FUNCTIONS*************************
  const handleLogoutBtnClick = () => {
    setUserId(null);
    return <Navigate replace to='/login' />;
  };

  const handleAddItemsBtnClick = (user) => {
    return <Navigate replace to='/additems' />;
  };
  // ************************END OF HELPER FUNCTIONS********************

  //iterate thru cards and create cards to be displayed
  const cards = items.map((item, idx) => {
    <Card
      key={idx}
      item={item.name}
      lastSvc={item.lastSvc}
      nextSvc={item.nextSvc}
    />;
  });

  //render page
  return (
    <div>
      <header>
        <h1>homeBuddy</h1>
        <button id='logout' onClick={() => handleLogoutBtnClick()}></button>
      </header>
      <section id='mainDisplay'>{cards}</section>
      <footer>
        <button
          id='addItems'
          onClick={() => handleAddItemsBtnClick(userId)}
        ></button>
      </footer>
    </div>
  );
};

export default Dashboard;
