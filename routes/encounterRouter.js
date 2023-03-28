import{
    getEncounterResource,
    patchEncounterResource,
    createEncounterResource,
    deleteEncounterResource,
} from "../controllers/encounterController.js";
import express from "express";

const router = express.Router();

router.route("/").post(createEncounterResource);
router
   .route("/:id")
   .get((req,res)=>{
    getEncounterResource(req,res);
   })
   .patch(patchEncounterResource)
   .delete(deleteEncounterResource);

export default router;