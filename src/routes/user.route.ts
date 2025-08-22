import { Router } from "express";
import { UserController as user } from "@controller/user.controller";


const router = Router();


router.post("/signup", user.create);
router.get("/", user.getAll);
router.get("/:id", user.getById);
router.put("/:id", user.update);
router.delete("/:id", user.delete);

export default router;
