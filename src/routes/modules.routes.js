import express from "express";
import { readAllModules, readModuleById, createModule, updateModule, deleteModule } from "../controllers/modules.controllers.js";
import { authorizeAdmistrator, authenticateJWT } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.get("/module/read", readAllModules);
router.get("/module/readByID/:id", readModuleById);
router.post("/module/create", authenticateJWT, authorizeAdmistrator, createModule);
router.put("/module/update/:id", authenticateJWT, authorizeAdmistrator, updateModule);
router.delete("/module/delete/:id", authenticateJWT, authorizeAdmistrator, deleteModule);

export default router;
