import express from "express";
import { createStudent } from "../controllers/students.controllers.js";

const router = express.Router();

router.post("/student/create", createStudent);

export default router;
