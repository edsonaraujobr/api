import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

const saltRounds = 10;
dotenv.config();
const SECRET = process.env.SECRET;

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await prisma.student.findFirst({
      where: { email }
    });

    if (!student) {
      return res.status(404).send("Estudante não encontrado");
    }

    const passwordMatch = await bcrypt.compare(password, student.password);

    if (!passwordMatch) {
      return res.status(401).send("Senha incorreta");
    }

    if (student.isAccepted === false) {
      return res.status(401).send("Estudante ainda não aceito");
    }

    const token = jwt.sign(
      {
        name: student.full_name,
        email: student.email,
        role: 'student'
      },
      SECRET,
      { expiresIn: '4h' }
    );

    res.status(200).json({ message: "Login realizado com sucesso!", token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao realizar login");
  }
};

export const createStudent = async (req, res) => {
  try {
    const { full_name, email, password, date_birthday, administrator_id, class_id } = req.body;

    if (!full_name || !email || !password || !administrator_id || !class_id) {
      return res.status(400).send("Faltam parâmetros obrigatórios!");
    }

    const alreadyStudent = await prisma.student.findFirst({
      where: { email }
    });

    if (alreadyStudent) {
      return res.status(400).send("Já existe estudante com este email.");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.student.create({
      data: {
        full_name,
        email,
        password: hashedPassword,
        date_birthday: new Date(date_birthday), 
        administrator_id,
        class_id
      }
    });

    res.status(201).send("Estudante criado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar estudante");
  }
};

export const readStudents = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const student = await prisma.student.findUnique({
        where: { id: Number(id) },
      });

      if (!student) {
        return res.status(404).send("Estudante não encontrado");
      }

      return res.status(200).json(student);
    }

    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar estudantes");
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params; 

    const { full_name, email, date_birthday, password, isAccepted } = req.body;

    const student = await prisma.student.findUnique({
      where: { id }
    });

    if (!student) {
      return res.status(404).send("Estudante não encontrado");
    }

    const updatedData = {
      full_name,
      email,
      date_birthday
    };

    if (password) {
      updatedData.password = await bcrypt.hash(password, saltRounds);
    }

    if (typeof isAccepted !== 'undefined' && req.user?.role === 'administrator') {
      updatedData.isAccepted = isAccepted; 
    }

    await prisma.student.update({
      where: { id },
      data: updatedData,
    });

    res.status(200).send("Estudante atualizado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar estudante");
  }
};



export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id: id}
    });

    if (!student) {
      return res.status(404).send("Estudante não encontrado");
    }

    await prisma.student.delete({
      where: { id: id },
    });

    res.status(200).send("Estudante excluído com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao excluir estudante");
  }
};
