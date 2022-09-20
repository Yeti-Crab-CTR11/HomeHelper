import React, { useState, useContext, Component, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext, ItemContext } from '../App';
import APIFunctions from './util/APIfunctions';

/**
 * ********************
 * @module SelectItem
 * ********************
 **/

const SelectItem = (props) => {
  const navigate = useNavigate();
  //create the state
  const [selectedItem, setSelectedItem] = useContext(ItemContext);
  const [userId, setUserId] = useContext(UserContext);
  const [items, setItems] = useState(null);

  //redirect to dashboard if user is not logged in
  if (!userId) return navigate('/');

  // **************************HELPER FUNCTIONS*************************
  const handleCancelBtnClick = () => {
    navigate('/');
  };

  const handleSelectItemBtnClick = (e) => {
    props.handleSetSelectedItem(e);
    return navigate('/additem');
  };

  const getCurrentItems = async () => {
    const request = 'getItems';
    const payload = userId;
    console.log('THIS IS FIRST');
    const currentItems = await APIFunctions.maintenance(request, payload);
    console.log('THIS IS THIRD');
    console.log(currentItems);
    setItems(currentItems);
  };
  // ************************END OF HELPER FUNCTIONS********************

  //get missing items   
  ///THIS SECTION OF THE CODE IS CURRENTLY NOT WORKING. 
  ///WE NEED TO BUILD A LIST OF ITEMS THAT ARE NOT YET ON THE LIST.
  const defaultList = ['FirePlace', 'Gutters', 'HVAC', 'Pool'];
  let missingItems = null;
  if (items)
    missingItems = defaultList.filter((item) => !items.includes(item.name));
  else missingItems = defaultList;

  //build items list
  const itemsList = missingItems.map((item, idx) => (
    <button key={idx} value={item} onClick={(e) => handleSelectItemBtnClick(e)}>
      {item}
    </button>
  ));

  //render page
  return (
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
