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

const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
const dicomWebPath = "studies";
export async function uploadInstance(req, res) {
  try {
    const instance = fs.readFileSync(
      "C:/Users/hari/Desktop/hackathon/backend/assets/dicom.dcm"
    );
    const instanceBytes = Buffer.from(instance).toString("base64");

    const studyRequest = {
      parent: parent,
      dicomWebPath,
      instanceBytes,
    };

    const study =
      await healthcare.projects.locations.datasets.dicomStores.storeInstancesStudy(
        studyRequest,
        {
          headers: {
            "Content-Type": "application/dicom",
            Accept: "application/dicom+json",
          },
        }
      );

    const seriesParent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}/dicomWeb/studies/${study.data.studyId}`;

    const seriesRequest = {
      parent: seriesParent,
      requestBody: {
        seriesInstanceUid: `1`,
        modality: "CT",
        seriesDescription: "CT Abdomen",
      },
    };

    const series =
      await healthcare.projects.locations.datasets.dicomStores.createSeries(
        seriesRequest
      );

    const instanceParent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}/dicomWeb/studies/${study.data.studyId}/series/${series.data.seriesId}`;

    const request = {
      parent: instanceParent,
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

    const instanceResult =
      await healthcare.projects.locations.datasets.dicomStores.studies.series.instances.store(
        request
      );

    console.log(`Uploaded instance with ID ${instanceResult.data.instanceId}`);

    res.status(200).send({
      message: `successfully added dicom instance of Id ${instanceResult.data.instanceId} to study ${study.data.studyId} and series ${series.data.seriesId}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "unknown error occurred",
    });
  }
}

//rewrite the study, series and instance according to the ones generated from the prev function

const studyId = "5678";
const seriesId = "5678";
const instanceId = "91011";

async function downloadInstance() {
  try {
    const instanceName = `${parent}/dicomWeb/studies/${studyId}/series/${seriesId}/instances/${instanceId}`;
    const response =
      await healthcare.projects.locations.datasets.dicomStores.dicomWeb.instances.retrieve(
        {
          name: instanceName,
          alt: "media",
        }
      );

    const contentDisposition = response.headers["content-disposition"];
    const filenameMatch = contentDisposition.match(/filename="(.*?)"/);
    const filename = filenameMatch ? filenameMatch[1] : "unnamed.dcm";
    const instanceData = response.data;

    // Save the instance data to a file
    const fs = require("fs");
    fs.writeFileSync(filename, instanceData, "binary");

    console.log(`DICOM instance saved to ${filename}`);
  } catch (error) {
    console.error(error);
  }
}

// const studyRequest = {
//   parent: parent,
//   requestBody: {
//     patientId: "1234",
//     studyId: "5678",
//     startedTime: {
//       seconds: Math.floor(Date.now() / 1000),
//     },
//   },
// };

// // async function uploadInstance(req, res) {
// //   const instance = fs.readFileSync("/path/to/dicom/file.dcm");
// //   const instanceBytes = Buffer.from(instance).toString("base64");

// //   const study = await healthcare.projects.locations.datasets.dicomStores.studies
// //     .create(studyRequest)
// //     .then(async (v) => {
// //       const seriesParent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}/dicomWeb/studies/${v.data.studyId}`;

// //       const seriesRequest = {
// //         parent: seriesParent,
// //         requestBody: {
// //           seriesInstanceUid: `${v.data.studyId}`,
// //           modality: "CT",
// //           seriesDescription: "CT Abdomen",
// //         },
// //       };

// //       const series =
// //         await healthcare.projects.locations.datasets.dicomStores.studies.series
// //           .create(seriesRequest)
// //           .then(async (v) => {
// //             const request = {
// //               parent: seriesParent.concat("/", v.data.seriesId).trim(),
// //               requestBody: {
// //                 instance: {
// //                   content: instanceBytes,
// //                   transferSyntax: "1.2.840.10008.1.2.1", // Implicit VR Little Endian
// //                 },
// //                 headers: {
// //                   "Content-Type": "application/dicom",
// //                 },
// //                 queryParams: {
// //                   BodyPartExamined: "Abdomen",
// //                 },
// //               },
// //             };

// //             const response =
// //               await healthcare.projects.locations.datasets.dicomStores.studies.series.instances
// //                 .store(request)
// //                 .then((v) => {
// //                   res.status(200).send({
// //                     message: "successfully added dicom instance",
// //                   });
// //                 })
// //                 .catch((e) => {
// //                   console.log(e);

// //                   res.status(500).send({
// //                     message: "unknown error occurred",
// //                   });
// //                 });
// //           });
// //     });

// //   console.log(`Uploaded instance with ID ${response.data.instanceId}`);
// // }
