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
  console.log(req.body);
  const { status, subject, period } = req.body;
  const encounter = {
    resourceType: "Encounter",
    status: status,
    subject: {
      reference: subject.reference,
    },
    period: {
      start: period.start,
      end: period.end,
    },
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
      console.log(e);
      res.status(500).send({
        message: "unknown error",
      });
    });
};

export const updateEncounterResource = async (req, res) => {
  const resourceId = req.params.id;
  const name = parent.concat("/", resourceId).trim();

  const body = { resourceType: "Encounter", id: resourceId, active: true };
  const request = { name, requestBody: body };

  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .update(request)
    .then((v) => {
      console.log(`Updated Encounter resource:\n`, v.data);
      res.status(200).send(JSON.stringify(v.data));
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({
        message: "unknown error",
      });
    });
};

export const patchEncounterResource = async (req, res) => {
  const resourceId = req.params.id;
  const patchOptions = JSON.parse(req.body.patchOptions);
  const name = parent.concat("/", resourceId).trim();
  const request = {
    name,
    requestBody: patchOptions,
  };

  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .patch(request)
    .then((v) => {
      console.log(`Patched Encounter resource`);
      res.status(200).send(JSON.stringify(v.data));
    })
    .catch((e) => {
      console.log(e);
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
      req.status(200).send(JSON.stringify(v.data));
    })
    .catch((e) => {
      console.log(e);
      req.status(500).send({
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
