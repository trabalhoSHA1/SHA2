// src/components/dashboard/AssistantDashboard.jsx
import React, { useEffect, useState } from "react";
import { Users, Calendar, FileText, UserCheck, Bell, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AssistantDashboard() {
  const [loading, setLoading] = useState(true);
  const [assistantData, setAssistantData] = useState(null);

  useEffect(() => {
    // Simula fetch de dados
    const fetchData = async () => {
      try {
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve({
            indicadores: {
              totalPacientes: 120,
              novosPacientes: 5,
              consultasHoje: 20,
              relatoriosPendentes: 4,
              onlineConfirmadas: 10,
              onlinePendentes: 3,
            },
            agenda: [
              { paciente: "João", hora: "09:00", tipo: "Presencial", status: "confirmado" },
              { paciente: "Ana", hora: "09:30", tipo: "Online", status: "pendente" },
              { paciente: "Carlos", hora: "10:00", tipo: "Presencial", status: "confirmado" },
            ],
            alertas: [
              { mensagem: "Novo paciente cadastrado", tipo: "sucesso" },
              { mensagem: "Consulta pendente de confirmação", tipo: "aviso" },
              { mensagem: "Paciente faltou na última consulta", tipo: "erro" },
            ],
          }), 1000)
        );
        setAssistantData(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Carregando />;
  if (!assistantData) return <Erro />;

  return (
    <div className="space-y-8 px-6 py-6">
      {/* Indicadores principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Indicador
          icon={<Users className="w-6 h-6" />}
          valor={assistantData.indicadores.totalPacientes}
          label="Pacientes"
          cor="blue"
        />
        <Indicador
          icon={<Calendar className="w-6 h-6" />}
          valor={assistantData.indicadores.consultasHoje}
          label="Consultas Hoje"
          cor="green"
        />
        <Indicador
          icon={<FileText className="w-6 h-6" />}
          valor={assistantData.indicadores.relatoriosPendentes}
          label="Relatórios Pendentes"
          cor="orange"
        />
        <Indicador
          icon={<UserCheck className="w-6 h-6" />}
          valor={assistantData.indicadores.novosPacientes}
          label="Novos Pacientes"
          cor="purple"
        />
      </div>

      {/* Busca e Alertas */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar pacientes ou agendamentos..."
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {assistantData.alertas.map((alerta, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-white text-sm ${
                alerta.tipo === "sucesso"
                  ? "bg-green-500"
                  : alerta.tipo === "aviso"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {alerta.mensagem}
            </span>
          ))}
        </div>
      </div>

      {/* Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <AgendaCard agenda={assistantData.agenda} />
      </div>
    </div>
  );
}

// --- COMPONENTES AUXILIARES ---
function Indicador({ icon, valor, label, cor }) {
  return (
    <Card className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all">
      <CardContent className="flex items-center gap-4 p-5">
        <div className={`p-3 rounded-lg bg-${cor}-100 text-${cor}-600`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{valor}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function AgendaCard({ agenda }) {
  const coresStatus = { confirmado: "bg-green-500", pendente: "bg-yellow-500", faltou: "bg-red-500" };
  return (
    <Card className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Agenda do Dia</h2>
        <div className="space-y-3">
          {agenda.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition">
              <div>
                <p className="font-medium text-gray-800">{item.paciente}</p>
                <p className="text-sm text-gray-500">{item.tipo} • {item.hora}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-white text-sm ${coresStatus[item.status]}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Carregando() {
  return <div className="p-6 text-gray-600">Carregando dados...</div>;
}

function Erro() {
  return <div className="p-6 text-red-600">Erro ao carregar o dashboard.</div>;
}
