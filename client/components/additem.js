import React, { useState, useContext, useEffect, Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext, ItemContext } from '../App';
import APIFunctions from './util/APIfunctions';

/**
 * ********************
 * @module AddItem
 * ********************
 **/

const AddItem = () => {
  const navigate = useNavigate();
  //create the state
  const [userId, setUserId] = useContext(UserContext);
  const [selectedItem, setSelectedItem] = useContext(ItemContext);
  const [lastSvc, setLastSvc] = useState(null);
  const [freq, setFreq] = useState(3);

  // **************************HELPER FUNCTIONS*************************

  // submit button
  const handleSubmitBtnClick = async () => {
    const request = 'addItem';
    const payload = {
      user_id: userId,
      item_name: selectedItem,
      last_service_date: lastSvc,
      frequency: freq,
      model: null,
      warranty: null,
      resources: null,
      vendor_name: null,
      vendor_phone: null,
    };
    await APIFunctions.maintenance(request, payload);
    return navigate('/');
  };
  // ************************END OF HELPER FUNCTIONS********************

  //render
  return (
    <div>
      <button onClick={() => handleCancelBtnClick()}>Cancel</button>
      <header>
        <h1>{selectedItem}</h1>
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
      </section>
    </div>
  );
};

export default AddItem;
