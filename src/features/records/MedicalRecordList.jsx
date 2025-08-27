// src/features/records/MedicalRecordList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, FileText, Eye, Calendar, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MedicalRecordList() {
  console.log('рендерizando Lista de Todos os Prontuários');
  
  // Simulando dados de todos os prontuários do terapeuta
  const [allRecords, setAllRecords] = useState([
    {
      id: 1,
      patient: {
        name: 'Maria Silva Santos',
        siape: '123456789',
        age: 35,
        gender: 'Feminino'
      },
      date: '15/01/2024',
      time: '09:00',
      professional: {
        name: 'Dr. João Santos Silva',
        role: 'Psicólogo Clínico',
        registration: 'CRP-123456'
      },
      reason: 'Ansiedade generalizada e dificuldades de concentração',
      status: 'Concluído',
      evolution: 'Positiva',
      attachments: 2
    },
    {
      id: 2,
      patient: {
        name: 'João Santos Lima',
        siape: '987654321',
        age: 28,
        gender: 'Masculino'
      },
      date: '15/01/2024',
      time: '10:30',
      professional: {
        name: 'Dr. João Santos Silva',
        role: 'Psicólogo Clínico',
        registration: 'CRP-123456'
      },
      reason: 'Sessão de acompanhamento - 1ª Sessão',
      status: 'Em Andamento',
      evolution: 'Estável',
      attachments: 1
    },
    {
      id: 3,
      patient: {
        name: 'Ana Costa Pereira',
        siape: '456789123',
        age: 42,
        gender: 'Feminino'
      },
      date: '15/01/2024',
      time: '11:30',
      professional: {
        name: 'Dr. João Santos Silva',
        role: 'Psicólogo Clínico',
        registration: 'CRP-123456'
      },
      reason: 'Avaliação inicial - Terapia Familiar',
      status: 'Agendado',
      evolution: 'Pendente',
      attachments: 0
    },
    {
      id: 4,
      patient: {
        name: 'Carlos Mendes Almeida',
        siape: '321654987',
        age: 31,
        gender: 'Masculino'
      },
      date: '16/01/2024',
      time: '14:00',
      professional: {
        name: 'Dr. João Santos Silva',
        role: 'Psicólogo Clínico',
        registration: 'CRP-123456'
      },
      reason: 'Acompanhamento terapêutico - 2ª Sessão',
      status: 'Concluído',
      evolution: 'Positiva',
      attachments: 3
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPatient, setFilterPatient] = useState('all');

  // Filtrar prontuários
  const filteredRecords = allRecords.filter(record => {
    const matchesSearch = record.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.professional.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesPatient = filterPatient === 'all' || record.patient.name.includes(filterPatient);
    
    return matchesSearch && matchesStatus && matchesPatient;
  });

  return (
    <div className="space-y-6">
      {/* Barra de busca e filtros */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar prontuários por paciente, motivo ou profissional..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Todos os status</option>
                <option value="Concluído">Concluído</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Agendado">Agendado</option>
              </select>
              
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                value={filterPatient}
                onChange={(e) => setFilterPatient(e.target.value)}
              >
                <option value="all">Todos os pacientes</option>
                <option value="Maria">Maria Silva</option>
                <option value="João">João Santos</option>
                <option value="Ana">Ana Costa</option>
                <option value="Carlos">Carlos Mendes</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de prontuários */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecords.map((record) => (
          <Card 
            key={record.id} 
            className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{record.date}</h3>
                    <p className="text-xs text-gray-500">{record.time}</p>
                  </div>
                </div>
                <Badge
                  className={
                    record.status === 'Concluído' ? 'bg-green-100 text-green-800' :
                    record.status === 'Em Andamento' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }
                >
                  {record.status}
                </Badge>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-800">Paciente</p>
                <p className="text-sm">{record.patient.name}</p>
                <p className="text-xs text-gray-500">{record.patient.age} anos • {record.patient.gender}</p>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-800">Motivo</p>
                <p className="text-sm text-gray-600 line-clamp-2">{record.reason}</p>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-800">Profissional</p>
                <p className="text-sm">{record.professional.name}</p>
                <p className="text-xs text-gray-500">{record.professional.role}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  record.evolution === 'Positiva' ? 'bg-green-100 text-green-800' :
                  record.evolution === 'Estável' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {record.evolution}
                </span>
                
                <div className="flex items-center space-x-2">
                  {record.attachments > 0 && (
                    <span className="text-xs text-gray-500">
                      📎 {record.attachments}
                    </span>
                  )}
                  <Link 
                    to={`/patients/${record.patient.siape}/medical-record`}
                    className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum prontuário encontrado</h3>
          <p className="text-gray-500">Tente ajustar os filtros ou buscar por outros termos</p>
        </div>
      )}
    </div>
  );
}