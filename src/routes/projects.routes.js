import express from "express";
import { readAllProjects, createProject, updateProject, deleteProject } from "../controllers/projects.controllers.js";
import { authorizeStudentAndAdministrator, authorizeStudent, authenticateJWT } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.get("/project/read", readAllProjects);
router.post("/project/create", authenticateJWT, authorizeStudent, createProject);
router.put("/project/update/:id", authenticateJWT, authorizeStudentAndAdministrator, updateProject);
router.delete("/project/delete/:id", authenticateJWT, authorizeStudentAndAdministrator, deleteProject);

export default router;
