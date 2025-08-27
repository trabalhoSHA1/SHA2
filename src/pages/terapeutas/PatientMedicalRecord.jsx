// src/components/patients/PatientMedicalRecord.jsx
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Eye, Edit, Trash, FileText, Calendar, User, Heart, Stethoscope } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function PatientMedicalRecord() {
  const { siape } = useParams();
  console.log('рендерizando Prontuário Médico do Paciente:', siape);
  
  // Simulando dados do prontuário
  const [medicalRecord, setMedicalRecord] = useState({
    patient: {
      name: 'Maria Silva Santos',
      siape: siape,
      age: 35,
      gender: 'Feminino',
      bloodType: 'O+',
      allergies: 'Penicilina, Leite',
      diseases: 'Diabetes, Distúrbios Hematológicos',
      height: '1.78m',
      weight: '65kg',
      lastVisit: '25/10/2019'
    },
    vitalSigns: {
      heartRate: '85 bpm',
      bodyTemperature: '36.5°C',
      glucose: '90 mg/dL',
      creatineKinase: '120 U/L'
    },
    prescriptions: [
      { id: 1, medication: 'Metformina 500mg', dosage: '1x ao dia', duration: '30 dias' },
      { id: 2, medication: 'Losartana 50mg', dosage: '1x ao dia', duration: '30 dias' }
    ],
    exams: [
      { id: 1, name: 'Hemograma Completo', date: '15/01/2024', result: 'Normal' },
      { id: 2, name: 'CT Scan', date: '10/01/2024', result: 'Sem alterações significativas' }
    ]
  });

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Prontuário Médico</h1>
          <p className="text-gray-600">Detalhes completos do paciente</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            + Nova Anotação
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <FileText className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Informações do Paciente */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              Informações do Paciente
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Nome</p>
              <p className="text-sm font-semibold">{medicalRecord.patient.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Idade</p>
              <p className="text-sm font-semibold">{medicalRecord.patient.age} anos</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Gênero</p>
              <p className="text-sm font-semibold">{medicalRecord.patient.gender}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Tipo Sanguíneo</p>
              <p className="text-sm font-semibold">{medicalRecord.patient.bloodType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Alergias</p>
              <p className="text-sm font-semibold">{medicalRecord.patient.allergies}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Doenças</p>
              <p className="text-sm font-semibold">{medicalRecord.patient.diseases}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Altura</p>
              <p className="text-sm font-semibold">{medicalRecord.patient.height}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Peso</p>
              <p className="text-sm font-semibold">{medicalRecord.patient.weight}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sinais Vitais */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Sinais Vitais
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-red-800">Frequência Cardíaca</p>
              <p className="text-xl font-bold text-red-600">{medicalRecord.vitalSigns.heartRate}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Temperatura Corporal</p>
              <p className="text-xl font-bold text-blue-600">{medicalRecord.vitalSigns.bodyTemperature}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-green-800">Glicose</p>
              <p className="text-xl font-bold text-green-600">{medicalRecord.vitalSigns.glucose}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-purple-800">Creatina Quinase</p>
              <p className="text-xl font-bold text-purple-600">{medicalRecord.vitalSigns.creatineKinase}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prescrições */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Stethoscope className="w-5 h-5 mr-2 text-green-500" />
              Prescrições
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              + Nova Prescrição
            </Button>
          </div>
          
          <div className="space-y-3">
            {medicalRecord.prescriptions.map((prescription) => (
              <div key={prescription.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{prescription.medication}</p>
                  <p className="text-sm text-gray-500">
                    Dosagem: {prescription.dosage} • Duração: {prescription.duration}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <Trash className="w-4 h-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exames */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-500" />
              Exames
            </h2>
          </div>
          
          <div className="space-y-3">
            {medicalRecord.exams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{exam.name}</p>
                  <p className="text-sm text-gray-500">
                    Data: {exam.date} • Resultado: {exam.result}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <Trash className="w-4 h-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}