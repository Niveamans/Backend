import google from "@googleapis/healthcare";
const healthcare = google.healthcare({
  version: "v1",
  auth: new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  }),
  headers: { "Content-Type": "application/fhir+json" },
});

const parent = `projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore/fhir/Encounter`;
const ogParent = `projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore`;

export const createEncounterResource = async (req, res) => {
  // only include status and subject
  const { status, subject } = JSON.parse(req.body);

  const encounter = {
    status: status,
    subject: subject,
    resourceType: "Encounter",
  };

  const request = {
    parent: ogParent,
    type: "Encounter",
    requestBody: encounter,
  };

  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .create(request)
    .then((v) => {
      console.log(`Created patient resource with ID ${v.data.id}`);
      console.log(v.data);
      res.status(200).send(JSON.stringify(v.data));
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({
        message: "unknown error",
      });
    });
};

export const updateEncounterResource = async (req, res) => {
  const resourceId = req.params.id;
  const name = parent.concat("/", resourceId).trim();

  const body = {
    resourceType: "Encounter",
    id: resourceId,
    status: "finished",
  };
  const request = { name, requestBody: body };

  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .update(request)
    .then((v) => {
      console.log(`Updated Encounter resource:\n`, v.data);
      res.status(200).send(JSON.stringify(v.data));
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({
        message: "unknown error",
      });
    });
};

export const patchEncounterResource = async (req, res) => {
  // make sure patch request is formatted properly
  const resourceId = req.params.id;
  const name = parent.concat("/", resourceId).trim();
  const patchOptions = [
    { op: req.body[0].op, path: req.body[0].path, value: req.body[0].value },
  ];

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
      console.log(`Patched Encounter resource`);
      res.status(200).send(JSON.stringify(v.data));
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({
        message: "unknown error",
      });
    });
};

export const getEncounterResource = async (req, res) => {
  const resourceId = req.params.id;
  const name = parent.concat("/", resourceId).trim();
  const request = { name };

  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .read(request)
    .then((v) => {
      console.log(`Got Encounter resource:\n`, v.data);
      res.status(200).send(JSON.stringify(v.data));
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({
        message: "unknown error",
      });
    });
};

export const deleteEncounterResource = async (req, res) => {
  const resourceId = req.params.id;
  const name = parent.concat("/", resourceId).trim();
  const request = { name };

  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .delete(request)
    .then((v) => {
      console.log("deleted FHIR resources.");
      res.status(200).send(JSON.stringify(v.data));
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({
        message: "unknown error",
      });
    });
};
