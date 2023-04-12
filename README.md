# FHIR Server with Google Cloud Healthcare API

This server provides a backend for the FHIR-based client application, allowing it to store and retrieve data from the cloud. The server makes use of the Healthcare API offered by Google Cloud Platform (GCP) to provide a secure and scalable solution for managing patient data.

## Objective

To expose an API to perform queries and calls to interact with the GCP Healthcare API. 


## Methodology

- The server uses a RESTful architecture to provide a standardized way of interacting with the Healthcare API.
- HTTP requests from the client are mapped to corresponding Healthcare API functions to perform requested operations on FHIR resources.
- Node.js Healthcare API functions offered by GCP are used to interact with the Healthcare API.
- Authentication via GCP IAM using a service account ensures that only authorized users can access and modify patient data.
- FHIR resources are stored in an FHIR store in the Google Cloud Platform for scalability and security.


## Endpoints

The server provides the following endpoints for managing patient data:

- /patients: GET, POST
- /patients/:id: GET, PUT, DELETE, PATCH
- /encounters: GET, POST
- /encounters/:id: GET, PATCH, PUT, DELETE
- /observations: GET, POST
- /observations/:id: GET, PUT, DELETE
- /practitioners: POST
- /practitioners/:id : GET, PATCH, PUT, DELETE


## Conclusion

In conclusion, the server provides a reliable and secure way to manage healthcare data in the cloud. By leveraging the Healthcare API offered by GCP and using Node.js Healthcare API functions, the server is able to interact with FHIR resources in a standardized and efficient manner. Authentication via GCP IAM using a service account ensures that patient data is protected and only accessible by authorized users. Storing the FHIR resources in an FHIR store in the Google Cloud Platform provides scalability and security, making it a reliable solution for managing healthcare data in the cloud.
