const { Pool } = require('pg');

const PG_URI =
  'postgres://cdlhuzca:lh9PS_LHFOhhwYDLuSmJ6zNXgn2YbeR0@jelani.db.elephantsql.com/cdlhuzca';

const pool = new Pool({
  connectionString: PG_URI,
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

//To run from terminal:
//brew services start postgresql
//brew services stop postgresql
//psql postgres://cdlhuzca:lh9PS_LHFOhhwYDLuSmJ6zNXgn2YbeR0@jelani.db.elephantsql.com/cdlhuzca

//   CREATE TABLE [IF NOT EXISTS] table_name (
//     column1 datatype(length) column_contraint,
//     column2 datatype(length) column_contraint,
//     column3 datatype(length) column_contraint,
//     table_constraints
//  );
//EX:
// user_id serial PRIMARY KEY,
// username VARCHAR ( 50 ) UNIQUE NOT NULL,
// password VARCHAR ( 50 ) NOT NULL,
// email VARCHAR ( 255 ) UNIQUE NOT NULL,
//
