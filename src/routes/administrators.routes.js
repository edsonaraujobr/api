import express from "express";
import { loginAdministrator, createAdministrator, updateAdministrator, deleteAdministrator, readAdministrators, readAdministratorsByID } from "../controllers/administrators.controllers.js";
import { authorizeAdmistrator } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.get("/administrator/read", readAdministrators);
router.get("/administrator/readByID/:id", readAdministratorsByID);
router.post("/administrator/login", loginAdministrator);
router.post("/administrator/create", createAdministrator);
router.put("/administrator/update/:id", authorizeAdmistrator, updateAdministrator);
router.delete("/administrator/delete/:id", authorizeAdmistrator, deleteAdministrator);

export default router;
