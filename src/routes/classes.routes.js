import express from "express";
import { readAllClasses, readClassById, createClass, updateClass, deleteClass } from "../controllers/classes.controllers.js";
import { authorizeAdmistrator } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.get("/class/read", readAllClasses);
router.get("/class/readByID/:id", readClassById); 
router.post("/class/create", authorizeAdmistrator, createClass);
router.put("/class/update/:id", authorizeAdmistrator, updateClass);
router.delete("/class/delete/:id", authorizeAdmistrator, deleteClass);

export default router;
