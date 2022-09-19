const { json } = require('express');
const moment = require ('moment');
const db = require('../models/database');
const reminderController = require('./reminderController');

const date = moment();
const currentDate = date.format('YYYY-MM-DD');
const clientReminder = {};

const scheduleController = {

  getRecords: ()=>{
    const clientArray = [];

    const text =
    'SELECT m.*, to_Char(next_service_date, \'YYYY-MM-DD\') as service_date, u._id AS user_account_id, u.phone FROM maintenance_details m LEFT JOIN user_account u ON u._id = m.user_id';
    db.query(text)
      .then((response) => {
        clientArray.push(...response.rows);
      
        clientArray.forEach(client => {

          if(client.service_date == currentDate) {

            clientReminder.message = `Please schedule service for ${client.item_name}`;
            clientReminder.phone_number = client.phone;

            reminderController.sendReminder(clientReminder);
          }
        });  
      })
      .catch(err => {'error occurred in getRecords. Err: ', err;});//end of dbQuery
  },  
};

module.exports = scheduleController;