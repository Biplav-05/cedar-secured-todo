import { Router } from "express";
import { ProjectController } from "@controller/project.controller";

const projectRoutes = Router();

projectRoutes.post("/", ProjectController.create);
projectRoutes.get("/user/:userId", ProjectController.getAllByUser);
projectRoutes.get("/:id", ProjectController.getById);
projectRoutes.put("/:id", ProjectController.update);
projectRoutes.delete("/:id", ProjectController.delete);

export {projectRoutes};
