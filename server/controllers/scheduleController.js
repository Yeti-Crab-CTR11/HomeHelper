const { json } = require('express');
const moment = require ('moment'); //This is used to get today's date. Much easier than JS's built-in Date object
const db = require('../models/database');
const reminderController = require('./reminderController');

//Get today's date using moment
const date = moment();
const currentDate = date.format('YYYY-MM-DD');
const clientReminder = {};

const scheduleController = {

  getRecords: ()=>{
    const clientArray = [];
    
    //This query can easily be optimized so it only pulls records with a date equal to today. 
    //Right now it pulls everything and we check the records for the correct date below.
    //The "toChar" is important as it formats the SQL Date object to the correct format that
    //matches the moment date format above
    const text =
    'SELECT m.*, to_Char(next_service_date, \'YYYY-MM-DD\') as service_date, u._id AS user_account_id, u.phone FROM maintenance_details m LEFT JOIN user_account u ON u._id = m.user_id';
    db.query(text)
      .then((response) => {
        clientArray.push(...response.rows);
      
        //Iterate over reach client record
        clientArray.forEach(client => {

          //Check if the service date is equal to today's date. Right now we're checking
          //next_service_date, so this should probably be updated so it calculates the next 
          //service date taking into account the frequency of service
          if(client.service_date == currentDate) {

            //Adds the appropriate props to the clientReminder - you can also add vendor information
            //this is not completely set up in the SQL table - right now the table just has a vendor name
            clientReminder.message = `Please schedule service for ${client.item_name}`;
            clientReminder.phone_number = client.phone;

            //The reminderController.sendReminder holds the Twilio portion that actually sends the text
            //The interval portion is in the server. setInterval is used - you'd need to update
            //the interval number since it's currently running every 600 ms. Also, if you come across
            //toad-scheduler, note that it's for TypeScript, not JS.
            reminderController.sendReminder(clientReminder);
          }
        });  
      })
      .catch(err => {'error occurred in getRecords. Err: ', err;});//end of dbQuery
  },  
};

module.exports = scheduleController;