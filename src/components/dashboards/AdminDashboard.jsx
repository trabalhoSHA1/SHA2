// src/pages/administradores/AdminDashboard.jsx
import React from "react";
import { Users, Calendar, UserCheck, FileText, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useDashboard from "@/hooks/useDashboard";
import { useTheme } from "@/context/ThemeContext";

export default function AdminDashboard() {
  const { data: adminData, loading } = useDashboard();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  if (loading) return <Carregando isDark={isDark} />;
  if (!adminData) return <Erro isDark={isDark} />;

  return (
    <div className={`space-y-8 px-6 py-6 transition-colors ${isDark ? "bg-[#121212]" : "bg-gray-50"}`}>
      {/* Indicadores principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Indicador icon={<Users className="w-6 h-6" />} valor={adminData.indicadores.totalPacientes} label="Pacientes Totais" cor="blue" isDark={isDark} />
        <Indicador icon={<Calendar className="w-6 h-6" />} valor={adminData.indicadores.consultasHoje} label="Consultas Hoje" cor="green" isDark={isDark} />
        <Indicador icon={<UserCheck className="w-6 h-6" />} valor={adminData.indicadores.terapeutasAtivos} label="Terapeutas Ativos" cor="purple" isDark={isDark} />
        <Indicador icon={<FileText className="w-6 h-6" />} valor={adminData.indicadores.relatoriosPendentes} label="Relatórios Pendentes" cor="orange" isDark={isDark} />
      </div>

      {/* Busca + Alertas */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className={`flex items-center gap-3 flex-1 border rounded-lg px-3 py-2 transition-colors ${isDark ? "bg-[#1F1F1F] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}>
          <Search className="w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar pacientes, terapeutas ou agendamentos..."
            className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {adminData.alertas.map((alerta, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                alerta.tipo === "sucesso"
                  ? "bg-green-700/20 text-green-400"
                  : alerta.tipo === "aviso"
                  ? "bg-yellow-700/20 text-yellow-400"
                  : "bg-red-700/20 text-red-400"
              }`}
            >
              {alerta.mensagem}
            </span>
          ))}
        </div>
      </div>

      {/* Agenda + Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AgendaCard agenda={adminData.agenda} isDark={isDark} />
        <AtividadesCard atividades={adminData.atividades} isDark={isDark} />
      </div>

      {/* Resumo da Semana */}
      <ResumoSemanalCard resumo={adminData.resumo} isDark={isDark} />

      {/* Gestão Rápida */}
      <GestaoCard gestao={adminData.gestao} isDark={isDark} />
    </div>
  );
}

// ---------------- COMPONENTES AUXILIARES ----------------

function Indicador({ icon, valor, label, cor, isDark }) {
  return (
    <Card className={`shadow-sm hover:shadow-md transition-all rounded-2xl ${isDark ? "bg-[#1F1F1F] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-200 text-gray-900"}`}>
      <CardContent className="flex items-center gap-4 p-5">
        <div className={`p-3 rounded-full bg-${cor}-600/20 text-${cor}-400`}>{icon}</div>
        <div>
          <p className="text-sm">{label}</p>
          <p className="text-2xl font-bold">{valor}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function AtividadesCard({ atividades, isDark }) {
  const coresStatus = { sucesso: "bg-green-500", info: "bg-blue-500", aviso: "bg-yellow-500", erro: "bg-red-500" };
  return (
    <Card className={`shadow-sm hover:shadow-md transition-all rounded-2xl ${isDark ? "bg-[#1F1F1F] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-200 text-gray-900"}`}>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Atividades Recentes</h2>
        <div className="space-y-3">
          {atividades.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition ${isDark ? "bg-[#2A2A2A] hover:bg-[#333333]" : "bg-gray-50 hover:bg-gray-100"}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${coresStatus[item.status]}`}></span>
                <div>
                  <p className="font-medium">{item.nome}</p>
                  <p className="text-sm text-gray-400">{item.acao}</p>
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

function AgendaCard({ agenda, isDark }) {
  const coresStatus = { confirmado: "bg-green-700/20 text-green-400", pendente: "bg-yellow-700/20 text-yellow-400", faltou: "bg-red-700/20 text-red-400" };
  return (
    <Card className={`shadow-sm hover:shadow-md transition-all rounded-2xl ${isDark ? "bg-[#1F1F1F] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-200 text-gray-900"}`}>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Agenda do Dia</h2>
        <div className="space-y-3">
          {agenda.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition ${isDark ? "bg-[#2A2A2A] hover:bg-[#333333]" : "bg-gray-50 hover:bg-gray-100"}`}
            >
              <div>
                <p className="font-medium">{item.paciente}</p>
                <p className="text-sm text-gray-400">{item.terapeuta} • {item.tipo} • {item.hora}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${coresStatus[item.status]}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ResumoSemanalCard({ resumo, isDark }) {
  return (
    <Card className={`shadow-sm hover:shadow-md transition-all rounded-2xl ${isDark ? "bg-[#1F1F1F] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-200 text-gray-900"}`}>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Resumo da Semana</h2>
        <div className="space-y-4">
          <BarItem label="Consultas Realizadas" valor={resumo.consultasRealizadas} cor="green" isDark={isDark} />
          <BarItem label="Novos Pacientes" valor={resumo.novosPacientes} cor="blue" isDark={isDark} />
          <BarItem label="Consultas Online" valor={resumo.consultasOnline} cor="purple" isDark={isDark} />
          <BarItem label="Taxa de Presença" valor={resumo.taxaPresenca} cor="orange" isDark={isDark} isPercent />
          {resumo.usoModalidades.map((mod, i) => (
            <BarItem key={i} label={`Modalidade: ${mod.nome}`} valor={`${mod.valor}%`} cor="teal" isDark={isDark} isPercent />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function BarItem({ label, valor, cor, isDark, isPercent = false }) {
  const widthValue = isPercent ? valor : `${Math.min(valor, 100)}%`;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className={isDark ? "text-gray-300" : "text-gray-600"}>{label}</span>
        <span className={`font-semibold text-${cor}-400`}>{valor}</span>
      </div>
      <div className={`w-full h-3 rounded-full ${isDark ? "bg-[#2A2A2A]" : "bg-gray-200"}`}>
        <div className={`h-3 rounded-full bg-${cor}-600`} style={{ width: widthValue, transition: "width 0.3s ease" }} />
      </div>
    </div>
  );
}

function GestaoCard({ gestao, isDark }) {
  return (
    <Card className={`shadow-sm hover:shadow-md transition-all rounded-2xl ${isDark ? "bg-[#1F1F1F] border-[#2C2C2C] text-gray-200" : "bg-white border-gray-200 text-gray-900"}`}>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Gestão Rápida</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CardGestao label="Pacientes" valor={gestao.pacientes} cor="blue" isDark={isDark} />
          <CardGestao label="Terapeutas" valor={gestao.terapeutas} cor="purple" isDark={isDark} />
          <CardGestao label="Salas" valor={gestao.salas} cor="green" isDark={isDark} />
          <CardGestao label="Modalidades" valor={gestao.modalidades} cor="orange" isDark={isDark} />
        </div>
      </CardContent>
    </Card>
  );
}

function CardGestao({ label, valor, cor, isDark }) {
  return (
    <div className={`rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition ${isDark ? "bg-[#2A2A2A]" : `bg-${cor}-700/20`}`}>
      <p className={`${isDark ? "text-gray-200" : "text-gray-900"} font-medium`}>{label}</p>
      <p className={`text-xl font-bold text-${cor}-400`}>{valor}</p>
    </div>
  );
}

function Carregando({ isDark }) {
  return <div className={`p-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>Carregando dados...</div>;
}

function Erro({ isDark }) {
  return <div className={`p-6 ${isDark ? "text-red-400" : "text-red-500"}`}>Erro ao carregar o dashboard.</div>;
}
