import React, { useEffect, useState, useContext } from "react";
import PatientList from "./PatientList";
import { patientsMock } from "../../../data/patientsMock";
import { ThemeContext } from "@/context/ThemeContext";

export default function TherapistPatients() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const loggedTherapist = "Dr. João"; // simula login
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const myPatients = patientsMock.filter(
      (p) => p.therapistName === loggedTherapist
    );
    setPatients(myPatients);
  }, []);

  const bgPage = isDark ? "bg-[#121212] text-gray-200" : "bg-gray-50 text-gray-900";

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${bgPage}`}>
      <h1 className={`text-2xl font-bold mb-6 ${isDark ? "text-gray-200" : "text-gray-900"}`}>
        Meus Pacientes
      </h1>
      <PatientList
        patients={patients}
        canEdit={false}
        showRecordsButton={true}
        showDeleteButton={false}
        isDark={isDark}
      />
    </div>
  );
}
