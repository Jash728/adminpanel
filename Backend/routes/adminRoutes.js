import express from "express";
import { authMiddleware } from "../authMiddleware.js";
import { deleteUser, getAllUsers, updateUser } from "../controller/adminController.js";

const router = express.Router();

router.get("/users", authMiddleware('admin'), getAllUsers)
router.put("/user/:id", authMiddleware('admin'), updateUser)
router.delete("/user/:id", authMiddleware('admin'), deleteUser)

export default router;