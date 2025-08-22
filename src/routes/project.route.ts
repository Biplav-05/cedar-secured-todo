import { Router } from "express";
import { ProjectController } from "@controller/project.controller";

const router = Router();

router.post("/", ProjectController.create);
router.get("/user/:userId", ProjectController.getAllByUser);
router.get("/:id", ProjectController.getById);
router.put("/:id", ProjectController.update);
router.delete("/:id", ProjectController.delete);

export default router;
