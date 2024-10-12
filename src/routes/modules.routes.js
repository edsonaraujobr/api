import express from "express";
import { readAllModules, readModuleById, createModule, updateModule, deleteModule } from "../controllers/modules.controllers.js";
import { authorizeAdmistrator, authorizeStudentAndAdministrator } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.get("/module/readAll", readAllModules);
router.get("/module/read/:id", readModuleById);
router.post("/module/create", createModule);
router.put("/module/update/:id", updateModule);
router.delete("/module/delete/:id", deleteModule);

export default router;
