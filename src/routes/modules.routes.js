import express from "express";
import { readAllModules, readModuleById, createModule, updateModule, deleteModule } from "../controllers/modules.controllers.js";
import { authorizeAdmistrator, authorizeStudentAndAdministrator } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.get("/module/read", readAllModules);
router.get("/module/readByID/:id", readModuleById);
router.post("/module/create", authorizeAdmistrator, createModule);
router.put("/module/update/:id", authorizeAdmistrator, updateModule);
router.delete("/module/delete/:id", authorizeAdmistrator, deleteModule);

export default router;
