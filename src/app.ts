import express, { NextFunction, Request, Response } from "express";
import createDB, { pool } from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { useRoutes } from "./modules/users/user.routes";
import { vehiclehRoutes } from "./modules/vehicles/vehicle.routes";
import { bookingRoutes } from "./modules/bookings/booking.routes";

const app = express()

createDB();

// parser
app.use(express.json());

app.get('/', (req: Request, res:Response) => {
  res.send('Hello Next Level Dev.\nAssignment 2 - Express.js-Crud-OP \nImtiajul Islam\niimtiajul@gmail.com\n+8801621404809');
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', useRoutes);
app.use('/api/v1/vehicles', vehiclehRoutes);
app.use('/api/v1/bookings', bookingRoutes);
// app.use('/auth', authRoutes);

// 404 route not found handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path
  })
});


export default app;