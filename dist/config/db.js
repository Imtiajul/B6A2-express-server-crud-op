"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const _1 = __importDefault(require("."));
exports.pool = new pg_1.Pool({
    connectionString: `${_1.default.CONNECTION_STRING}`
});
const createDB = async () => {
    await exports.pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password text NOT NULL,
    phone VARCHAR(15) NOT NULL,
    role VARCHAR(50) NOT NULL,
    CONSTRAINT email_lowercase CHECK (email = LOWER(email))
    )`);
    await exports.pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(100) NOT NULL,
      type VARCHAR(4),
      registration_number VARCHAR(40) UNIQUE NOT NULL,
      daily_rent_price INTEGER NOT NULL CHECK(daily_rent_price > 0),
      availability_status VARCHAR(10)
      )`);
    await exports.pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      customer_id INT REFERENCES users(id) ON DELETE CASCADE,
      vehicle_id INT REFERENCES vehicles(id),
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL,
      total_price INTEGER NOT NULL CHECK(total_price > 0),
      status VARCHAR(10) NOT NULL,
      CONSTRAINT check_rent_start_before_end CHECK (rent_end_date > rent_start_date)      )`);
};
exports.default = createDB;
