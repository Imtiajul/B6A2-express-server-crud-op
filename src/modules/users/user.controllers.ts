import { Request, Response } from "express"
import { userSerivces } from "./user.services"
import { pool } from "../../config/db"

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userSerivces.getAllUsers()
        //  console.log(result);
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User could not be retrieved",
            details: error,
        })
    }
}

const updateSingleUser = async (req: Request, res: Response) => {
    console.log(req.user);

    try {
        const result = await userSerivces.updateSingleUser(req.body, req.params.userId as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: null,
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0],
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "User could not be updated",
            details: error.message,
        })

    }
}

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userSerivces.deleteSingleUser(req.params.userId as string);
    if(result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      })} else {
        res.status(200).json({
          success: true,
          message: "User deleted successfully",
          data: null,
        })
      }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "User could not be deleted",
      details: error.message,
    })
  }
}

export const userController = {
    getAllUsers,
    deleteSingleUser,
    updateSingleUser
}