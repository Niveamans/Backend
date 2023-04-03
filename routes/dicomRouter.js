import { uploadInstance } from "../controllers/dicomController.js";
import express from "express";

const router = express.Router();

router.route("/").post(uploadInstance);

export default router;
