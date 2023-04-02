import fetch from 'node-fetch';
import dotenv from "dotenv";
import fs from "fs"
import dicom from "dicom-parser";

dotenv.config()



var dicomFileAsBuffer = fs.readFileSync('../assets/dicom.dcm');
var dataSet = dicom.parseDicom(dicomFileAsBuffer);

// projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/dicomStores/myDicomStore


export const sendDicom = async(req,res)=>{
  
    const body3 = JSON.stringify(req.body);
    const body4 = JSON.stringify(observationBody)
    
    const response = await fetch('https://healthcare.googleapis.com/v1/projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/dicomStores/myDicomStore/dicomWeb/studies', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'application/dicom'
      },
      body: dataSet,
  });
      const Js = await response.json()
      console.log(Js)
      res.status(200).json(Js);
  }