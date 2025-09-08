// src/services/dashboardService.js

// Aqui ficará a função que busca os dados do dashboard
// Por enquanto retorna undefined, depois você substitui pelo fetch real do seu BD
export async function getAdminDashboard() {
  // Exemplo: substitua com fetch real ou Supabase
  // const { data, error } = await supabase.from("dashboard").select("*");
  
  // Temporariamente, retorna dados fictícios pra teste
  return {
    indicadores: {
      totalPacientes: 0,
      novosPacientes: 0,
      consultasHoje: 0,
      terapeutasAtivos: 0,
      relatoriosPendentes: 0,
      taxaPresenca: "0%",
      onlineConfirmadas: 0,
      onlinePendentes: 0,
    },
    atividades: [],
    agenda: [],
    resumo: {
      consultasRealizadas: 0,
      novosPacientes: 0,
      consultasOnline: 0,
      taxaPresenca: "0%",
      usoModalidades: [],
    },
    alertas: [],
    gestao: {
      pacientes: 0,
      terapeutas: 0,
      salas: 0,
      modalidades: 0,
    },
  };
}
