import React, { useState, useContext, useEffect, Component } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import Card from './card';
import APIFunctions from './util/APIfunctions';

/**
 * ********************
 * @module Items
 * ********************
 **/

const defaultList = ['FirePlace', 'Gutters', 'HVAC', 'Pool'];

const AddItems = () => {
  //create the state
  const [userId, setUserId] = useContext(UserContext);
  const [items, setItems] = useState(null);

  //TEST//TEST//TEST//TEST//TEST//TEST//TEST//TEST
  //
  //TEST//TEST//TEST//TEST//TEST//TEST//TEST//TEST

  //redirect to login page if user is not logged in
  if (!userId) return <Navigate replace to='/login' />;

  //check items for missing maintenance items to add
  //listen to changes in state
  useEffect(() => {
    const currentItems = APIFunctions.getItems(userId);
    setItems(currentItems);
  });

  // **************************HELPER FUNCTIONS*************************
  const handleSelectItemBtnClick = (e) => {
    handleSetSelectedItem(e.target.value);
    return <Navigate replace to='/itemdetails' />;
  };
  // ************************END OF HELPER FUNCTIONS********************

  //get missing items
  const missingItems = defaultList.filter(
    (item) => !items.includes(item.name)
  );

  //build items list
  const itemsList = missingItems.map((item, idx) => (
    <button key={idx} value={item} onClick={(e) => handleSelectItemBtnClick(e)}>
      {item}
    </button>
  ));

  //render
  render(
    <div>
      <header>
        <h1>Select item</h1>
      </header>
      <section>{itemsList}</section>
    </div>
  );
};

export default AddItems;
