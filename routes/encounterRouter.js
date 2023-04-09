import {
  getEncounterResource,
  patchEncounterResource,
  createEncounterResource,
  deleteEncounterResource,
  updateEncounterResource,
  getAllObservationsOf
} from "../controllers/encounterController.js";
import express from "express";

const router = express.Router();

router.route("/").post(createEncounterResource);
router
  .route("/:id")
  .get((req,res)=>{
    if(req.headers.function=== "getObservations"){
      getAllObservationsOf(req,res);
    }
    else{
      getEncounterResource(req,res);
    }
  })
  .patch(patchEncounterResource)
  .put(updateEncounterResource)
  .delete(deleteEncounterResource);

export default router;