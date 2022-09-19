require('dotenv').config();
//set up twilio account id and token in environment variables to make more secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const reminderController = {
  sendReminder: (req, res, next) => {
    console.log('setting up reminder. Request body: ', req)
    const { message, phone_number } = req;
    console.log('message- ', message);
    console.log('phone- ', phone_number);
  

    client.messages
      .create({
        body: message,
        to: phone_number, // Text this number
        from: process.env.TWILIO_ACCT_PHONE_NUM, // From a valid Twilio number
      })
      .then((message) => {
        console.log(message.sid);
        next();
      })
      .catch((err) => {
        next({
          log: 'can\'t send reminder',
          status: 404,
          message: {
            err: 'Error with request to send reminder, please review input fields',
          },
        });
      });
  },
};


module.exports = reminderController;


/** 
 @REMINDER don't forget to add logic to add new caller id!
 // Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.validationRequests
  .create({friendlyName: 'My Home Phone Number', phoneNumber: '+14158675310'})
  .then(validation_request => console.log(validation_request.friendlyName));

 
*/
