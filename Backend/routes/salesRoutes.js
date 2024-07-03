import express from "express";
const router = express.Router();
import { authMiddleware } from "../authMiddleware.js";
import { addLead } from "../controller/salesController.js";

router.post('/add-lead', authMiddleware('sales'), addLead );

export default router;
