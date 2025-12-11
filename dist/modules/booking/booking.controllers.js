"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsControllers = void 0;
const booking_services_1 = require("./booking.services");
const utilites_1 = require("../../utilites");
const vehicle_services_1 = require("../vehicles/vehicle.services");
const db_1 = require("../../config/db");
const addBooking = async (req, res) => {
    try {
        const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;
        // console.log('dd', vehicle_id);
        const getDay = utilites_1.utilites.getDaysBetweenDates(rent_start_date, rent_end_date);
        // console.log(getDay)
        //vehicle detials
        const vehicleDetails = await vehicle_services_1.vehicleServices.getSingleVehicle(vehicle_id);
        // console.log("vehecle: ", vehicleDetails.rows[0]);
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = vehicleDetails.rows[0];
        if (availability_status === "booked") {
            throw new Error("Vehicle is booked already");
        }
        const total_price = daily_rent_price * getDay;
        const status = "active";
        console.log(customer_id, vehicle_id, req.body);
        //vehicle status update
        const updateVehicleStatus = await vehicle_services_1.vehicleServices.updateSingleVehicle({ availability_status: "booked" }, vehicle_id);
        const result = await booking_services_1.bookingsServices.addBooking(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status);
        const data = result.rows[0];
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            // data: result.rows[0],
            res: {
                data,
                vehicle: {
                    vehicle_name: vehicle_name,
                    daily_rent_price: daily_rent_price,
                }
            },
        });
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({
            success: false,
            message: "Message could not be sent",
            details: error.message,
        });
    }
};
const getAllBooking = async (req, res) => {
    try {
        // console.log(req.user!.email);
        const role = req.user.role;
        // check auto book and available status return status
        utilites_1.utilites.checkAutoReturnState();
        if (role === "customer") {
            const customer_id = await db_1.pool.query(`SELECT id FROM users WHERE email = $1`, [req.user.email]);
            // console.log(customer_id.rows[0].id);
            const result = await booking_services_1.bookingsServices.getAllCustomerBooking(customer_id.rows[0].id);
            res.status(201).json({
                success: true,
                message: "Bookings created successfully",
                data: result.rows,
            });
        }
        if (role === "admin") {
            const result = await booking_services_1.bookingsServices.getAllBooking();
            // console.log(result.rows)
            res.status(201).json({
                success: true,
                message: "Bookings created successfully",
                data: result.rows,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            message: "Message could not be sent",
            details: error.message,
        });
    }
};
const updateBookingsStatus = async (req, res) => {
    try {
        const role = req.user.role;
        if (role === "customer") {
            const resSingleBook = await booking_services_1.bookingsServices.getSingleBooking(req.params.bookingId);
            const bookingStartTime = resSingleBook.rows[0].rent_start_date;
            // console.log(bookingStartTime);
            //if booking time already start
            if (new Date(bookingStartTime) < new Date()) {
                throw new Error('You can\'t cancel bookings, vai. Booking time already suru hoi gase');
            }
            // console.log(customer_id.rows[0].id);
            const result = await booking_services_1.bookingsServices.updateBookingsStatus(req.params.bookingId, "cancelled");
            //update vehicle status
            const vehicleStatus = await vehicle_services_1.vehicleServices.updateSingleVehicle({ availability_status: "available" }, result.rows[0].vehicle_id);
            res.status(201).json({
                success: true,
                message: "Booking cancelled successfully",
                data: result.rows,
            });
        }
        if (role === "admin") {
            const bookDetailsBeforeTimeCheck = await booking_services_1.bookingsServices.getSingleBooking(req.params.bookingId);
            const bookingStartTime = bookDetailsBeforeTimeCheck.rows[0].rent_start_date;
            //if booking time already start
            if (new Date(bookingStartTime) < new Date()) {
                throw new Error('You can\'t cancel bookings, admin vai. Cause Booking time already suru hoi gase');
            }
            // console.log(customer_id.rows[0].id);
            const result = await booking_services_1.bookingsServices.updateBookingsStatus(req.params.bookingId, "returned");
            //update vehicle status
            const vehicleStatus = await vehicle_services_1.vehicleServices.updateSingleVehicle({ availability_status: "available" }, result.rows[0].vehicle_id);
            const getVehicleDetails = await vehicle_services_1.vehicleServices.getSingleVehicle(bookDetailsBeforeTimeCheck.rows[0].vehicle_id);
            const bookDetailsAfterTimeCheck = await booking_services_1.bookingsServices.getSingleBooking(req.params.bookingId);
            const bookingDetails = bookDetailsAfterTimeCheck.rows[0];
            const vehicleAvailability = vehicleStatus.rows[0].availability_status;
            res.status(201).json({
                success: true,
                message: "Booking marked as returned. Vehicle is now available",
                data: {
                    bookingDetails,
                    vehicle: {
                        vehicleAvailability
                    }
                },
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            message: "Booking could not be update",
            details: error.message,
        });
    }
};
exports.bookingsControllers = {
    addBooking,
    getAllBooking,
    updateBookingsStatus,
};
