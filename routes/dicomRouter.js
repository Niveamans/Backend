// import { uploadInstance } from "../controllers/dicomController.js";
// import { dicomWebStoreInstance } from "../controllers/dicom.js";
import { sendDicom } from "../controllers/dicom.js";

import express from "express";

const router = express.Router();

router.route("/").post(sendDicom);

export default router;
// import express from "express";
// import { sendDicom } from "../controllers/dicom.js";

// const Router = express.Router();

// Router.post("/",sendDicom)

// export default Router;