require('dotenv').config();
//MAKE SURE TO ADD CREDENTIALS TO YOUR TWILIO ACCOUNT IN THE .env FILE IN THE ROOT DIRECTORY, SEE BOTTOM OF THIS DOCUMENT FOR ADDITIONAL NOTES
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const reminderController = {
  sendReminder: (req, res, next) => {
    const { message, phone_number } = req.body;
    console.log('message', typeof phone_number);

    client.messages
      .create({
        body: message, // Body of text message
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
 @IMPORTANT THIS API CAN BE USED TO ADD VERIFIED NUMBERS TO YOUR TWILIO ACCOUNT, IF YOU ARE USING A TWILIO TRIAL PHONE NUMBERS MUST BE VERIFIED BEFORE MESSAGES CAN BE SENT! THIS CAN DONE FROM YOUR TWILIO ACCOUNT OR FROM SETTING UP THE USING THE API BELOW (THIS HAS NOT BEEN SET UP YET)

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
