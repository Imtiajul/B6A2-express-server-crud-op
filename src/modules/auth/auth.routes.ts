import express from "express";
import { authControllers } from "./auth.controllers";
import auth from "../../middleware/auth";

const router = express.Router();

// signup USER
router.post('/signup', authControllers.signUpUser);
router.post('/signin', authControllers.signInUser);

export const authRoutes = router;