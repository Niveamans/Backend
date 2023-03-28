import google from "@googleapis/healthcare";
import fetch from 'node-fetch';
import dotenv from "dotenv";
import { observationBody,ObservationPatchBody } from "../data.js";
dotenv.config()
// const healthcare = google.healthcare({
//   version: "v1",
//   auth: new google.auth.GoogleAuth({
//     scopes: ["https://www.googleapis.com/auth/cloud-platform"],
//   }),
//   headers: { "Content-Type": "application/fhir+json" },
// });

// const Autor = new google.auth.GoogleAuth({
//   scopes: ["https://www.googleapis.com/auth/cloud-platform"],
// })


// const body = {
//     "status": "finished",
//     "class": {
//       "system": "http://hl7.org/fhir/v3/ActCode",
//       "code": "IMP",
//       "display": "inpatient encounter"
//     },
//     "reasonCode": [
//       {
//         "text": "The patient had an abnormal heart rate. She was concerned about this."
//       }
//     ],
//     "subject": {
//       "reference": "Patient/dbcf46a0-2e0a-4302-9b98-18fc6a6d2fc1"
//     },
//     "resourceType": "Encounter"
//   }

const body1={
  "name": [
  {
  "use": "official",
  "family": "Smith",
  "given": [
  "Darcy"
  ]
  }
  ],
  "gender": "female",
  "birthDate": "1970-01-01",
  "resourceType": "Patient"
  }

  // 'Content-Type': 'application/fhir+json; charset=utf-8'

// id:a364e9f8-dd8b-460a-900b-5b905f0a0d3d
// const query = Patient?family:exact=Smith

export const getAllObservations = async( req, res)=>{
 const response = await fetch('https://healthcare.googleapis.com/v1/projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore/fhir/Observation', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${process.env.TOKEN}`,
        
    },
});
const Js = await response.json()
console.log(Js)
res.status(200).json(Js);
  console.log(process.env.TOKEN);
  // res.send("hi");

}

export const getObservation = async( req, res)=>{
  
  const response = await fetch(`https://healthcare.googleapis.com/v1/projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore/fhir/Observation/${req.params.id}`, {
     method: 'GET',
     headers: {
         'Authorization': `Bearer ${process.env.TOKEN}`,
         
     },
 });
 const Js = await response.json()
 console.log(Js)
 res.status(200).json(Js);
   console.log(process.env.TOKEN);
   
 
 }


export const sendObservation = async(req,res)=>{
  
  const body3 = JSON.stringify(req.body);
  const body4 = JSON.stringify(observationBody)
  
  const response = await fetch('https://healthcare.googleapis.com/v1/projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore/fhir/Observation', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/fhir+json; charset=utf-8'
    },
    body: body4,
});
    const Js = await response.json()
    console.log(Js)
    res.status(200).json(Js);
}



// const body2=[{  body format for patch operation
//   "op": "replace",
//   "path": "/birthDate",
//   "value": "1990-01-01"
// }]
  

// encouterId = 91dcfc1b-f6fa-406c-987d-3b1f169a8ec0

export const updateObservation = async(req,res)=>{
  const body = JSON.stringify(req.body);
  const body1 = JSON.stringify(ObservationPatchBody);
  const obId = req.params.id;
  console.log(req.params.id);
  console.log(body)
  
  const response = await fetch(`https://healthcare.googleapis.com/v1/projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore/fhir/Observation/${obId}`, {
    method: 'PUT',
    headers: {
        'Authorization': `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json; charset=utf-8'
    },
    body: body,
});
    const Js = await response.json()
    console.log(Js)
    res.status(200).json(Js);



}

export const deleteObservation = async( req, res)=>{
  
  const response = await fetch(`https://healthcare.googleapis.com/v1/projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore/fhir/Observation/${req.params.id}`, {
     method: 'DELETE',
     headers: {
         'Authorization': `Bearer ${process.env.TOKEN}`,
         
     },
 });
 const Js = await response.json()
 console.log(Js)
 res.status(200).json(Js);
   console.log(process.env.TOKEN);
   

 }