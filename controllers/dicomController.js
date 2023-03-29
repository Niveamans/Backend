import google from "@googleapis/healthcare";
const healthcare = google.healthcare({
  version: "v1",
  auth: new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  }),
});
import * as fs from "fs";
import * as util from "util";

const cloudRegion = "asia-south1";
const projectId = "ehealth-record-01";
const datasetId = "eHealthRecordDataset";
const dicomStoreId = "myDicomStore";

async function createStudy() {
  const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;

  const request = {
    parent: parent,
    requestBody: {
      patientId: "1234",
      studyId: "5678",
      startedTime: {
        seconds: Math.floor(Date.now() / 1000),
      },
    },
  };

  const study =
    await healthcare.projects.locations.datasets.dicomStores.studies.create(
      request
    );

  return study.data.studyId;
}

async function createSeries() {
  const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}/dicomWeb/studies/${STUDY_UID}`;

  const request = {
    parent: parent,
    requestBody: {
      seriesInstanceUid: "1.2.3.4.5",
      modality: "CT",
      seriesDescription: "CT Abdomen",
    },
  };

  const series =
    await healthcare.projects.locations.datasets.dicomStores.studies.series.create(
      request
    );

  console.log(`Created series with ID ${series.data.seriesInstanceUid}`);
}

async function uploadInstance() {
  const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}/dicomWeb/studies/${STUDY_UID}/series/${SERIES_UID}`;

  const instance = fs.readFileSync("/path/to/dicom/file.dcm");
  const instanceBytes = Buffer.from(instance).toString("base64");

  const request = {
    parent: parent,
    requestBody: {
      instance: {
        content: instanceBytes,
        transferSyntax: "1.2.840.10008.1.2.1", // Implicit VR Little Endian
      },
      headers: {
        "Content-Type": "application/dicom",
      },
      queryParams: {
        BodyPartExamined: "Abdomen",
      },
    },
  };

  const response =
    await healthcare.projects.locations.datasets.dicomStores.studies.series.instances.store(
      request
    );

  console.log(`Uploaded instance with ID ${response.data.instanceId}`);
}

// export const dicomWebStoreInstance = async (req, res) => {
//   //   TODO(developer): uncomment these lines before running the sample

//   const dcmFile = "file.dcm";
//   const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
//   const dicomWebPath = "studies";
//   // Use a stream because other types of reads overwrite the client's HTTP
//   // headers and cause storeInstances to fail.
//   const binaryData = fs.createReadStream(dcmFile);
//   const request = {
//     parent,
//     dicomWebPath,
//     requestBody: binaryData,
//   };

//   const instance =
//     await healthcare.projects.locations.datasets.dicomStores.storeInstances(
//       request,
//       {
//         headers: {
//           "Content-Type": "application/dicom",
//           Accept: "application/dicom+json",
//         },
//       }
//     );
//   console.log("Stored DICOM instance:\n", JSON.stringify(instance.data));
// };

// Searches

const dicomWebSearchForInstances = async () => {
  const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
  const dicomWebPath = "instances";
  const request = { parent, dicomWebPath };

  const instances =
    await healthcare.projects.locations.datasets.dicomStores.searchForInstances(
      request,
      {
        headers: { Accept: "application/dicom+json,multipart/related" },
      }
    );
  console.log(`Found ${instances.data.length} instances:`);
  console.log(JSON.stringify(instances.data));
};

const dicomWebSearchStudies = async () => {
  const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
  const dicomWebPath = "studies";
  const request = { parent, dicomWebPath };

  const studies =
    await healthcare.projects.locations.datasets.dicomStores.searchForStudies(
      request,
      {
        // Refine your search by appending DICOM tags to the
        // request in the form of query parameters. This sample
        // searches for studies containing a patient's name.
        params: { PatientName: "Sally Zhang" },
        headers: { Accept: "application/dicom+json" },
      }
    );
  console.log(studies);

  console.log(`Found ${studies.data.length} studies:`);
  console.log(JSON.stringify(studies.data));
};

const writeFile = util.promisify(fs.writeFile);
// When specifying the output file, use an extension like ".multipart."
// Then, parse the downloaded multipart file to get each individual
// DICOM file.

const dicomWebRetrieveStudy = async () => {
  const fileName = "study_file.multipart";

  // const studyUid = '1.3.6.1.4.1.5062.55.1.2270943358.716200484.1363785608958.61.0';
  const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
  const dicomWebPath = `studies/${studyUid}`;
  const request = { parent, dicomWebPath };

  const study =
    await healthcare.projects.locations.datasets.dicomStores.studies.retrieveStudy(
      request,
      {
        headers: {
          Accept:
            "multipart/related; type=application/dicom; transfer-syntax=*",
        },
        responseType: "arraybuffer",
      }
    );

  const fileBytes = Buffer.from(study.data);

  await writeFile(fileName, fileBytes);
  console.log(`Retrieved study and saved to ${fileName} in current directory`);
};

const dicomWebRetrieveInstance = async () => {
  const fileName = "instance_file.dcm";

  // const studyUid = '1.3.6.1.4.1.5062.55.1.2270943358.716200484.1363785608958.61.0';
  // const seriesUid = '2.24.52329571877967561426579904912379710633';
  // const instanceUid = '1.3.6.2.4.2.14619.5.2.1.6280.6001.129311971280445372188125744148';
  const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
  const dicomWebPath = `studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`;
  const request = { parent, dicomWebPath };

  const instance =
    await healthcare.projects.locations.datasets.dicomStores.studies.series.instances.retrieveInstance(
      request,
      {
        headers: { Accept: "application/dicom; transfer-syntax=*" },
        responseType: "arraybuffer",
      }
    );
  const fileBytes = Buffer.from(instance.data);

  await writeFile(fileName, fileBytes);
  console.log(
    `Retrieved DICOM instance and saved to ${fileName} in current directory`
  );
};

const dicomWebRetrieveRendered = async () => {
  const fileName = "rendered_image.png";
  // const studyUid = '1.3.6.1.4.1.5062.55.1.2270943358.716200484.1363785608958.61.0';
  // const seriesUid = '2.24.52329571877967561426579904912379710633';
  // const instanceUid = '1.3.6.2.4.2.14619.5.2.1.6280.6001.129311971280445372188125744148';
  const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
  const dicomWebPath = `studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}/rendered`;
  const request = { parent, dicomWebPath };

  const rendered =
    await healthcare.projects.locations.datasets.dicomStores.studies.series.instances.retrieveRendered(
      request,
      {
        headers: { Accept: "image/png" },
        responseType: "arraybuffer",
      }
    );
  const fileBytes = Buffer.from(rendered.data);

  await writeFile(fileName, fileBytes);
  console.log(
    `Retrieved rendered image and saved to ${fileName} in current directory`
  );
};

const dicomWebDeleteStudy = async () => {
  // const studyUid = '1.3.6.1.4.1.5062.55.1.2270943358.716200484.1363785608958.61.0';
  const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
  const dicomWebPath = `studies/${studyUid}`;
  const request = { parent, dicomWebPath };

  await healthcare.projects.locations.datasets.dicomStores.studies.delete(
    request
  );
  console.log("Deleted DICOM study");
};
