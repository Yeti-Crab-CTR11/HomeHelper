import React, { useState, useContext, useEffect, Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import APIFunctions from './util/APIfunctions';

/**
 * ********************
 * @module SelectItem
 * ********************
 **/

const SelectItem = () => {
  const navigate = useNavigate();
  //create the state
  const [userId, setUserId] = useContext(UserContext);
  const [items, setItems] = useState(null);

  //redirect to dashboard if user is not logged in
  if (!userId) return navigate('/');

  //listen to changes in user maintenance items
  useEffect(async () => {
    const request = 'getItems';
    const payload = userId;
    const currentItems = await APIFunctions.maintenance(request, payload);
    setItems(currentItems);
  });

  // **************************HELPER FUNCTIONS*************************
  //--handleCancelBtnClick in App.js

  const handleSelectItemBtnClick = (e) => {
    handleSetSelectedItem(e.target.value);
    return navigate('/additem');
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

export default SelectItem;
