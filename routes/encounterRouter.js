import {
  getEncounterResource,
  patchEncounterResource,
  createEncounterResource,
  deleteEncounterResource,
  updateEncounterResource,
} from "../controllers/encounterController.js";

import { getAllEncounters } from "../controllers/observationController.js";
import express from "express";

const router = express.Router();

router.route("/").post(createEncounterResource);
router.route("/").get(getAllEncounters);
router
  .route("/:id")
  .get(getEncounterResource)
  .patch(patchEncounterResource)
  .put(updateEncounterResource)
  .delete(deleteEncounterResource);

export default router;