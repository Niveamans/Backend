import {
  createPatientResource,
  getPatientResource,
  deletePatientResource,
  getPatientEverything,
} from "../controllers/patientController.js";
import express from "express";

const router = express.Router();

router.route("/").post(createPatientResource);
router
  .route("/:id")
  .get((req, res) => {
    if (req.headers.function === "getPatient") {
      getPatientResource(req, res);
    } else if (req.headers.function === "getEverything") {
      getPatientEverything(req, res);
    }
  })
  .delete(deletePatientResource);

export default router;
