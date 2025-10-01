// src/features/patients/components/AdminPatients.jsx
import React, { useContext } from "react";
import { patientsMock } from "../../../data/patientsMock";
import PatientList from "./PatientList";
import { ThemeContext } from "@/context/ThemeContext";

export default function AdminPatients() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const bgPage = isDark ? "bg-[#121212] text-gray-200" : "bg-gray-50 text-gray-900";

  return (
    <div className={`p-4 min-h-screen transition-colors duration-300 ${bgPage}`}>
      <h1 className={`text-xl font-bold mb-4 ${isDark ? "text-gray-200" : "text-gray-900"}`}>
        Gerenciamento de Pacientes
      </h1>

      <PatientList
        patients={patientsMock}
        canEdit={true}
        showDeleteButton={true}
        showTherapistColumn={true}
        isDark={isDark} 
      />
    </div>
  );
}
