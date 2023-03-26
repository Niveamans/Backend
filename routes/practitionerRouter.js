import {
  createPractitionerResource,
  getPractitionerResource,
  patchPractitionerResource,
  deletePractitionerResource,
  getAllPatientsOf,
} from "../controllers/practitionerController.js";
import express from "express";

const router = express.Router();

router.route("/").post(createPractitionerResource);
router
  .route("/:id")
  .put(patchPractitionerResource)
  .get((req, res) => {
    if (req.headers.function === "getDoctor") {
      getPractitionerResource;
    } else if (req.headers.function === "getPatients") {
      getAllPatientsOf;
    }
  })
  .delete(deletePractitionerResource);

export default router;
