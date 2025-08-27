// src/components/dashboards/TherapistDashboard.jsx
import React, { useState } from 'react';
import { Calendar, Users, Video, TrendingUp, Clock, FileText, CalendarCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TherapistDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  console.log('рендерizando TherapistDashboard');
  
  return (
    <div className="space-y-6">
      {/* Navegação de Abas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'overview' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'schedule' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            Minha Agenda
          </button>
        </div>
      </div>

      {/* Conteúdo da aba Visão Geral */}
      {activeTab === 'overview' && (
        <>
          {/* Estatísticas principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Consultas Hoje</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">4</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-lg p-2">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Pacientes Ativos</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 rounded-lg p-2">
                    <Video className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Online Hoje</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">2</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-100 rounded-lg p-2">
                    <TrendingUp className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Primeira Vez</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Consultas e Pacientes Ativos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Consultas de Hoje */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-0">
                <div className="border-b border-gray-200 p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-800">
                      Consultas de Hoje
                    </h2>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {[ 
                    { name: "Maria Silva", time: "09:00", type: "presencial" },
                    { name: "João Santos", time: "10:30", type: "online", tag: "Primeira Consulta" },
                    { name: "Ana Costa", time: "11:30", type: "presencial" },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          c.type === 'online' ? 'bg-purple-500' : 'bg-green-500'
                        }`} />
                        <div>
                          <p className="font-medium text-gray-900">{c.name}</p>
                          <p className="text-sm text-gray-500">
                            {c.time} • {c.type === 'online' ? 'Online' : 'Presencial'}
                            {c.tag && ` • ${c.tag}`}
                          </p>
                        </div>
                      </div>
                      {c.type === 'online' && (
                        <Button 
                          size="sm" 
                          className="bg-purple-100 hover:bg-purple-200 text-purple-700 text-sm px-3 py-1 h-8"
                        >
                          Iniciar
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pacientes Ativos */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-0">
                <div className="border-b border-gray-200 p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    <h2 className="text-lg font-semibold text-gray-800">
                      Pacientes Ativos
                    </h2>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {[ 
                    { name: "Maria Silva", next: "14/01/2024", status: "Positiva" },
                    { name: "João Santos", next: "15/01/2024", status: "Estável" },
                    { name: "Ana Costa", next: "20/01/2024", status: "Positiva" },
                  ].map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{p.name}</p>
                        <p className="text-sm text-gray-500">
                          Próxima sessão: {p.next}
                        </p>
                      </div>
                      <Badge
                        className={
                          p.status === "Positiva" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {p.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Acesso Rápido à Agenda */}
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between text-white">
              <div>
                <h3 className="text-lg font-semibold mb-2">Gerencie sua Agenda</h3>
                <p className="text-blue-100">Defina seus horários disponíveis para agendamentos</p>
              </div>
              <button
                onClick={() => setActiveTab('schedule')}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <CalendarCheck className="w-5 h-5" />
                Abrir Agenda
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
