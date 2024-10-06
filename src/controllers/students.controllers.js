import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const createStudent = async (req, res) => {
  try {
    const { full_name, state, city, email, password, date_birthday, administrator_id, class_id } = req.body;

    if (!full_name || !email || !password || !administrator_id || !class_id ) {
      res.status(400).send("Faltam parâmetros obrigatórios!");
    }


    const alreadyStudent = await prisma.student.findFirst({
      where: { email: email}
    })

    if(alreadyStudent) {
      res.status(400).send("Já existe usuário com este email.")
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.student.create({
      data: {
        full_name,
        state,
        city,
        email,
        password: hashedPassword, 
        date_birthday,
        administrator_id,
        class_id
      }
    });

    res.status(201).send("Estudante criado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar estudante.");
  }
};
