import express from "express";
import { readAllModules, createModule, updateModule, deleteModule } from "../controllers/modules.controllers.js";
import { authorizeAdmistrator, authorizeStudentAndAdministrator } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.post("/module/readAll", readAllModules);
router.post("/module/create", authorizeAdmistrator, createModule);
router.put("/module/update/:id", authorizeAdmistrator, updateModule);
router.delete("/module/delete/:id", authorizeAdmistrator, deleteModule);

export default router;
