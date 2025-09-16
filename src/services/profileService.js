// src/services/profileService.js

/**
 * Serviço de Perfil
 * Aqui centralizamos todas as chamadas relacionadas ao perfil do usuário.
 * Hoje está com mock, mas no futuro você só substitui pelas queries do Supabase (ou outro BD).
 */

// 🔹 Função para buscar perfil do usuário
export async function getProfile(userId) {
  // Se ainda não tem backend → retorna dados mock
  // No futuro: return await supabase.from("profiles").select("*").eq("id", userId).single();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId || 1,
        name: "Dr. João Santos Silva",
        email: "joao.santos@universidade.edu.br",
        phone: "(11) 99999-9999",
        role: "Terapeuta",
        institution: "Universidade Federal de São Paulo",
        department: "Departamento de Psicologia Clínica",
        specialty: "Psicoterapia, Terapia Familiar",
        yearsOfExperience: 8,
      });
    }, 800);
  });
}

// 🔹 Função para atualizar perfil
export async function updateProfile(userId, data) {
  // No futuro: return await supabase.from("profiles").update(data).eq("id", userId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...data, id: userId });
    }, 500);
  });
}

// 🔹 Função para excluir perfil
export async function deleteProfile(userId) {
  // No futuro: return await supabase.from("profiles").delete().eq("id", userId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id: userId });
    }, 500);
  });
}
