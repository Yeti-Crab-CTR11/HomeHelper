import React, { useContext, useState, Component, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import APIFunctions from './util/APIfunctions';
/**
 * ********************
 * @module Settings
 * ********************
 **/

///THIS COMPONENT IS CURRENTLY NOT WORKING

const Settings = async () => {
  const navigate = useNavigate();
  //create the state
  const [userId, setUserId] = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [deleteUser, setDeleteUser] = useState(false);

  //redirect to dashboard if user is not logged in
  if (!userId) return navigate('/');

  // **************************HELPER FUNCTIONS*************************
  //cancel button
  //--handleCancelBtnClick in App.js

  //sign out button
  const handleSignOutBtnClick = () => {
    setUserId(null);
    return navigate('/');
  };

  //delete user api call
  const handleDeleteUser = async () => {
    const payload = { user_id: userId };
    const response = await APIFunctions.deleteUser(payload);
    if (response === 'User Deleted') return handleSignOutBtnClick();
    else return navigate('/settings');
  };

  //listener for user profile
  const getUserProfile = async () => {
    const apiUserProfile = await APIFunctions.getUserProfile(userId);
    setUserProfile(apiUserProfile);
  };
  // ************************END OF HELPER FUNCTIONS********************

  getUserProfile();

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
