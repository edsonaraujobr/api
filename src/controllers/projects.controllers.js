import { prisma } from "../lib/prisma.js";

export const readAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar os projetos");
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, date, description, link_github, student_id } = req.body;

    if (!name || !date || !student_id) {
      return res.status(400).send("Parâmetros obrigatórios faltando!");
    }

    const existingStudent = await prisma.student.findUnique({ where: { id: student_id } });
    if (!existingStudent) {
      return res.status(404).send("Estudante não encontrado");
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).send("Data inválida.");
    }

    await prisma.project.create({
      data: {
        name,
        description,
        date: parsedDate,
        student_id,
        link_github
      }
    });

    res.status(201).send("Projeto criado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar projeto");
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, description, link_github, student_id, rate } = req.body;

    const existingProject = await prisma.project.findUnique({ where: { id } });

    if (!existingProject) {
      return res.status(404).send("Projeto não encontrado");
    }

    const updatedData = {
      name,
      description,
      link_github,
      student_id,
    };

    if (date) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).send("Data inválida.");
      }
      updatedData.date = parsedDate;
    }

    if (req.user.role === 'administrator' && rate !== undefined) {
      updatedData.rate = rate;
  }

    await prisma.project.update({
      where: { id },
      data: updatedData,
    });

    res.status(200).send("Projeto atualizado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar projeto");
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProject = await prisma.project.findUnique({ where: { id } });

    if (!existingProject) {
      return res.status(404).send("Projeto não encontrado");
    }

    await prisma.project.delete({
      where: { id }
    });

    res.status(200).send("Projeto deletado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao deletar o projeto");
  }
};
