import express from "express";
import { loginAdministrator, createAdministrator, updateAdministrator, deleteAdministrator, readAdministrators } from "../controllers/administrators.controllers.js";
import { authorizeAdmistrator } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.get("/administrator/read", readAdministrators);
router.post("/administrator/login", loginAdministrator);
router.post("/administrator/create", createAdministrator);
router.put("/administrator/update/:id", updateAdministrator);
router.delete("/administrator/delete/:id", deleteAdministrator);

export default router;
