import google from "@googleapis/healthcare";
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
  const { name, gender, birthDate, resourceType } = req.body;
  // create.
  const body = {
    name: [
      { use: `${name.use}`, family: `${name.family}`, given: `${name.given}` },
    ],
    gender: gender,
    birthDate: birthDate,
    resourceType: resourceType,
  };

  const request = { ogParent, type: resourceType, requestBody: body };
  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .create(request)
    .then((v) => {
      console.log(`Created patient resource with ID ${v.data.id}`);
      console.log(v.data);
      res.status(200).send(v);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({
        message: "unknown error",
      });
    });
};

export const updatePatientResource = async (req, res) => {
  const resourceId = req.body.resourceId;
  const name = parent.concat("/", resourceId);

  const body = { resourceType: "Patient", id: resourceId, active: true };
  const request = { name, requestBody: body };

  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .update(request)
    .then((v) => {
      console.log(`Updated ${resourceType} resource:\n`, v.data);
      res.status(204).send(v);
    })
    .catch((e) => {
      console.log(e);
      res.send(500).send({
        message: "unknown error",
      });
    });
};

export const patchPatientResource = async (req, res) => {
  const resourceId = req.body.resourceId;
  const patchOptions = JSON.parse(req.body.patchOptions);
  const name = parent.concat("/", resourceId);
  const request = {
    name,
    requestBody: patchOptions,
  };

  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .patch(request)
    .then((v) => {
      console.log(`Patched ${resourceType} resource`);
      res.status(204).send(v);
    })
    .catch((e) => {
      console.log(e);
      res.send(500).send({
        message: "unknown error",
      });
    });
};

export const getPatientResource = async (req, res) => {
  const resourceId = req.body.resourceId;
  const name = parent.concat("/", resourceId);
  const request = { name };

  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .read(request)
    .then((v) => {
      console.log(`Got ${resourceType} resource:\n`, v.data);
      res.status(200).send(v);
    })
    .catch((e) => {
      console.log(e);
      res.send(500).send({
        message: "unknown error",
      });
    });
};

export const getPatientEverything = async (req, res) => {
  const patientId = req.body.patientId;
  const name = parent.concat("/", patientId);
  const request = { name };

  const patientEverything =
    await healthcare.projects.locations.datasets.fhirStores.fhir
      .PatientEverything(request)
      .then((v) => {
        console.log(
          `Got all resources in patient ${patientId} compartment:\n`,
          JSON.stringify(patientEverything)
        );
        res.status(200).send(v);
      })
      .catch((e) => {
        console.log(e);
        res.send(500).send({
          message: "unknown error",
        });
      });
};

export const deletePatientResource = async (req, res) => {
  const resourceId = req.body.resourceId;
  const name = parent.concat("/", resourceId);
  const request = { name };

  // Regardless of whether the operation succeeds or
  // fails, the server returns a 200 OK HTTP status code. To check that the
  // resource was successfully deleted, search for or get the resource and
  // see if it exists.
  await healthcare.projects.locations.datasets.fhirStores.fhir
    .delete(request)
    .then((v) => {
      console.log("Deleted FHIR resource");
      res.status(200).send(resource);
    })
    .catch((e) => {
      console.log(e);
      res.send(500).send({
        message: "unknown error",
      });
    });
};
