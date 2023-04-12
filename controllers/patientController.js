import google from "@googleapis/healthcare";
import { GoogleAuth } from "google-auth-library";

import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const healthcare = google.healthcare({
  version: "v1",
  auth: new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  }),
  headers: { "Content-Type": "application/fhir+json" },
});

const parent = `projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore/fhir/Patient`;
const ogParent = `projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore`;

export const createPatientResource = async (req, res) => {
  const { name, gender } = req.body;

  console.log(name);

  // create.
  const body = req.body;

  const request = { parent: ogParent, type: "Patient", requestBody: body };
  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .create(request)
    .then((v) => {
      console.log(`Created patient resource with ID ${v.data.id}`);
      console.log(v.data);
      res.status(200).send(JSON.stringify(v.data));
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({
        message: "unknown error",
      });
    });
};

export const getAllPatients = async (req, res) => {
  const request = { name: parent };

  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .read(request)
    .then((v) => {
      console.log(v.data.entry);

      const result = [];

      v.data.entry.map((entry) => {
        result.push(entry.resource);
      });

      res.status(200).send(JSON.stringify(result));
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({
        message: "unknown error",
      });
    });
};

export const updatePatientResource = async (req, res) => {
  const resourceId = req.params.id;
  const name = parent.concat("/", resourceId).trim();

  console.log(req.body);

  const body = {
    resourceType: "Patient",
    id: resourceId,
    birthDate: req.body.birthDate,
    name: req.body.name,
    gender: req.body.gender,
    generalPractitioner: req.body.generalPractitioner,
  };

  const request = { name, requestBody: body };

  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .update(request)
    .then((v) => {
      console.log(`Updated Patient resource:\n`, v.data);
      res.status(200).send(JSON.stringify(v.data));
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({
        message: "unknown error",
      });
    });
};

//The request must contain a JSON patch document, and the request headers must contain Content-Type: application/json-patch+json.

export const patchPatientResource = async (req, res) => {
  const resourceId = req.params.id;

  const patchOptions = [
    { op: req.body.op, path: req.body.path, value: req.body.value },
  ];

  // console.log(patchOptions);
  // console.log(req.headers);
  // console.log(req.body);

  const name = parent.concat("/", resourceId).trim();
  const request = {
    name,
    requestBody: patchOptions,
  };

  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .patch(request, {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    })
    .then((v) => {
      console.log(`Patched resource`);
      res.status(204).send(JSON.stringify(v.data));
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({
        message: "unknown error",
      });
    });
};

export const getPatientResource = async (req, res) => {
  const resourceId = req.params.id;
  const name = parent.concat("/", resourceId).trim();
  const request = { name };

  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .read(request)
    .then((v) => {
      console.log(v.data);
      res.status(200).send(JSON.stringify(v.data));
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({
        message: "unknown error",
      });
    });
};

export const getPatientEverything = async (req, res) => {
  const patientId = req.params.id;
  const name = parent.concat("/", patientId).trim();
  const request = { name };

  const patientEverything =
    await healthcare.projects.locations.datasets.fhirStores.fhir
      .PatientEverything(request)
      .then((v) => {
        console.log(
          `Got all resources in patient ${patientId} compartment:\n`,
          JSON.stringify(patientEverything)
        );
        res.status(200).send(JSON.stringify(v.data));
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send({
          message: "unknown error",
        });
      });
};

export const deletePatientResource = async (req, res) => {
  const resourceId = req.params.id;
  const name = parent.concat("/", resourceId).trim();
  console.log(name);
  const request = { name };

  // Regardless of whether the operation succeeds or
  // fails, the server returns a 200 OK HTTP status code. To check that the
  // resource was successfully deleted, search for or get the resource and
  // see if it exists.
  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .delete(request)
    .then((v) => {
      console.log("Deleted FHIR resource");
      res.status(200).send(JSON.stringify(v.data));
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({
        message: "unknown error",
      });
    });
};

export const getAllEncounters = async (req, res) => {
  // try {
  //   // const client = await auth.getClient();
  //   const request = {
  //     parent: ogParent,
  //     resourceType: "Encounter",
  //     query: `subject=Patient/${req.params.id}&_tag=Encounter`,
  //   };
  //   const response =
  //     await healthcare.projects.locations.datasets.fhirStores.fhir.search(
  //       request
  //     );

  //   const encounters = response.data.entry.map((entry) => entry.resource);
  //   // console.log(encounters);
  //   res.status(200).send(encounters);
  // } catch (e) {
  //   console.log(e);
  //   res.status(500).send({
  //     message: "there was an unexpected error",
  //   });
  // }

  //  console.log(auth);
  const patientId = req.params.id;
  // console.log(patientId)
  const response = await fetch(
    `https://healthcare.googleapis.com/v1/projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore/fhir/Encounter?patient=${patientId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    }
  );
  const Js = await response.json();
  console.log(Js);
  res.status(200).json(Js);
  // console.log(process.env.TOKEN);
};
