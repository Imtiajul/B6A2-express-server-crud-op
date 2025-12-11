"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const user_routes_1 = require("./modules/users/user.routes");
const vehicle_routes_1 = require("./modules/vehicles/vehicle.routes");
const booking_routes_1 = require("./modules/booking/booking.routes");
const app = (0, express_1.default)();
(0, db_1.default)();
// parser
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello Next Level Dev.\nAssignment 2 - Express.js-Crud-OP \nImtiajul Islam\niimtiajul@gmail.com\n+8801621404809');
});
app.use('/api/v1/auth', auth_routes_1.authRoutes);
app.use('/api/v1/users', user_routes_1.useRoutes);
app.use('/api/v1/vehicles', vehicle_routes_1.vehiclehRoutes);
app.use('/api/v1/bookings', booking_routes_1.bookingRoutes);
// app.use('/auth', authRoutes);
// 404 route not found handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    });
});
exports.default = app;
