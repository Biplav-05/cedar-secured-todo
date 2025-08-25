/**
 * Application entry point.
 *
 * - Loads environment variables using dotenv.
 * - Initializes and configures the Express application.
 * - Registers middleware for logging.
 * - Registers routes for user, project, and task resources.
 * - Starts the server on the specified port.
 */

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { requestLogger } from "@app/middleware/logger";
import { logger } from "@utils/logs";
import { successResponse } from "@utils/response";
import { userRoutes, projectRoutes, taskRoutes } from "@app/routes"
dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.APP_PORT as string, 10);

app.use(express.json());
app.use(requestLogger);

if (isNaN(PORT)) {
  logger.error("APP_PORT environment variable is missing or invalid.");
  process.exit(1);
}

app.get("/", (req: Request, res: Response) => {
  successResponse(res, "Hello World from Express + TypeScript!");
});

app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/task", taskRoutes);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
