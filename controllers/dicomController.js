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

export async function uploadInstance(req, res) {
  try {
    const instance = fs.readFileSync("C:Users/viswa/Downloads/0002.DCM");
    const instanceBytes = Buffer.from(instance).toString("base64");

    const studyRequest = {
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
        studyRequest
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
      await healthcare.projects.locations.datasets.dicomStores.studies.series.create(
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
