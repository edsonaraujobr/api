import express from "express";
import { readAllModules, createModule, updateModule, deleteModule } from "../controllers/modules.controllers.js";
import { authorizeAdmistrator, authorizeStudentAndAdministrator } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.get("/module/readAll", readAllModules);
router.post("/module/create", createModule);
router.put("/module/update/:id", updateModule);
router.delete("/module/delete/:id", deleteModule);

export default router;
