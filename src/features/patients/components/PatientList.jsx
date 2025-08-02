// features/patients/components/PatientList.jsx
import React from 'react';
import { User, Phone, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function PatientList() {
  // Dados de exemplo - depois virão da API
  const patients = [
    {
      id: 1,
      name: "Maria Silva",
      age: 35,
      phone: "(11) 99999-9999",
      lastVisit: "15/01/2024",
      status: "Ativo",
      color: "green"
    },
    {
      id: 2,
      name: "João Santos",
      age: 28,
      phone: "(11) 88888-8888",
      lastVisit: "10/01/2024",
      status: "Novo",
      color: "blue"
    },
    {
      id: 3,
      name: "Ana Costa",
      age: 42,
      phone: "(11) 77777-7777",
      lastVisit: "05/01/2024",
      status: "Em acompanhamento",
      color: "yellow"
    }
  ];

  return (
    <Card className="bg-white">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-green-800">
            Pacientes Ativos
          </h2>
          <Button variant="outline" size="sm">
            Ver todos
          </Button>
        </div>
        
        <div className="space-y-3">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="bg-gray-50 p-3 rounded-xl flex justify-between items-center shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">{patient.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{patient.age} anos</span>
                    <Phone className="w-3 h-3" />
                    <span>{patient.phone}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge 
                  className={
                    patient.color === "green" ? "bg-green-100 text-green-800" :
                    patient.color === "blue" ? "bg-blue-100 text-blue-800" :
                    "bg-yellow-100 text-yellow-800"
                  }
                >
                  {patient.status}
                </Badge>
                <div className="text-right text-xs text-gray-500">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  {patient.lastVisit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}