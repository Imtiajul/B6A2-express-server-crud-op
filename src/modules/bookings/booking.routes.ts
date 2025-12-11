import { Router } from "express";
import { bookingsControllers } from "./booking.controllers";
import auth from "../../middleware/auth";

const route = Router();


route.post("/", auth("customer", "admin"), bookingsControllers.addBooking);
route.get("/", auth("customer", "admin"), bookingsControllers.getAllBooking);
route.put("/:bookingId", auth("customer", "admin"), bookingsControllers.updateBookingsStatus);

export const bookingRoutes = route;