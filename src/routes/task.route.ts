import { Router } from "express";
import { TaskController } from "@controller/task.controller";

const router = Router();

router.post("/", TaskController.create);
router.get("/project/:projectId", TaskController.getAllByProject);
router.get("/:id", TaskController.getById);
router.put("/:id", TaskController.update);
router.delete("/:id", TaskController.delete);

export default router;
