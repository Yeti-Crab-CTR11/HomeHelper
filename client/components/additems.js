import React, { useState, useContext, useEffect, Component } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import APIFunctions from './util/APIfunctions';

/**
 * ********************
 * @module Items
 * ********************
 **/

const AddItems = () => {
  //create the state
  const [userId, setUserId] = useContext(UserContext);
  const [items, setItems] = useState(null);

  //redirect to dashboard if user is not logged in
  if (!userId) return <Navigate replace to='/' />;

  //listen to changes in user maintenance items
  useEffect(() => {
    const currentItems = APIFunctions.getItems(userId);
    setItems(currentItems);
  });

  // **************************HELPER FUNCTIONS*************************
  //--handleCancelBtnClick in App.js

  const handleSelectItemBtnClick = (e) => {
    handleSetSelectedItem(e.target.value);
    return <Navigate replace to='/itemdetails' />;
  };
  // ************************END OF HELPER FUNCTIONS********************

  //get missing items
  const defaultList = ['FirePlace', 'Gutters', 'HVAC', 'Pool'];
  const missingItems = defaultList.filter((item) => !items.includes(item.name));

  //build items list
  const itemsList = missingItems.map((item, idx) => (
    <button key={idx} value={item} onClick={(e) => handleSelectItemBtnClick(e)}>
      {item}
    </button>
  ));

  //render
  render(
    <div>
      <button onClick={() => handleCancelBtnClick()}>Cancel</button>
      <header>
        <h1>Select item</h1>
      </header>
      <section>{itemsList}</section>
    </div>
  );
};

export default AddItems;
