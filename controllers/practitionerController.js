import google from "@googleapis/healthcare";
const healthcare = google.healthcare({
  version: "v1",
  auth: new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  }),
  headers: { "Content-Type": "application/fhir+json" },
});

const parent = `projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore/fhir/Practitioner`;
const ogParent = `projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore`;

export const createPractitionerResource = async (req, res) => {
  const { name, gender } = req.body;
  // create.
  const body = {
    name: name,
    gender: gender,
    resourceType: "Practitioner",
  };

  const request = { parent: ogParent, type: "Practitioner", requestBody: body };
  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .create(request)
    .then((v) => {
      console.log(`Created practitioner resource with ID ${v.data.id}`);
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

//The request must contain a JSON patch document, and the request headers must contain Content-Type: application/json-patch+json.

export const patchPractitionerResource = async (req, res) => {
  const resourceId = req.params.id;
  const patchOptions = [
    { op: req.body.op, path: req.body.path, value: req.body.value },
  ];
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

export const getPractitionerResource = async (req, res) => {
  const resourceId = req.params.id;
  const name = parent.concat("/", resourceId).trim();
  const request = { name };

  const resource = await healthcare.projects.locations.datasets.fhirStores.fhir
    .read(request)
    .then((v) => {
      console.log(`Got resource:\n`, v.data);
      res.status(200).send(JSON.stringify(v.data));
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({
        message: "unknown error",
      });
    });
};

export const deletePractitionerResource = async (req, res) => {
  const resourceId = req.params.id;
  const name = parent.concat("/", resourceId).trim();
  const request = { name };

  // Regardless of whether the operation succeeds or
  // fails, the server returns a 200 OK HTTP status code. To check that the
  // resource was successfully deleted, search for or get the resource and
  // see if it exists.
  await healthcare.projects.locations.datasets.fhirStores.fhir
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

// export const getAllPatientsOf = async (req, res) => {
//   const patientIds = JSON.parse(req.body.patientIds)
//     .map((id) => `'${id}'`)
//     .join(",")
//     .trim();

//   const params = { "_id:in": `${patientIds}` };

//   const client = await auth.getClient();
//   const response = await client
//     .request({ parent, method: "GET", params })
//     .then((v) => {
//       const resources = v.data.entry;
//       console.log(`Resources found: ${resources.length}`);
//       console.log(JSON.stringify(resources, null, 2));
//       res.status(200).send(JSON.stringify(resources));
//     })
//     .catch((e) => {
//       console.log(e);
//       res.status(500).send({
//         message: "unknown error",
//       });
//     });
// };
