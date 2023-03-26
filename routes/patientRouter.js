import {
  createPatientResource,
  getPatientResource,
  patchPatientResource,
  deletePatientResource,
  getPatientEverything,
} from "../controllers/patientController.js";
import express from "express";

const router = express.Router();

router.route("/").post(createPatientResource);
router
  .route("/:id")
  .put(patchPatientResource)
  .get((req, res) => {
    if (req.headers.function === "getPatient") {
      getPatientResource;
    } else if (req.headers.function === "getEverything") {
      getPatientEverything;
    }
  })
  .delete(deletePatientResource);

export default router;
