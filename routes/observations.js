import express from "express";
import {getObservation,updateObservation,deleteObservation,getAllObservations,createObservation} from "../controllers/observationcntroller.js"
const Router = express.Router();


Router.get("/",getAllObservations)
Router.post("/",createObservation)
Router
.route("/:id")
.put(updateObservation)
.get(getObservation)
.delete(deleteObservation)

export default Router