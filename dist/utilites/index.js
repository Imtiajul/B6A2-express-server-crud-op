"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilites = void 0;
const db_1 = require("../config/db");
const booking_services_1 = require("../modules/booking/booking.services");
const vehicle_services_1 = require("../modules/vehicles/vehicle.services");
function getDaysBetweenDates(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    // Calculate the difference in milliseconds
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    // Define milliseconds in a day
    const oneDay = 1000 * 60 * 60 * 24;
    // Convert milliseconds to days and round down
    const daysDiff = Math.floor(timeDiff / oneDay);
    return daysDiff;
}
const checkAutoReturnState = async () => {
    const result = await db_1.pool.query(`SELECT id, vehicle_id, rent_end_date FROM bookings`);
    console.log(result.rows);
    for (let i = 0; i < result.rows.length; i++) {
        if (new Date() > new Date(result.rows[i].rent_end_date)) {
            const updateBookState = await booking_services_1.bookingsServices.updateBookingsStatus(result.rows[i].id, "returned");
            const updateVehicleState = await vehicle_services_1.vehicleServices.updateSingleVehicle({ availability_status: "available" }, result.rows[i].vehicle_id);
        }
    }
    const result2 = await db_1.pool.query(`SELECT * FROM bookings`);
    console.log(result2.rows[0]);
};
exports.utilites = {
    getDaysBetweenDates,
    checkAutoReturnState,
};
