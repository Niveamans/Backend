import {
  createPractitionerResource,
  getPractitionerResource,
  deletePractitionerResource,
  updatePractitionerResource,
  patchPractitionerResource,
} from "../controllers/practitionerController.js";
import express from "express";

const router = express.Router();

router.route("/").post(createPractitionerResource);
router
  .route("/:id")
  .get((req, res) => {
    if (req.headers.function === "getDoctor") {
      getPractitionerResource(req, res);
    } else if (req.headers.function === "getPatients") {
      getAllPatientsOf(req, res);
    }
  })
  .put(updatePractitionerResource)
  .patch(patchPractitionerResource)
  .delete(deletePractitionerResource);

export default router;
