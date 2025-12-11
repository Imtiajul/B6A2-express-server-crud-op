"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsServices = void 0;
const db_1 = require("../../config/db");
const addBooking = async (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) => {
    const result = db_1.pool.query(`INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]);
    // console.log(typeof(result.rows[0].rent_end_date))
    return result;
};
const getAllCustomerBooking = async (customer_id) => {
    const result = db_1.pool.query(`
        SELECT
        mb.id, mb.customer_id, mb.vehicle_id, mb.rent_start_date, mb.rent_end_date, mb.total_price, mb.status,
        ( SELECT 
         JSON_AGG(
            JSON_BUILD_OBJECT(
                 'vehicle_name', rv.vehicle_name,
                'registration_number', rv.registration_number,
                'type', rv.type
                 )
                 )
         FROM vehicles rv
            WHERE
                mb.vehicle_id = rv.id
        ) AS vehicle
        FROM bookings AS mb
        WHERE mb.customer_id=$1`, [customer_id]);
    return result;
};
const updateBookingsStatus = async (bookings_id, status) => {
    const result = await db_1.pool.query(`UPDATE bookings SET status=COALESCE($1,status) WHERE id = $2 RETURNING *`, [status, bookings_id]);
    return result;
};
const getSingleBooking = async (id) => {
    const result = await db_1.pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
    return result;
};
const getAllBooking = async () => {
    const result = db_1.pool.query(`
        SELECT *,
        (SELECT
         JSON_AGG(
            JSON_BUILD_OBJECT(
                'name', ru.name,
                'email', ru.email
                 )
                )
         FROM users ru
            WHERE
                mb.customer_id = ru.id
        ) AS customer,
         (SELECT
         JSON_AGG(
            JSON_BUILD_OBJECT(
                 'vehicle_name', rv.vehicle_name,
                'registration_number', rv.registration_number
                 )
                )
         FROM vehicles rv
            WHERE
                mb.vehicle_id = rv.id
        ) AS vehicle
        FROM bookings AS mb`);
    return result;
};
exports.bookingsServices = {
    addBooking,
    getAllCustomerBooking,
    getAllBooking,
    updateBookingsStatus,
    getSingleBooking,
};
/// jon data
// const getAllCustomerBooking = async (customer_id:number) =>{
//     const result = pool.query(`
//         SELECT
//         mb.id, mb.customer_id, mb.vehicle_id, mb.rent_start_date, mb.rent_end_date, mb.total_price, mb.status,
//         rv.vehicle_name, rv.registration_number, rv.type
//         FROM bookings AS mb
//         INNER JOIN
//         vehicles AS rv ON mb.vehicle_id = rv.id
//         WHERE mb.customer_id=$1`,[customer_id]);
//     return result;
// }
/// inner join schema
/*const getAllBooking = async () => {
    const result = pool.query(` SELECT
        mb.id, mb.customer_id, mb.vehicle_id, mb.rent_start_date, mb.rent_end_date, mb.total_price, mb.status,

        ru.name, ru.email,

        rv.vehicle_name, rv.registration_number, rv.type

        FROM bookings AS mb
        INNER JOIN
        vehicles AS rv ON mb.vehicle_id = rv.id
        INNER JOIN
        user AS ru ON mb.customer_id = ru.id
        `);
    return result;

}*/
