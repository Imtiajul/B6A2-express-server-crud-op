import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
connectionString: `${config.CONNECTION_STRING}`});

const createDB = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password text NOT NULL,
    phone VARCHAR(15) NOT NULL,
    role VARCHAR(50) NOT NULL,
    CONSTRAINT email_lowercase CHECK (email = LOWER(email))
    )`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(100) NOT NULL,
      type VARCHAR(4),
      registration_number VARCHAR(40) UNIQUE NOT NULL,
      daily_rent_price INTEGER NOT NULL CHECK(daily_rent_price > 0),
      availability_status VARCHAR(10)
      )`)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      customer_id INT REFERENCES users(id) ON DELETE CASCADE,
      vehicle_id INT REFERENCES vehicles(id),
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL,
      total_price INTEGER NOT NULL CHECK(total_price > 0),
      status VARCHAR(10) NOT NULL,
      CONSTRAINT check_rent_start_before_end CHECK (rent_end_date > rent_start_date)      )`)
}

export default createDB;