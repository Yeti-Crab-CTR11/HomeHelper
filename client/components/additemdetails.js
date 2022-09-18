import React, { useState, useContext, useEffect, Component } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext, ItemContext } from '../App';
import APIFunctions from './util/APIfunctions';

/**
 * ********************
 * @module AddItemDetails
 * ********************
 **/

const AddItemDetails = () => {
  //create the state
  const [userId, setUserId] = useContext(UserContext);
  const [selectedItem, setSelectedItem] = useContext(ItemContext);
  const [lastSvc, setLastSvc] = useState(null);
  const [freq, setFreq] = useState(3);

  // **************************HELPER FUNCTIONS*************************

  // submit button
  const handleSubmitBtnClick = () => {
    const payload = {
      user_id: userId,
      item_name: selectedItem,
      last_service_date: lastSvc,
      frequency: freq,
    };
    APIFunctions.addItemDetails(payload);
    return <Navigate replace to='/dashboard' />;
  };

  // cancel button
  const handleCancelBtnClick = () => {
    return <Navigate replace to='/dashboard' />;
  };
  // ************************END OF HELPER FUNCTIONS********************

  //render
  return (
    <div>
      <header>
        <h1>{itemName}</h1>
      </header>
      <section>
        <input
          type='date'
          id='lastSvc'
          onChange={(e) => setLastSvc(e.target.value)}
        ></input>
        <p>Select frequency</p>
        <select
          id='frequency'
          onChange={(e) =>
            setFreq(e.target.options[e.target.selectedIndex].value)
          }
        >
          <option value='3'>3 months</option>
          <option value='6'>6 months</option>
          <option value='12'>12 months</option>
          <option value='24'>24 months</option>
        </select>
        <button onClick={() => handleSubmitBtnClick()}>Submit</button>
        <button onClick={() => handleCancelBtnClick()}>Submit</button>
      </section>
    </div>
  );
};

export default AddItemDetails;
