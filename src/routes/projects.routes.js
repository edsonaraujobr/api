import express from "express";
import { readAllProjects, createProject, updateProject, deleteProject } from "../controllers/projects.controllers.js";
import { authorizeStudentAndAdministrator, authorizeStudent } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.get("/project/readAll", readAllProjects);
router.post("/project/create", createProject);
router.put("/project/update/:id", updateProject);
router.delete("/project/delete/:id", deleteProject);

export default router;
