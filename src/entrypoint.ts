/**
 * Application entry point.
 *
 * - Loads environment variables using dotenv.
 * - Initializes and configures the Express application.
 * - Registers core routes for user, project, and task resources.
 * - Starts the server on the specified port.
 */

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "@routes/user.route.js";
import projectRoutes from "@routes/project.route.js";
import taskRoutes from "@routes/task.route.js";

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.APP_PORT as string, 10);
app.use(express.json());

if (isNaN(PORT)) {
  throw new Error("APP_PORT environment variable is missing or invalid.");
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from Express + TypeScript!");
});

// Route registrations
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/task", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
