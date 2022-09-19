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

const AddItems = (props) => {
  //create the state
  const [user, setUser] = useContext(UserContext);
  const [items, setItems] = useState(null);

  //TEST//TEST//TEST//TEST//TEST//TEST//TEST//TEST
  //
  //TEST//TEST//TEST//TEST//TEST//TEST//TEST//TEST

  //redirect to login page if user is not logged in
  if (!user) return <Navigate replace to='/login' />;

  //check items for missing maintenance items to add
  //listen to changes in state
  useEffect(() => {
    const currentItems = APIFunctions.getItems(user);
    setItems(currentItems);
  });

  // **************************HELPER FUNCTIONS*************************
  const handleChooseItemBtnClick = (e) => {
    props.handleSetItemName(e.target.value);
    return <Navigate replace to='/itemdetails' />;
  };
  // ************************END OF HELPER FUNCTIONS********************

  //get missing items
  const missingItems = defaultList.filter(
    (item) => !defaultList.includes(item.name)
  );

  //build items list
  const itemsList = missingItems.map((item, idx) => (
    <button key={idx} value={item} onClick={(e) => handleChooseItemBtnClick(e)}>
      {item}
    </button>
  ));

  //render
  return(
    <div>
      <header>
        <h1>Select item</h1>
      </header>
      <section>{itemsList}</section>
    </div>
  );
};

export default AddItems;
