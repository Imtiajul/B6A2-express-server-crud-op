"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = require("express");
const booking_controllers_1 = require("./booking.controllers");
const auth_1 = __importDefault(require("../../middleware/auth"));
const route = (0, express_1.Router)();
route.post("/", (0, auth_1.default)("customer", "admin"), booking_controllers_1.bookingsControllers.addBooking);
route.get("/", (0, auth_1.default)("customer", "admin"), booking_controllers_1.bookingsControllers.getAllBooking);
route.put("/:bookingId", (0, auth_1.default)("customer", "admin"), booking_controllers_1.bookingsControllers.updateBookingsStatus);
exports.bookingRoutes = route;
