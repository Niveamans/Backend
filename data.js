export const observationBody = {
  resourceType: "Observation",
  status: "final",
  subject: {
    reference: "Patient/a364e9f8-dd8b-460a-900b-5b905f0a0d3d",
  },
  effectiveDateTime: "2020-01-01T00:00:00+00:00",
  identifier: [
    {
      system: "my-code-system",
      value: "ABC-12345",
    },
  ],
  code: {
    coding: [
      {
        system: "http://loinc.org",
        code: "8867-4",
        display: "Heart rate",
      },
    ],
  },
  valueQuantity: {
    value: 80,
    unit: "bpm",
  },
};

export const ObservationPatchBody = {
  resourceType: "Observation",
  id: "6469cd40-c3e0-4cb9-9a81-6cef18377fd6",
  status: "final",
  subject: {
    reference: "Patient/a364e9f8-dd8b-460a-900b-5b905f0a0d3d",
  },
  effectiveDateTime: "2020-01-01T00:00:00+00:00",
  identifier: [
    {
      system: "my-code-system",
      value: "ABC-12345",
    },
  ],
  code: {
    coding: [
      {
        system: "http://loinc.org",
        code: "8867-4",
        display: "Heart rate",
      },
    ],
  },
  valueQuantity: {
    value: 123,
    unit: "bpm",
  },
};

export const createEncounterBody = {
  status: "in-progress",
  subject: {
    reference: "Patient/dbcf46a0-2e0a-4302-9b98-18fc6a6d2fc1",
  },
  period : {
    start : "2022-05-12T12:42:20.605+05:30",
    end : "2022-03-29T23:32:26.605+05:30"
  },
};

export const updateEncounterBody = {
  status: "arrived",
};

export const createPatientBody = {
  name: [
    {
      family: "Wick",
      given: ["John"],
      use: "official",
    },
  ],
  birthDate : "2003-01-01",
  gender: "male",
};

export const updatePatientBody = {
  name: [
    {
      family: "Yagami",
      given: ["Light"],
      use: "official",
    },
  ],
  gender: "male",
};

export const createPractitionerBody = {
  name: [
    {
      family: "Uchiha",
      given: ["Madara"],
      use: "official",
    },
  ],
  gender: "female",
};

export const updatePractitionerBody = {
  name: [
    {
      family: "Smith",
      given: ["Kevin"],
      use: "official",
    },
  ],
  gender: "male",
};
