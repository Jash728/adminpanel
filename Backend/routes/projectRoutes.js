import express from "express";
import { createIssue, getDocuments, getIssues, uploadDocument } from "../controller/projectController.js";
import { authMiddleware } from "../authMiddleware.js";

const router = express.Router();

router.post("/upload", authMiddleware('project manager'), uploadDocument)
router.post("/issue", authMiddleware('project manager'), createIssue)
router.get("/uploads", authMiddleware('project manager'), getDocuments)
router.get("/issues", authMiddleware('project manager'), getIssues)


export default router;
