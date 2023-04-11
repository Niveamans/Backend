import { GoogleAuth } from "google-auth-library";


const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/cloud-platform',
});


const url = `https://healthcare.googleapis.com/v1/projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore/fhir/Observation`;
const client = await auth.getClient();

export const createObservation = async (req, res) => {
  try {
    const body3 = JSON.stringify(req.body);
    const response = await client.request({url, method: 'POST', body: body3,headers:{'Content-Type': 'application/fhir+json'}});
    console.log(response.data)
    res.status(200).json(response.data);

  } catch (error) {
    res.status(400).send(error)
    console.log(error.message)
  }




};

export const updateObservation = async (req, res) => {

  try {
    const body3 = JSON.stringify(req.body);

    const url = `https://healthcare.googleapis.com/v1/projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore/fhir/Observation/${req.params.id}`;

    const response = await client.request({url, method: 'PUT', body: body3,headers:{'Content-Type': 'application/fhir+json'}});
    console.log(response.data)
    res.status(200).json(response.data);

  } catch (error) {
    res.status(400).send(error)
    console.log(error)
  }






};


export const getObservation = async (req, res) => {

  try {
    const url = `https://healthcare.googleapis.com/v1/projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore/fhir/Observation/${req.params.id}`;
  
    const response = await client.request({url, method: 'GET'})
  

    res.status(200).json(response.data);
  
    
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }

  




};

export const deleteObservation = async (req, res) => {
  
  try {

    const url = `https://healthcare.googleapis.com/v1/projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore/fhir/Observation/${req.params.id}`;
    const response = await client.request({url, method: 'DELETE'})
  

    res.status(200).json(response.data);
  
    
  } catch (error) {
    console.log(error);
  }




};

export const getAllObservations = async (req, res) => {
   
  try {
    const params = {'encounter':req.query.encounter}
  
    const response = await client.request({url, method: 'GET', params})
  
    const resources = response.data.entry;
    console.log(`Resources found: ${resources.length}`);
    console.log(JSON.stringify(resources, null, 2));
    res.status(200).json(resources);
  
    
  } catch (error) {
    console.log(error);
  }

  
  };

  export const getAllEncounters = async (req, res) => {
    const url = `https://healthcare.googleapis.com/v1/projects/ehealth-record-01/locations/asia-south1/datasets/eHealthRecordDataset/fhirStores/myFhirStore/fhir/Encounter`
    try {
      const params = {'patient':req.query.patient}
    
      const response = await client.request({url, method: 'GET', params})
    
      const resources = response.data.entry;
      console.log(`Resources found: ${resources.length}`);
      console.log(JSON.stringify(resources, null, 2));
      res.status(200).json(resources);
    
      
    } catch (error) {
      console.log(error);
    }
  
    
    };
  
  
