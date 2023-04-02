import express from "express";
import { sendDicom } from "../controllers/dicom.js";

const Router = express.Router();

Router.post("/",sendDicom)

export default Router;