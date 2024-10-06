import express from "express";
import { readAllClasses, createClass, updateClass, deleteClass } from "../controllers/classes.controllers.js";
import { authorizeAdmistrator, authorizeStudentAndAdministrator } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.post("/class/readAll", readAllClasses);
router.post("/class/create", authorizeAdmistrator, createClass);
router.put("/class/update/:id", authorizeAdmistrator, updateClass);
router.delete("/class/delete/:id", authorizeAdmistrator, deleteClass);

export default router;
