# FHIR Server with Google Cloud Healthcare API

This server provides a backend for the FHIR-based client application, allowing it to store and retrieve data from the cloud. The server makes use of the Healthcare API offered by Google Cloud Platform (GCP) to provide a secure and scalable solution for managing patient data.


## Objective

**There is a lack of interoperability and availability of medical resources across institutions and even different departments of the same institution in the healthcare industry**

- The Office of the National Coordinator for Health Information Technology (ONC) states that "interoperability is the key to a smarter, patient-centered healthcare system." (source: https://www.healthit.gov/topic/interoperability)

- In a report by the RAND Corporation, it was found that "interoperability failures can lead to serious consequences, including medical errors, incorrect diagnoses, and delayed care." (source: https://www.rand.org/pubs/research_reports/RR308.html)

- According to a study published in the Journal of the American Medical Association, "the lack of interoperability between electronic health record systems continues to be a major barrier to the efficient exchange of health information." (source: https://jamanetwork.com/journals/jama/fullarticle/2676123)


This server is built as a proof of concept to tackle these issues by exposing an API which uses powerful queries using the Healthcare API nodejs library to expose readt made endpoints that are made to fit the issues at hand. 



## Methodology

- The server uses a RESTful architecture to provide a standardized way of interacting with the Healthcare API.
- HTTP requests from the client are mapped to corresponding Healthcare API functions to perform requested operations on FHIR resources.
- Node.js Healthcare API functions offered by GCP are used to interact with the Healthcare API.
- Authentication via GCP IAM using a service account ensures that only authorized users can access and modify patient data.
- FHIR resources are stored in an FHIR store in the Google Cloud Platform for scalability and security.
- Host the server on a Google Cloud VM instance, tailored to our needs.

**Why VM instance?**

- Scalability: VM instances can be easily scaled up or down to meet changing demand. This means that you can increase or decrease the resources allocated to the server based on the amount of traffic it is receiving.

- Cost effectiveness: VM instances are cost-effective as they allow you to pay only for the resources you need. You can choose the amount of CPU, memory, and storage that you require, and you only pay for what you use.

- Isolation: VM instances provide a high level of isolation from other VMs running on the same physical server. This means that if one VM is compromised, it does not affect the other VMs running on the same server.

- Flexibility: VM instances allow you to run different operating systems and software configurations on the same physical hardware. This means that you can run multiple applications on the same server, reducing the number of physical servers required.

- Reliability: VM instances provide a high level of reliability as they are hosted on redundant physical hardware. This means that if one physical server fails, the VM instance can be automatically migrated to another physical server, ensuring minimal downtime.


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
