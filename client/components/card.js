import React, { useState, useContext, Component } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';

/**
 * ********************
 * @module Card
 * ********************
 **/

const Card = () => {
  const [userId, setUserId] = useContext(UserContext);
  const [detailToggle, setDetailToggle] = useState(false);

  //redirect to login page if user is not logged in
  if (!userId) return <Navigate replace to='/login' />;

  // **************************HELPER FUNCTIONS*************************
  const handleCloseBtnClick = () => {
    return <Navigate replace to='/' />;
  };

  const handleLogoutBtnClick = () => {
    setUserId(null);
    return <Navigate replace to='/login' />;
  };
  // ************************END OF HELPER FUNCTIONS********************

  //render this if detailToggleOff is true
  const detailToggleOn = (
    <div>
      <button onClick={() => handleLogOutBtnClick()}>X</button>
      <article>
        <p>Last Service Date: {props.lastSvc}</p>
        <p>Next Service Date: {props.nextSvc}</p>
        <p>
          Precisionism postmodern art maximalism tachism hyperrealism sound art
          les nabis ottonian gründerzeit, fluxus cobra sound art expressionism
          social realism russian futurism art nouveau.
        </p>
        <button onClick={() => setDetailToggle(false)}>Less Details</button>
      </article>
    </div>
  );

  //render this if detailToggleOff is false
  const detailToggleOff = (
    <article>
      <p>Last Service Date: {props.lastSvc}</p>
      <p>Next Service Date: {props.nextSvc}</p>
      <button onClick={() => setDetailToggle(true)}>More Details</button>
    </article>
  );
  const imgUrl =
    'https://hearthnhome.getbynder.com/transform/96f4f3b6-bb4e-4004-a797-85aa7179b3bb/HNG-True_ForgedArchFront_2019Artisan_190613_Lecy_0160-1-tif?io=transform:fill,width:200';

  //render
  return (
    <section>
      {detailView ? <img src={imgUrl} /> : ''}
      <header>
        <h2>{props.item}</h2>
        <button onClick={() => handleCloseBtnClick()}>Close</button>
      </header>
      <div>{detailView ? detailViewOn : detailViewOff}</div>
    </section>
  );
};

export default Card;
