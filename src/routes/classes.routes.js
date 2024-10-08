import express from "express";
import { readAllClasses, createClass, updateClass, deleteClass } from "../controllers/classes.controllers.js";
import { authorizeAdmistrator, authorizeStudentAndAdministrator } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.get("/class/read", readAllClasses);
router.post("/class/create", createClass);
router.put("/class/update/:id", updateClass);
router.delete("/class/delete/:id", deleteClass);

export default router;
