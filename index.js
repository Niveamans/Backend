import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import patientRouter from "./routes/patientRouter.js";

/* CONFIGURATIONS */
const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("common"));

app.use("/patients", patientRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
