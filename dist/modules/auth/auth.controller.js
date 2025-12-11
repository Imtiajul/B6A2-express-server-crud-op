"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const auth_services_1 = require("./auth.services");
const signUpUser = async (req, res) => {
    try {
        const result = await auth_services_1.authSerivces.signUpUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User couldn't be registered",
            details: error.message,
        });
    }
};
const signInUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const result = await auth_services_1.authSerivces.signInUser(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            details: error.message,
        });
    }
};
exports.authControllers = {
    signUpUser,
    signInUser,
};
