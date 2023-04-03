import {
  createPatientResource,
  getPatientResource,
  deletePatientResource,
  getPatientEverything,
  updatePatientResource,
  patchPatientResource,
  getAllEncounters,
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
    } else if(req.headers.function === "getAllEncounters"){
      getAllEncounters(req,res);
    }
  })
  .put(updatePatientResource)
  .patch(patchPatientResource)
  .delete(deletePatientResource);

export default router;
