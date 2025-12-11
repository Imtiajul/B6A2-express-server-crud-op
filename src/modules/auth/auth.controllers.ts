import { Request, Response } from "express";
import { authSerivces } from "./auth.services";

const signUpUser = async (req: Request, res: Response) => {
    try {
        const result = await authSerivces.signUpUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0],
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "User couldn't be registered",
            details: error.message,
        })
    }
}
const signInUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email, password);
    
    try {
        const result = await authSerivces.signInUser(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            details: error.message,
        })
    }
}
export const authControllers = {
    signUpUser,
    signInUser,
}