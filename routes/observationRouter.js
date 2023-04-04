import express from "express";
import {
  getAllObservations,
  sendObservation,
  updateObservation,
  getObservation,
  deleteObservation,
} from "../controllers/observationController.js";
const Router = express.Router();

Router.get("/", getAllObservations);
Router.post("/", sendObservation);
Router.route("/:id")
  .put(updateObservation)
  .get(getObservation)
  .delete(deleteObservation);

export default Router;
