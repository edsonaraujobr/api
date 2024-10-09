import { prisma } from "../lib/prisma.js";

export const readAllClasses = async (req, res) => {
  try {
    const classes = await prisma.class.findMany();
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar as classes");
  }
};

export const createClass = async (req, res) => {
  try {
    const { name, date_started, date_end, administrator_id } = req.body;

    if (!name || !administrator_id) {
      return res.status(400).send("Parâmetros obrigatórios faltando!");
    }

    await prisma.class.create({
      data: {
        name,
        date_started: date_started ? new Date(date_started) : null,
        date_end: date_end ? new Date(date_end) : null,
        administrator_id,
      }
    });

    res.status(201).send("Classe criado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar a classe");
  }
};

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date_started, date_end, administrator_id } = req.body;

    const existingClass = await prisma.class.findUnique({ where: { id } });

    if (!existingClass) {
      return res.status(404).send("Classe não encontrada");
    }

    await prisma.class.update({
      where: { id },
      data: {
        name,
        date_started: date_started ? new Date(date_started) : existingClass.date_started,
        date_end: date_end ? new Date(date_end) : existingClass.date_end,
        administrator_id,
      }
    });

    res.status(200).send("Classe atualizada com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar a classe");
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const existingClass = await prisma.class.findUnique({ where: { id } });

    if (!existingClass) {
      return res.status(404).send("Classe não encontrada");
    }

    await prisma.class.delete({
      where: { id }
    });

    res.status(200).send("Classe deletada com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao deletar a classe");
  }
};