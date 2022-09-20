import React, { useState, useContext, Component, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import APIFunctions from './util/APIfunctions';

/**
 * ********************
 * @module Card
 * ********************
 **/

const Card = (props) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useContext(UserContext);
  const [moreDetails, setMoreDetails] = useState(false);
  const [itemDetails, setItemDetails] = useState(null);

  //listener to get item details
  const getItem = async () => {
    const request = 'getItemDetails';
    const payload = props.maintenance_item_id;
    const response = await APIFunctions.maintenance(request, payload);
    setItemDetails(response);
  };

  // **************************HELPER FUNCTIONS*************************
  const deleteItemBtnClick = async () => {
    let request = 'deleteItem';
    let payload = {
      maintenance_item_id: props.maintenance_item_id,
    };
    await APIFunctions.maintenance(request, payload);
    request = 'getItems';
    payload = userId;
    await APIFunctions.maintenance(request, payload);
    return navigate('/');
  };
  // ************************END OF HELPER FUNCTIONS********************

  useEffect(() => {
    getItem();
  }, []);

  let displayItemDetails;
  if (itemDetails) {
    const { model, warranty, resources, vendor_name, vendor_phone } =
      itemDetails;
    displayItemDetails = (
      <section>
        <p>Model: {model}</p>
        <p>Warranty: {warranty}</p>
        <p>Resources: {resources}</p>
        <p>Vendor Name: {vendor_name}</p>
        <p>Vendor Phone: {vendor_phone}</p>
      </section>
    );
  }

  //render this if moreDetails is true
  const moreDetailsOn = (
    <div>
      <article>
        {!displayItemDetails ? '' : displayItemDetails}
        <button onClick={() => setMoreDetails(false)}>Less Details</button>
      </article>
    </div>
  );

  //render this if moreDetails is false
  const moreDetailsOff = (
    <article>
      <button onClick={() => setMoreDetails(true)}>More Details</button>
    </article>
  );
  const imgUrl =
    'https://hearthnhome.getbynder.com/transform/96f4f3b6-bb4e-4004-a797-85aa7179b3bb/HNG-True_ForgedArchFront_2019Artisan_190613_Lecy_0160-1-tif?io=transform:fill,width:200';

  //render
  return (
    <section>
      {!moreDetails ? <img src={imgUrl} /> : ''}
      <header>
        <h2>{props.item_name}</h2>
      </header>
      <div>
        <p>Last Service Date: {props.last_service_date}</p>
        <p>Next Service Date: {props.next_service_date}</p>
      </div>
      {moreDetails ? moreDetailsOn : moreDetailsOff}
      <button onClick={() => deleteItemBtnClick()}>Delete Item</button>
    </section>
  );
};

export default Card;
