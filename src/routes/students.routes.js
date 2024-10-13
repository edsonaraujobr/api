import express from "express";
import { loginStudent, createStudent, updateStudent, deleteStudent, readStudents, readStudentsByID   } from "../controllers/students.controllers.js";
import { authorizeStudentAndAdministrator, authorizeAdmistrator } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.get("/student/read", readStudents);
router.get("/student/readbyID/:id", readStudentsByID);
router.post("/student/login", loginStudent);
router.post("/student/create", createStudent);
router.put("/student/update/:id", authorizeStudentAndAdministrator, updateStudent);
router.delete("/student/delete/:id",authorizeAdmistrator, deleteStudent);

export default router;
