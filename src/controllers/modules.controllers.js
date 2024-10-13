import { prisma } from "../lib/prisma.js";

export const readAllModules = async (req, res) => {
  try {
    const modules = await prisma.module.findMany();
    res.status(200).json(modules);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar os módulos");
  }
};

export const readModuleById = async (req, res) => {
  try {
    const { id } = req.params;
    const moduleItem = await prisma.module.findUnique({ where: { id } });

    if (!moduleItem) {
      return res.status(404).send("Módulo não encontrado");
    }

    res.status(200).json(moduleItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar o módulo");
  }
};


export const createModule = async (req, res) => {
  try {
    const { name, description, administrator_id, class_id } = req.body;

    if (!name || !administrator_id || !class_id) {
      return res.status(400).send("Parâmetros obrigatórios faltando!");
    }

    await prisma.module.create({
      data: {
        name,
        description,
        administrator_id,
        class_id
      }
    });

    res.status(201).send("Módulo criado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar módulo");
  }
};

export const updateModule = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, administrator_id, class_id } = req.body;

    const existingModule = await prisma.module.findUnique({ where: { id } });

    if (!existingModule) {
      return res.status(404).send("Módulo não encontrado");
    }

    await prisma.module.update({
      where: { id },
      data: {
        name,
        description,
        class_id,
        administrator_id
      }
    });

    res.status(200).send("Modulo atualizado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar módulo");
  }
};

export const deleteModule = async (req, res) => {
  try {
    const { id } = req.params;

    const existingModule = await prisma.module.findUnique({ where: { id } });

    if (!existingModule) {
      return res.status(404).send("Módulo não encontrada");
    }

    await prisma.module.delete({
      where: { id }
    });

    res.status(200).send("Módulo deletado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao deletar a módulo");
  }
};
