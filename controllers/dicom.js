import fetch from 'node-fetch';
import dotenv from "dotenv";
import fs from "fs"
import dicom from "dicom-parser";
// import data from "../assets/dicom.dcm";

dotenv.config()



// var dicomFileAsBuffer = fs.readFileSync('dicom.dcm');
// var dataSet = dicom.parseDicom(dicomFileAsBuffer);

// projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/dicomStores/myDicomStore
const binaryData = fs.createReadStream('C:/Users/hari/Downloads/dicom_00000001_000.dcm')
    
export const sendDicom = async(req,res)=>{
  
    // const body3 = JSON.stringify(req.body);
    // const body4 = JSON.stringify(observationBody)
    
    const response = await fetch('https://healthcare.googleapis.com/v1/projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/dicomStores/myDicomStore/dicomWeb/studies', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'application/dicom'
      },
      body:  binaryData,
  });
      const Js = await response.json()
      console.log(Js)
      res.status(200).json(Js);
  }


// import google from "@googleapis/healthcare";
// // import data1 from "../assets/dicom.base64";

// const healthcare = google.healthcare({
//   version: 'v1',
//   auth: new google.auth.GoogleAuth({
//     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
//   }),
// });
// import fs from "fs"

// export const dicomWebStoreInstance = async () => {
//   // TODO(developer): uncomment these lines before running the sample
//   // const cloudRegion = 'us-central1';
//   // const projectId = 'adjective-noun-123';
//   // const datasetId = 'my-dataset';
//   // const dicomStoreId = 'my-dicom-store';
//   // const dcmFile = 'file.dcm';

//   const cloudRegion = "asia-south1";
// const projectId = "ehealth-record-01";
// const datasetId = "eHealthRecordDataset";
// const dicomStoreId = "myDicomStore";
// const dcmFile = 'C:/Users/hari/Downloads/dicom_00000001_000.dcm';

//   const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
//   const dicomWebPath = 'studies';
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
//           'Content-Type': 'application/dicom',
//           Accept: 'application/dicom+json',
//           'Authorization': `Bearer ${process.env.TOKEN}`
//         },
//       }
//     )


//     console.log('Stored DICOM instance:\n', JSON.stringify(instance.data));
  
  
// };

// dicomWebStoreInstance();