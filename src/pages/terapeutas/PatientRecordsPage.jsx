// src/pages/PatientRecordsPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Eye, Edit, Trash, FileText, Calendar, User, Heart, Stethoscope } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function PatientRecordsPage() {
  const { siape } = useParams();
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  console.log('рендерizando Página de Prontuários do Paciente:', siape);
  
  const loggedTherapist = {
    name: 'Dr. João Santos Silva',
    role: 'Psicólogo Clínico',
    registration: 'CRP-123456'
  };

  const [records, setRecords] = useState([
    {
      id: 1,
      date: '15/01/2024',
      time: '09:00',
      title: 'Avaliação Inicial - Terapia Cognitivo Comportamental',
      type: 'Avaliação',
      status: 'Concluído',
      createdAt: '2024-01-15T10:00:00Z',
      therapist: {
        name: 'Dr. João Santos Silva',   
        role: 'Psicólogo Clínico',
        registration: 'CRP-123456'
      },
      evolution: 'Positiva'
    },
    {
      id: 2,
      date: '22/01/2024',
      time: '10:30',
      title: 'Sessão de Acompanhamento - 1ª Sessão',
      type: 'Sessão',
      status: 'Concluído',
      createdAt: '2024-01-22T11:30:00Z',
      therapist: {
        name: 'Dr. João Santos Silva',   
        role: 'Psicólogo Clínico',
        registration: 'CRP-123456'
      },
      evolution: 'Estável'
    },
    {
      id: 3,
      date: '29/01/2024',
      time: '14:00',
      title: 'Sessão de Acompanhamento - 2ª Sessão',
      type: 'Sessão',
      status: 'Agendado',
      createdAt: '2024-01-29T09:00:00Z',
      therapist: {
        name: 'Dra. Ana Costa Pereira',  
        role: 'Terapeuta Cognitivo Comportamental',
        registration: 'CRP-789012'
      },
      evolution: 'Pendente'
    }
  ]);

  const filteredRecords = records.filter(record => 
    record.therapist.name === loggedTherapist.name
  );

  return (
    <div className="flex h-full bg-gray-50">
      {/* Área de Listagem de Prontuários */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Cabeçalho da lista */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Prontuários</h2>
            <Button className="bg-green-500 hover:bg-green-600 text-white px-1 py-1 rounded-lg text-sm font-medium transition-colors">
              + Novo
            </Button>
          </div>
          
          {/* Informações do paciente */}
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Maria Silva Santos</h3>
            <p className="text-sm text-gray-500">SIAPE: {siape}</p>
          </div>
        </div>
        
        {/* Lista de prontuários FILTRADOS */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-2">
            {filteredRecords.map((record) => (
              <Card 
                key={record.id} 
                className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedRecord === record.id ? 'bg-green-50 border-green-200' : 'bg-white'
                }`}
                onClick={() => setSelectedRecord(record.id)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div>
                        <h3 className="font-medium text-gray-900">{record.title}</h3>
                        <p className="text-sm text-gray-500">
                          {record.date} • {record.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === 'Concluído' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {record.status}
                      </span>
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100">
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Área de Visualização Detalhada */}
      <div className="flex-1 flex flex-col">
        {selectedRecord ? (
          <RecordDetailView 
            record={records.find(r => r.id === selectedRecord)} 
            loggedTherapist={loggedTherapist}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Selecione um prontuário</h3>
              <p className="text-gray-500">Clique em um prontuário da lista para visualizar seus detalhes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para visualização detalhada do prontuário
function RecordDetailView({ record, loggedTherapist }) {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {/* Cabeçalho do prontuário */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Prontuário #{record.id}</h1>
            <p className="text-sm text-gray-500">{record.date} às {record.time}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-1 py-1 rounded-lg text-sm font-medium transition-colors">
              + Nova Anotação
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-1 py-1 rounded-lg text-sm font-medium transition-colors">
              <FileText className="w-4 h-4 mr-1" />
              Exportar PDF
            </Button>
          </div>
        </div>
        
        {/* Informações do paciente */}
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-500" />
            Informações do Paciente
          </h2>
          <div className="mt-2">
            <p className="text-sm font-medium">Nome</p>
            <p className="text-sm">Maria Silva Santos</p>
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium">Idade</p>
            <p className="text-sm">35 anos</p>
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium">Gênero</p>
            <p className="text-sm">Feminino</p>
          </div>
        </div>
        
        {/* Informações do terapeuta */}
        <div className="bg-green-50 p-3 rounded-lg">
          <h2 className="text-lg font-semibold text-green-800 flex items-center">
            <Stethoscope className="w-5 h-5 mr-2 text-green-600" />
            Terapeuta Responsável
          </h2>
          <div className="mt-2">
            <p className="text-sm font-medium">{record.therapist.name}</p>
            <p className="text-sm">{record.therapist.role}</p>
            <p className="text-sm">Registro: {record.therapist.registration}</p>
          </div>
        </div>
      </div>
      
      {/* Conteúdo do prontuário */}
      <div className="p-6 space-y-6">
        {/* Queixa Principal */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Queixa Principal
            </h2>
            <p className="text-gray-700">
              Ansiedade generalizada e dificuldades de concentração
            </p>
          </CardContent>
        </Card>
        
        {/* Evolução Clínica */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              Evolução Clínica
            </h2>
            <div className="flex items-center space-x-2 mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                record.evolution === 'Positiva' 
                  ? 'bg-green-100 text-green-800' 
                  : record.evolution === 'Estável' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {record.evolution}
              </span>
            </div>
            <p className="text-gray-700">
              Paciente apresenta evolução {record.evolution.toLowerCase()} no tratamento. 
              Continuar com a abordagem terapêutica atual e monitorar os sintomas semanalmente.
            </p>
          </CardContent>
        </Card>
        
        {/* Observações do Terapeuta */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Observações do Terapeuta
            </h2>
            <p className="text-gray-700">
              Durante a sessão, o paciente demonstrou boa adesão ao tratamento e 
              compreensão das técnicas cognitivo-comportamentais ensinadas. 
              Recomendado reforçar exercícios de mindfulness para próxima semana.
            </p>
          </CardContent>
        </Card>
        
        {/* Procedimentos Realizados */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Procedimentos Realizados
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Avaliação psicológica inicial</li>
              <li>Aplicação de técnicas de respiração diafragmática</li>
              <li>Discussão sobre gatilhos de ansiedade</li>
              <li>Planejamento de estratégias de coping</li>
            </ul>
          </CardContent>
        </Card>
        
        {/* Orientações Dadas */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Orientações Dadas
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Praticar exercícios de respiração 3 vezes ao dia</li>
              <li>Manter diário de pensamentos automáticos</li>
              <li>Evitar cafeína e álcool durante o tratamento</li>
              <li>Retornar para próxima sessão em 7 dias</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}