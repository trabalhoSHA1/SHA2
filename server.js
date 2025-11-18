import express from "express";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// CREATE - criar usuário
app.post("/usuarios", async (req, res) => {
  try {
    const { email, name, age, password, role, phone, therapySpecialty } = req.body;

    // Validação de telefone obrigatório
    if ((role === "ADMIN" || role === "THERAPIST") && !phone) {
      return res.status(400).json({ error: "Telefone é obrigatório para ADMIN e TERAPEUTA" });
    }

    // Validação de specialty obrigatório para terapeuta
    if (role === "THERAPIST" && !therapySpecialty) {
      return res.status(400).json({ error: "Especialidade é obrigatória para TERAPEUTA" });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        age,
        password,
        role: role || Role.THERAPIST,
        phone: phone || null,
        therapySpecialty: therapySpecialty || null,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - listar usuários
app.get("/usuarios", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - atualizar usuário
app.put("/usuarios/:id", async (req, res) => {
  try {
    const { email, name, age, password, role, phone, therapySpecialty } = req.body;

    // Validação de telefone obrigatório
    if ((role === "ADMIN" || role === "THERAPIST") && !phone) {
      return res.status(400).json({ error: "Telefone é obrigatório para ADMIN e TERAPEUTA" });
    }

    // Validação de specialty obrigatório para terapeuta
    if (role === "THERAPIST" && !therapySpecialty) {
      return res.status(400).json({ error: "Especialidade é obrigatória para TERAPEUTA" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        email,
        name,
        age,
        password,
        role,
        phone: phone || null,
        therapySpecialty: therapySpecialty || null,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - deletar usuário
app.delete("/usuarios/:id", async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// ===============================
// ROTAS DE PACIENTES
// ===============================

// Criar paciente
app.post("/pacientes", async (req, res) => {
  try {
    const { name, age, phone, notes } = req.body;

    const newPatient = await prisma.patient.create({
      data: {
        name,
        age,
        phone,
        notes,
        therapistIds: [] // começa sem terapeutas
      },
    });

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos os pacientes
app.get("/pacientes", async (req, res) => {
  try {
    const patients = await prisma.patient.findMany();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar paciente por ID
app.get("/pacientes/:id", async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id },
      include: { therapists: true }
    });

    if (!patient) return res.status(404).json({ error: "Paciente não encontrado" });

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar paciente
app.put("/pacientes/:id", async (req, res) => {
  try {
    const { name, age, phone, notes } = req.body;

    const updated = await prisma.patient.update({
      where: { id: req.params.id },
      data: { name, age, phone, notes },
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar paciente
app.delete("/pacientes/:id", async (req, res) => {
  try {
    await prisma.patient.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({ message: "Paciente deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Associar terapeuta a paciente
app.post("/pacientes/:patientId/terapeutas/:therapistId", async (req, res) => {
  try {
    const { patientId, therapistId } = req.params;

    // adiciona terapeuta no paciente
    await prisma.patient.update({
      where: { id: patientId },
      data: {
        therapistIds: { push: therapistId }
      }
    });

    // adiciona paciente no terapeuta
    await prisma.user.update({
      where: { id: therapistId },
      data: {
        patientIds: { push: patientId }
      }
    });

    res.status(200).json({ message: "Associação criada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remover terapeuta do paciente
app.delete("/pacientes/:patientId/terapeutas/:therapistId", async (req, res) => {
  try {
    const { patientId, therapistId } = req.params;

    // remove terapeuta do paciente
    await prisma.patient.update({
      where: { id: patientId },
      data: {
        therapistIds: {
          set: await removeFromArray(patientId, "patient") // função auxiliar
        }
      }
    });

    // remove paciente do terapeuta
    await prisma.user.update({
      where: { id: therapistId },
      data: {
        patientIds: {
          set: await removeFromArray(therapistId, "user")
        }
      }
    });

    res.status(200).json({ message: "Associação removida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Função auxiliar para remover item das listas
async function removeFromArray(id, type) {
  if (type === "patient") {
    const patient = await prisma.patient.findUnique({ where: { id } });
    return patient.therapistIds.filter(t => t !== id);
  }
  if (type === "user") {
    const user = await prisma.user.findUnique({ where: { id } });
    return user.patientIds.filter(p => p !== id);
  }
}


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
