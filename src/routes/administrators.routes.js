import express from "express";
import { loginAdministrator, createAdministrator, updateAdministrator, deleteAdministrator } from "../controllers/administrators.controllers.js";

const router = express.Router();

router.post("/administrator/login", loginAdministrator);
router.post("/administrator/create", createAdministrator);
router.post("/administrator/update/:id", updateAdministrator);
router.post("/administrator/delete/:id", deleteAdministrator);

export default router;
