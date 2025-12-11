"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_services_1 = require("./user.services");
const getAllUsers = async (req, res) => {
    try {
        const result = await user_services_1.userSerivces.getAllUsers();
        //  console.log(result);
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User could not be retrieved",
            details: error,
        });
    }
};
const updateSingleUser = async (req, res) => {
    console.log(req.user);
    try {
        const result = await user_services_1.userSerivces.updateSingleUser(req.body, req.params.userId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: null,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0],
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User could not be updated",
            details: error.message,
        });
    }
};
const deleteSingleUser = async (req, res) => {
    try {
        const result = await user_services_1.userSerivces.deleteSingleUser(req.params.userId);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: null,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: null,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User could not be deleted",
            details: error.message,
        });
    }
};
exports.userController = {
    getAllUsers,
    deleteSingleUser,
    updateSingleUser
};
