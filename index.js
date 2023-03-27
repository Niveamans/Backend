import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import patientRouter from "./routes/patientRouter.js";
import practitionerRouter from "./routes/practitionerRouter.js";

/* CONFIGURATIONS */
const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.text());
app.use(express.json());
app.use(cors());
app.use(morgan("common"));

app.use("/patients", patientRouter);
app.use("/practitioners", practitionerRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
