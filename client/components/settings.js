import React, { useContext, useState, Component } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import APIFunctions from './util/APIfunctions';
/**
 * ********************
 * @module Settings
 * ********************
 **/

const Settings = () => {
  //create the state
  const [userId, setUserId] = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [deleteUser, setDeleteUser] = useState(false);

  //redirect to dashboard if user is not logged in
  if (!userId) return <Navigate replace to='/' />;

  //pull user profile from database
  setUserProfile(APIFunctions.getUserProfile(userId));

  // **************************HELPER FUNCTIONS*************************
  //cancel button
  //--handleCancelBtnClick in App.js

  //sign out button
  const handleSignOutBtnClick = () => {
    setUserId(null);
    return <Navigate replace to='/' />;
  };

  //delete user api call
  const handleDeleteUser = async () => {
    const payload = { user_id: userId };
    const response = await APIFunctions.deleteUser(payload);
    if (response === 'User Deleted') return handleSignOutBtnClick();
    else return <Navigate replace to='/settings' />;
  };
  // ************************END OF HELPER FUNCTIONS********************

  //deconstructing userProfile
  const { name, address, phone, email, username } = userProfile;

  //delete -- are you sure?
  const areYouSure = (
    <p>
      Are you sure? <span onClick={() => handleDeleteUser()}>Yes</span> or{' '}
      <span onClick={() => setDeleteUser(false)}>No</span>
    </p>
  );

  //render page
  return (
    <div>
      <header>
        <h1>yetiCrab</h1>
        <button onClick={() => handleCancelBtnClick()}>Cancel</button>
      </header>
      <section id='profile'>
        <h2>Profile</h2>
        <p>Name: {name}</p>
        <p>Address: {address}</p>
        <p>Username: {username}</p>
        <p id='signOut' onClick={() => handleSignOutBtnClick()}>
          Sign out
        </p>
        <p id='deleteUser' onClick={() => setDeleteUser(!deleteUser)}>
          Delete account
        </p>
        {deleteUser ? areYouSure : ''}
      </section>
    </div>
  );
};

export default Settings;
