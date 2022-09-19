import React, { useState, Component } from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ********************
 * @module Card
 * ********************
 **/

const Card = () => {
  const [moreDetails, setMoreDetails] = useState(false);

  // **************************HELPER FUNCTIONS*************************
  // ************************END OF HELPER FUNCTIONS********************

  //render this if moreDetails is true
  const moreDetailsOn = (
    <div>
      <article>
        <p>
          Precisionism postmodern art maximalism tachism hyperrealism sound art
          les nabis ottonian gründerzeit, fluxus cobra sound art expressionism
          social realism russian futurism art nouveau.
        </p>
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
      {moreDetails ? <img src={imgUrl} /> : ''}
      <header>
        <h2>{props.item}</h2>
      </header>
      <div>
        <p>Last Service Date: {props.lastSvc}</p>
        <p>Next Service Date: {props.nextSvc}</p>
      </div>
      {moreDetails ? moreDetailsOn : moreDetailsOff}
    </section>
  );
};

export default Card;
