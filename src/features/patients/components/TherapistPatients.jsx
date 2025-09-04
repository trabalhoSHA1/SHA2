// src/features/patients/components/TherapistPatients.jsx
import React, { useEffect, useState } from "react";
import PatientList from "./PatientList";
import { patientsMock } from "../../../data/patientsMock"; // ou API

export default function TherapistPatients() {
  const loggedTherapist = "Dr. João"; // simula login
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const myPatients = patientsMock.filter(
      (p) => p.therapistName === loggedTherapist
    );
    setPatients(myPatients);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Meus Pacientes</h1>
      <PatientList
        patients={patients}
        canEdit={false} 
        showRecordsButton={true} 
        showDeleteButton={false} 
      />
    </div>
  );
}
