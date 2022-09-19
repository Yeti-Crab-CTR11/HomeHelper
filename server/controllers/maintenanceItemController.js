const db = require('../models/database');

const maintenanceItemController = {
  getItemsList: (req, res, next) => {
    const { user_id } = req.params;
    const text = 'SELECT * FROM maintenance_details WHERE user_id = $1';
    const values = [user_id];
    db.query(text, values)
      .then((response) => {
        res.locals.maintenanceItemsList = response.rows;
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: 'Error with request to get list of maintenance items, please review input fields',
          },
        });
      });
  },

  addItem: (req, res, next) => {
    const {
      item_name,
      model,
      warranty,
      resources,
      vendor_name,
      vendor_phone,
      user_id,
      last_service_date,
      next_service_date,
      frequency,
    } = req.body;
    console.log('body', req.body);
    const text =
      'INSERT INTO maintenance_details (item_name, model, warranty, resources, vendor_name, vendor_phone, last_service_date, next_service_date, frequency, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING _id';
    const values = [
      item_name,
      model,
      warranty,
      resources,
      vendor_name,
      vendor_phone,
      last_service_date,
      next_service_date,
      frequency,
      user_id,
    ];
    db.query(text, values)
      .then((response) => {
        res.locals.maintenanceItemId = response.rows[0]._id;
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: 'Error with request to add maintenance item, please review input fields',
          },
        });
      });
  },

  deleteItem: (req, res, next) => {
    const { maintenance_details_id } = req.body;
    console.log(req.body)
    const text = 'DELETE FROM maintenance_details where _id = $1';
    const values = [maintenance_details_id];
    db.query(text, values)
      .then((response) => {
        res.locals.maintenanceDetailsId = response;
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: 'Error with request to delete item, please review input fields',
          },
        });
      });
  },
  updateItemDetails: (req, res, next) => {
    const {
      maintenance_details_id,
      item_name,
      model,
      warranty,
      resources,
      vendor_name,
      vendor_phone,
      last_service_date,
      next_service_date,
      frequency,
    } = req.body;
    console.log('bod', req.body);
    const text =
      'UPDATE maintenance_details SET item_name = $1, model = $2, warranty = $3, resources = $4, vendor_name = $5, vendor_phone = $6, last_service_date = $7, next_service_date = $8, frequency = $9 WHERE _id = $10 RETURNING _id';
    const values = [
      item_name,
      model,
      warranty,
      resources,
      vendor_name,
      vendor_phone,
      last_service_date,
      next_service_date,
      frequency,
      maintenance_details_id,
    ];
    db.query(text, values)
      .then((response) => {
        res.locals.maintenanceDetailsId = response.rows[0]._id;
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: 'Error with request to update maintenance item, please review input fields',
          },
        });
      });
  },
};

module.exports = maintenanceItemController;
