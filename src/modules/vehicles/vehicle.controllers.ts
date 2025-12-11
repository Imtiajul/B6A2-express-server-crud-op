import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.services";
import { utilites } from "../../utilites";

const addVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.addVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle registered successfully",
            data: result.rows[0],
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Vehicle couldn't be registered",
            details: error.message,
        })
    }
}

const getAllVehicle = async (req: Request, res: Response) => {
    try {

        // check auto book and available status return status
        utilites.checkAutoReturnState();

        const result = await vehicleServices.getAllVehicle();
        //  console.log(result);
        res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Data could not be fetched",
            details: error,
        })
    }
}

const getSingleVehicle = async (req: Request, res: Response) => {
    try {
        
        // check auto book and available status return status
        utilites.checkAutoReturnState();
        
        const result = await vehicleServices.getSingleVehicle(req.params.vehicleId as string);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
                data: null,
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result.rows[0],
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Data could not be fetched",
            details: error.message,
        })
    }
}

const updateSingleVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.updateSingleVehicle(req.body, req.params.vehicleId as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
                data: null,
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: result.rows[0],
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Vehicle could not be updated",
            details: error.message,
        })

    }
}
const deleteSingleVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.deleteSingleVehicle(req.params.vehicleId as string);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
                data: null
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Vehicle could not be deleted",
            details: error.message
        })
    }
}


export const vehicleController = {
    addVehicle,
    getAllVehicle,
    getSingleVehicle,
    updateSingleVehicle,
    deleteSingleVehicle,
}