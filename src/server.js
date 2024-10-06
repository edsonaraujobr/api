import express from "express";
import cors from "cors";
import students from "./routes/students.routes.js";
import administrators from "./routes/administrators.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", students);
app.use("/", administrators);

app.listen('3030', () => {
    console.log("Running on port 3030");
});