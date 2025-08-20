// src/components/dashboards/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Users, Calendar, UserCheck, FileText, Bell, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                indicadores: {
                  totalPacientes: 156,
                  novosPacientes: 12,
                  consultasHoje: 24,
                  terapeutasAtivos: 8,
                  relatoriosPendentes: 3,
                  taxaPresenca: "92%",
                  onlineConfirmadas: 15,
                  onlinePendentes: 5,
                },
                atividades: [
                  { nome: "Dr. Silva", acao: "Login realizado", hora: "10:30", status: "sucesso" },
                  { nome: "Maria Santos", acao: "Consulta realizada", hora: "10:15", status: "info" },
                  { nome: "Desconhecido", acao: "Tentativa de login falhada", hora: "09:45", status: "erro" },
                  { nome: "Dr. Costa", acao: "Relatório gerado", hora: "09:30", status: "aviso" },
                ],
                agenda: [
                  { paciente: "João", terapeuta: "Dr. Silva", hora: "09:00", tipo: "Presencial", status: "confirmado" },
                  { paciente: "Ana", terapeuta: "Dr. Costa", hora: "09:30", tipo: "Online", status: "pendente" },
                  { paciente: "Carlos", terapeuta: "Maria Santos", hora: "10:00", tipo: "Presencial", status: "confirmado" },
                ],
                resumo: {
                  consultasRealizadas: 127,
                  novosPacientes: 12,
                  consultasOnline: 45,
                  taxaPresenca: "92%",
                  usoModalidades: [
                    { nome: "Individual", valor: 70 },
                    { nome: "Coletiva", valor: 30 },
                  ],
                },
                alertas: [
                  { mensagem: "Paciente faltou na consulta", tipo: "erro" },
                  { mensagem: "Terapeuta indisponível amanhã", tipo: "aviso" },
                  { mensagem: "Novo paciente cadastrado", tipo: "sucesso" },
                ],
                gestao: {
                  pacientes: 156,
                  terapeutas: 8,
                  salas: 12,
                  modalidades: 5,
                },
              }),
            1000
          )
        );
        setAdminData(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Carregando />;
  if (!adminData) return <Erro />;

  return (
    <div className="space-y-8 px-6 py-6">
      {/* Indicadores principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Indicador
          icon={<Users className="w-6 h-6" />}
          valor={adminData?.indicadores?.totalPacientes || 0}
          label="Pacientes Totais"
          cor="blue"
        />
        <Indicador
          icon={<Calendar className="w-6 h-6" />}
          valor={adminData?.indicadores?.consultasHoje || 0}
          label="Consultas Hoje"
          cor="green"
        />
        <Indicador
          icon={<UserCheck className="w-6 h-6" />}
          valor={adminData?.indicadores?.terapeutasAtivos || 0}
          label="Terapeutas Ativos"
          cor="purple"
        />
        <Indicador
          icon={<FileText className="w-6 h-6" />}
          valor={adminData?.indicadores?.relatoriosPendentes || 0}
          label="Relatórios Pendentes"
          cor="orange"
        />
      </div>

      {/* Busca Global + Alertas */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar pacientes, terapeutas ou agendamentos..."
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {adminData?.alertas?.map((alerta, i) => (
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
          )) || null}
        </div>
      </div>

      {/* Agenda + Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AgendaCard agenda={adminData?.agenda || []} />
        <AtividadesCard atividades={adminData?.atividades || []} />
      </div>

      {/* Resumo da Semana */}
      <ResumoSemanalCard resumo={adminData?.resumo || { usoModalidades: [] }} />

      {/* Gestão Rápida */}
      <GestaoCard gestao={adminData?.gestao || { pacientes: 0, terapeutas: 0, salas: 0, modalidades: 0 }} />
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

function AtividadesCard({ atividades }) {
  const coresStatus = { sucesso: "bg-green-500", info: "bg-blue-500", aviso: "bg-yellow-500", erro: "bg-red-500" };
  return (
    <Card className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Atividades Recentes</h2>
        <div className="space-y-3">
          {atividades.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${coresStatus[item.status]}`}></span>
                <div>
                  <p className="font-medium text-gray-800">{item.nome}</p>
                  <p className="text-sm text-gray-500">{item.acao}</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{item.hora}</span>
            </div>
          ))}
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
                <p className="text-sm text-gray-500">{item.terapeuta} • {item.tipo} • {item.hora}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-white text-sm ${coresStatus[item.status]}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ResumoSemanalCard({ resumo }) {
  return (
    <Card className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Resumo da Semana</h2>
        <div className="space-y-4">
          <BarItem label="Consultas Realizadas" valor={resumo?.consultasRealizadas || 0} cor="green" />
          <BarItem label="Novos Pacientes" valor={resumo?.novosPacientes || 0} cor="blue" />
          <BarItem label="Consultas Online" valor={resumo?.consultasOnline || 0} cor="purple" />
          <BarItem label="Taxa de Presença" valor={resumo?.taxaPresenca || "0%"} cor="orange" isPercent />
          {resumo?.usoModalidades?.map((mod, i) => (
            <BarItem key={i} label={`Modalidade: ${mod.nome}`} valor={`${mod.valor || 0}%`} cor="teal" isPercent />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function BarItem({ label, valor, cor, isPercent = false }) {
  const widthValue = isPercent ? valor : `${Math.min(valor, 100)}%`;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className={`font-semibold text-${cor}-600`}>{valor}</span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full">
        <div className={`h-3 rounded-full bg-${cor}-500`} style={{ width: widthValue, transition: "width 0.3s ease" }} />
      </div>
    </div>
  );
}

function GestaoCard({ gestao }) {
  return (
    <Card className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Gestão Rápida</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CardGestao label="Pacientes" valor={gestao?.pacientes || 0} cor="blue" />
          <CardGestao label="Terapeutas" valor={gestao?.terapeutas || 0} cor="purple" />
          <CardGestao label="Salas" valor={gestao?.salas || 0} cor="green" />
          <CardGestao label="Modalidades" valor={gestao?.modalidades || 0} cor="orange" />
        </div>
      </CardContent>
    </Card>
  );
}

function CardGestao({ label, valor, cor }) {
  return (
    <div className={`bg-${cor}-100 rounded-lg p-4 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition`}>
      <p className="text-gray-700 font-medium">{label}</p>
      <p className={`text-2xl font-bold text-${cor}-600`}>{valor}</p>
    </div>
  );
}

function Carregando() {
  return <div className="p-6 text-gray-600">Carregando dados...</div>;
}

function Erro() {
  return <div className="p-6 text-red-600">Erro ao carregar o dashboard.</div>;
}
