import { Router } from "express";
import { TaskController } from "@controller/task.controller";

const taskRoutes = Router();

taskRoutes.post("/", TaskController.create);
taskRoutes.get("/project/:projectId", TaskController.getAllByProject);
taskRoutes.get("/:id", TaskController.getById);
taskRoutes.put("/:id", TaskController.update);
taskRoutes.delete("/:id", TaskController.delete);

export {taskRoutes};
