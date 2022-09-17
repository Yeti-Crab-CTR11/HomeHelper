// const db = require('../models/userModel');
const path = require('path');

const userController = {
  createNewUser: (req, res, next) => {
    const { user_name, password, email, phone_number } = req.body;
    const text =
      'INSERT INTO user_account (user_name, password, email, phone_number) VALUES ($1, $2, $3, $4) RETURNING id';
    const values = [user_name, password, email, phone_number];
    console.log(req.body);
//UNCOMMENT FOR DATABASE!
    // db.query(text, values)
    //   .then((response) => {
    //     console.log('newUser', response);
    //     res.locals.newUserId = response.rows[0].id;
    //     next();
    //   })
    //   .catch((err) => {
    //     next({
    //       status: 404,
    //       message: {
    //         err: 'Error with request to make new user, please review input fields',
    //       },
    //     });
    //   });

  },


  verifyUser: (req, res, next) => {
    const { user_name, password } = req.body;
    const text = 'SELECT password, id FROM user_account WHERE user_name = $1';
    const values = [user_name];
    db.query(text, values)
      .then((response) => {
        //no encrypting currently, just checks for a match of username and password, look at later if time allows
        response.rows.forEach((user) => {
          if (password === user.password) {
            res.locals.userId = user._id;
            console.log('success!');
          }
        });
        if (!res.locals.userId) {
          //Still need to do something if user/password are incorrect
          // res.locals.failedToLogin = true;
          console.log('Username or password are incorrect!');
          res.locals.id(null); //if password/username doesn't work, set ID to null
          // res.redirect(path.resolve(__dirname,'../../client/404.html'))
        }
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: 'Error with request to login, please review input fields',
          },
        });
      });
  },
};

module.exports = userController;
