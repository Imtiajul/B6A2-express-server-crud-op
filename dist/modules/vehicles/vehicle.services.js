"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleServices = void 0;
const db_1 = require("../../config/db");
const addVehicle = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result = await db_1.pool.query(`INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    // console.log(typeof(result.rows[0].daily_rent_price));
    return result;
};
const getAllVehicle = async () => {
    const result = await db_1.pool.query(`SELECT * FROM vehicles`);
    return result;
};
const getSingleVehicle = async (id) => {
    const result = await db_1.pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
    return result;
};
const updateSingleVehicle = async (payload, vehicleId) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result = await db_1.pool.query(`UPDATE vehicles SET vehicle_name=COALESCE($1, vehicle_name), type=COALESCE($2,type), registration_number=COALESCE($3,registration_number), daily_rent_price=COALESCE($4,daily_rent_price), availability_status=COALESCE($5,availability_status) WHERE id = $6 RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId]);
    return result;
};
const deleteSingleVehicle = async (id) => {
    const result = await db_1.pool.query(`DELETE FROM vehicles WHERE id = $1 RETURNING *`, [id]);
    return result;
};
exports.vehicleServices = {
    addVehicle,
    getAllVehicle,
    getSingleVehicle,
    updateSingleVehicle,
    deleteSingleVehicle
};
