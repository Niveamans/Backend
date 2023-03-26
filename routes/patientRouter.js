import {
  createPatientResource,
  getPatientResource,
  patchPatientResource,
  deletePatientResource,
} from "../controllers/patientController.js";
import express from "express";

const router = express.Router();

router.route("/").post(createPatientResource);
router
  .route("/:id")
  .put(patchPatientResource)
  .get(getPatientResource)
  .delete(deletePatientResource);

export default router;
