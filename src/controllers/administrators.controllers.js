import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

const saltRounds = 10;
dotenv.config();
const SECRET = process.env.SECRET;

export const readAdministrators = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const administrator = await prisma.administrator.findUnique({
        where: { id },
      });

      if (!administrator) {
        return res.status(404).send("Administrador não encontrado");
      }

      return res.status(200).json(administrator);
    }

    const administrators = await prisma.administrator.findMany();
    res.status(200).json(administrators);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar administradores");
  }
};

export const readAdministratorsByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const administrator = await prisma.administrator.findUnique({
        where: { id },
      });

      if (!administrator) {
        return res.status(404).send("Administrador não encontrado");
      }

      return res.status(200).json(administrator);
    }

    const administrators = await prisma.administrator.findMany();
    res.status(200).json(administrators);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar administradores");
  }
};

export const loginAdministrator = async (req, res) => {
  try {
    const { email, password } = req.body;

    const administrator = await prisma.administrator.findFirst({
      where: { email }
    });

    if (!administrator) {
      return res.status(404).json({ message: "Administrador não encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, administrator.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Administrador não encontrado" });
    }

    const token = jwt.sign(
      {
        id: administrator.id,
        name: administrator.full_name,
        email: administrator.email,
        role: 'administrator'
      },
      SECRET,
      { expiresIn: '4h' }
    );

    res.status(200).json({
      message: "Login realizado com sucesso!",
      token,
      id: administrator.id 
    });  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao realizar login" });
  }
};


export const createAdministrator = async (req, res) => {
  try {
    const { full_name, email, date_birthday, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).send("Faltam parâmetros obrigatórios!");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const alreadyAdministrator = await prisma.administrator.findFirst({
      where: { email }
    });

    if (alreadyAdministrator) {
      return res.status(409).send("Já existe usuário com este email."); 
    }

    await prisma.administrator.create({
      data: {
        full_name,
        email,
        password: hashedPassword,
        date_birthday: new Date(date_birthday),
      }
    });

    res.status(201).send("Administrador criado com sucesso!"); 
  } catch (error) {
    console.error(error); 
    res.status(500).send("Erro ao criar administrador");
  }
};

export const updateAdministrator = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, date_birthday, password } = req.body;

    const administrator = await prisma.administrator.findUnique({
      where: { id }
    });

    if (!administrator) {
      return res.status(404).send("Administrador não encontrado");
    }

    const updatedData = {
      full_name,
      email,
      date_birthday: new Date(date_birthday),
    };

    if (password) {
      updatedData.password = await bcrypt.hash(password, saltRounds);
    }

    await prisma.administrator.update({
      where: { id },
      data: updatedData,
    });

    res.status(200).send("Administrador atualizado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar administrador");
  }
};

export const deleteAdministrator = async (req, res) => {
  try {
    const { id } = req.params;

    const administrator = await prisma.administrator.findUnique({
      where: { id }
    });

    if (!administrator) {
      return res.status(404).send("Administrador não encontrado");
    }

    await prisma.administrator.delete({
      where: { id},
    });

    res.status(200).send("Administrador excluído com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao excluir administrador");
  }
};
