import React, { useState, useContext, Component } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';

const Dashboard = () => {
  //create the state
  const [user, setUser] = useContext(UserContext);

  //redirect to login page if no user logged in
  if (!user) return <Navigate replace to='/login' />;

  //fetch call to collect cards belonging to user

  //iterate thru cards and create cards to be displayed

  return (
    <div>
      <header>
        <img id='logo' src='' />
        <link>PancakeIcon</link>
      </header>
      <section id='main-display'>{cards}</section>
      <footer>
        <img id='add-icon' />
      </footer>
    </div>
  );
};

export default Dashboard;
