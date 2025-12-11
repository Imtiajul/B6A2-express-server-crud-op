"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const vehicle_services_1 = require("./vehicle.services");
const utilites_1 = require("../../utilites");
const addVehicle = async (req, res) => {
    try {
        const result = await vehicle_services_1.vehicleServices.addVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle registered successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Vehicle couldn't be registered",
            details: error.message,
        });
    }
};
const getAllVehicle = async (req, res) => {
    try {
        // check auto book and available status return status
        utilites_1.utilites.checkAutoReturnState();
        const result = await vehicle_services_1.vehicleServices.getAllVehicle();
        //  console.log(result);
        res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Data could not be fetched",
            details: error,
        });
    }
};
const getSingleVehicle = async (req, res) => {
    try {
        // check auto book and available status return status
        utilites_1.utilites.checkAutoReturnState();
        const result = await vehicle_services_1.vehicleServices.getSingleVehicle(req.params.vehicleId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
                data: null,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result.rows[0],
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Data could not be fetched",
            details: error.message,
        });
    }
};
const updateSingleVehicle = async (req, res) => {
    try {
        const result = await vehicle_services_1.vehicleServices.updateSingleVehicle(req.body, req.params.vehicleId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
                data: null,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: result.rows[0],
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Vehicle could not be updated",
            details: error.message,
        });
    }
};
const deleteSingleVehicle = async (req, res) => {
    try {
        const result = await vehicle_services_1.vehicleServices.deleteSingleVehicle(req.params.vehicleId);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
                data: null
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Vehicle could not be deleted",
            details: error.message
        });
    }
};
exports.vehicleController = {
    addVehicle,
    getAllVehicle,
    getSingleVehicle,
    updateSingleVehicle,
    deleteSingleVehicle,
};
