import express from "express";
import { login, logout, signup, updateProfile } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup",signup);

router.post("/login",login);
router.post("/logout",logout);

router.put("/update-profile",updateProfile);

export default router;