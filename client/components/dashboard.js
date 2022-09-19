import React, { useState, useContext, useEffect, Component } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import APIFunctions from './util/APIfunctions';
import Settings from './settings';
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

  //listen to changes in state
  useEffect(() => {
    const currentItems = APIFunctions.getItems(userId);
    setItems(currentItems);
  });

  // **************************HELPER FUNCTIONS*************************
  const handleSettingsBtnClick = () => {
    return <Navigate replace to='/settings' />;
  };

  const handleAddItemsBtnClick = (userId) => {
    return <Navigate replace to='/additems' />;
  };
  // ************************END OF HELPER FUNCTIONS********************

  const displayItems = !items ? (
    <div>
      <p>
        Please click on the "+" icon at the bottom left section to add
        maintenance items.
      </p>
    </div>
  ) : (
    items.map((item, idx) => {
      <Card
        key={item._id}
        item={item.item_name}
        lastSvc={'DATE VALUE'}
        nextSvc={'DATE VALUE'}
      />;
    })
  );

  //render page
  return (
    <div>
      <header>
        <h1>yetiCrab</h1>
        <button onClick={() => handleSettingsBtnClick()}>Settings</button>
      </header>
      <section id='mainDisplay'>{displayItems}</section>
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
