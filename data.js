export const observationBody ={
  "resourceType": "Observation",
  "status": "final",
  "subject": {
    "reference": "Patient/dbcf46a0-2e0a-4302-9b98-18fc6a6d2fc1"
  },
  "effectiveDateTime": "2020-01-01T00:00:00+00:00",
  "identifier": [
    {
      "system": "my-code-system",
      "value": "ABC-12346"
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "8867-4",
        "display": "Heart rate"
      }
    ]
  },
  "context": {"reference": "Encounter/76650a35-d930-4108-a11c-45b7776b465c"},
  "valueQuantity": {
    "value": 90,
    "unit": "bpm"
  }
  
}

export const ObservationPatchBody ={
    "resourceType": "Observation",
    "id": "6469cd40-c3e0-4cb9-9a81-6cef18377fd6",
    "status": "final",
    "subject": {
      "reference": "Patient/a364e9f8-dd8b-460a-900b-5b905f0a0d3d"
    },
    "effectiveDateTime": "2020-01-01T00:00:00+00:00",
    "identifier": [
      {
        "system": "my-code-system",
        "value": "ABC-12345"
      }
    ],
    "code": {
      "coding": [
        {
          "system": "http://loinc.org",
          "code": "8867-4",
          "display": "Heart rate"
        }
      ]
    },
    "valueQuantity": {
      "value": 123,
      "unit": "bpm"
    },
   
  }