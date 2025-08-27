import React from "react";
import { patientsMock } from "../../../data/patientsMock";
import PatientList from "./PatientList";

export default function AssistantPatients() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gerenciamento de Pacientes</h1>
      <PatientList patients={patientsMock} />
    </div>
  );
}
  