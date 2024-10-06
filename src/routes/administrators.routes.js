import express from "express";
import { loginAdministrator, createAdministrator, updateAdministrator, deleteAdministrator } from "../controllers/administrators.controllers.js";
import { authorizeAdmistrator } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.post("/administrator/login", loginAdministrator);
router.post("/administrator/create", createAdministrator);
router.post("/administrator/update/:id", authorizeAdmistrator, updateAdministrator);
router.post("/administrator/delete/:id", authorizeAdmistrator, deleteAdministrator);

export default router;
