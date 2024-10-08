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

    await prisma.project.create({
      data: {
        name,
        description,
        date: new Date(date),
        student_id,
        link_github
      }
    });

    res.status(201).send("Projeto criado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar o projeto");
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, description, link_github, student_id, rate } = req.body;

    const existingProject = await prisma.project.findUnique({ where: { id: Number(id) } });

    if (!existingProject) {
      return res.status(404).send("Projeto não encontrado");
    }

    const updatedData = {
      name,
      date: date ? new Date(date) : existingProject.date,
      description,
      link_github,
      student_id
    };

    if (req.user.role === 'administrator' && rate !== undefined) {
      updatedData.rate = rate;
    }

    await prisma.project.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    res.status(200).send("Projeto atualizado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar o projeto");
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProject = await prisma.project.findUnique({ where: { id: id } });

    if (!existingProject) {
      return res.status(404).send("Projeto não encontrado");
    }

    await prisma.project.delete({
      where: { id: id }
    });

    res.status(200).send("Projeto deletado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao deletar o projeto");
  }
};
