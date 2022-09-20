-- THIS FILE CAN BE USED TO CREATE YOUR DATABASE
--   CREATE DATABASE
  CREATE TABLE user_account (
    _id SERIAL PRIMARY KEY ,
    user_name  VARCHAR(50) UNIQUE NOT NULL,
    password  VARCHAR(50) NOT NULL,
    email  VARCHAR(255) UNIQUE NOT NULL,
    phone  VARCHAR(50) UNIQUE NOT NULL,
  );
  CREATE TABLE maintenance_details (
    _id SERIAL PRIMARY KEY,
    item_name  VARCHAR(255),
    model  TEXT,
    warranty  TEXT,
    resources  TEXT,
    vendor_name  TEXT,
    vendor_phone  TEXT,
    last_service_date  DATE,
    next_service_date  DATE,
    frequency  INT,
    user_id INT 
  );
--   ADD FOREIGN KEYS
  ALTER TABLE "maintenance_details" ADD CONSTRAINT "maintenance__details_fk0" FOREIGN KEY ("user_id") REFERENCES "user_account"("_id");



