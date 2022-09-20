import React, { useState, useContext, useEffect, Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  //create the state
  const [userId, setUserId] = useContext(UserContext);
  const [items, setItems] = useState(null);

  //redirect to login page if user is not logged in
  if (!userId) return <Navigate replace to='/login' />;

  // **************************HELPER FUNCTIONS*************************
  const handleSettingsBtnClick = () => {
    return navigate('/settings');
  };

  const handleSelectItemBtnClick = (userId) => {
    return navigate('/selectitem');
  };

  const getCurrentItems = async () => {
    const request = 'getItems';
    const payload = userId;
    const currentItems = await APIFunctions.maintenance(request, payload);
    console.log(currentItems);
    setItems(currentItems);
  };
  // ************************END OF HELPER FUNCTIONS********************
  useEffect(() => {
    getCurrentItems();
  }, []);

  // display on line 67
  const displayItems =
    !items || !items.length ? (
      <div>
        <p>
          Please click on the "+" icon at the bottom left section to add
          maintenance items.
        </p>
      </div>
    ) : (
      items.map((item, idx) => {
        return (
          <Card
            key={idx}
            maintenance_item_id={item._id}
            item_name={item.item_name}
            last_service_date={'DATE VALUE'}
            next_service_date={'DATE VALUE'}
            frequency={'NUMBER VALUE'}
          />
        );
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
          id='selectItem'
          onClick={() => handleSelectItemBtnClick(userId)}
        >
          Add Item
        </button>
      </footer>
    </div>
  );
};

export default Dashboard;
