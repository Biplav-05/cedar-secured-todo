import { Router } from "express";
import { UserController as user } from "@controller/user.controller";

const userRoutes = Router();

userRoutes.post("/signup", user.create);
userRoutes.get("/", user.getAll);
userRoutes.get("/:id", user.getById);
userRoutes.put("/:id", user.update);
userRoutes.delete("/:id", user.delete);

export  {userRoutes};