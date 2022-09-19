const db = require("../models/database");

const maintenanceItemController = {
  getItemsList: (req, res, next) => {
    const { user_id } = req.params;
    const text =
      "SELECT _id, item_name FROM maintenance_item WHERE user_id = $1";
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
            err: "Error with request to get list of maintenance items, please review input fields",
          },
        });
      });
  },

  addItem: (req, res, next) => {
    const { item_name, user_id } = req.body;
    console.log("body", req.body);
    const text =
      "INSERT INTO maintenance_item (item_name, user_id) VALUES ($1, $2) RETURNING _id";
    const values = [item_name, user_id];
    db.query(text, values)
      .then((response) => {
        res.locals.maintenanceItemId = response.rows[0]._id;
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: "Error with request to add maintenance item, please review input fields",
          },
        });
      });
  },

  deleteItem: (req, res, next) => {
    const { maintenance_item_id } = req.body;
    const text = "DELETE FROM maintenance_item where _id = $1";
    const values = [maintenance_item_id];
    db.query(text, values)
      .then((response) => {
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: "Error with request to delete item, please review input fields",
          },
        });
      });
  },
  getItemDetails: (req, res, next) => {
    const { maintenance_item_id } = req.params;
    const text =
      "SELECT * FROM maintenance_details WHERE maintenance_item_id = $1";
    const values = [maintenance_item_id];
    db.query(text, values)
      .then((response) => {
        console.log(response.rows);
        res.locals.maintenanceDetails = response.rows[0];
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: "Error with request to get maintenance item details, please review input fields",
          },
        });
      });
  },

  addItemDetails: (req, res, next) => {
    const {
      maintenance_item_id,
      model,
      warranty,
      resources,
      vendor_name,
      vendor_phone,
    } = req.body;
    const text =
      "INSERT INTO maintenance_details (maintenance_item_id, model, warranty, resources, vendor_name, vendor_phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING _id";
    const values = [
      maintenance_item_id,
      model,
      warranty,
      resources,
      vendor_name,
      vendor_phone,
    ];
    db.query(text, values)
      .then((response) => {
        console.log(response.rows);
        res.locals.maintenanceDetailsId = response.rows[0]._id;
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: "Error with request to add maintenance item, please review input fields",
          },
        });
      });
  },
  updateItemDetails: (req, res, next) => {
    const {
      model,
      warranty,
      resources,
      vendor_name,
      vendor_phone,
      maintenance_details_id
    } = req.body;
    const text =
      "UPDATE maintenance_details SET model = $1, warranty = $2, resources = $3, vendor_name = $4, vendor_phone = $5 WHERE _id = $6 RETURNING _id";
    const values = [
      model,
      warranty,
      resources,
      vendor_name,
      vendor_phone,
      maintenance_details_id
    ];
    db.query(text, values)
      .then((response) => {
        console.log(response.rows);
        res.locals.maintenanceDetailsId = response.rows[0]._id;
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: "Error with request to update maintenance item, please review input fields",
          },
        });
      });
  },
};

module.exports = maintenanceItemController;
