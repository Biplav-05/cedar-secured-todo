/**
 * Request/Response logging middleware.
 *
 * - Logs every incoming HTTP request.
 * - Logs the response status code and response time after completion.
 * - Uses Winston for structured logging.
 *
 * Example log:
 * ```
 * 2025-08-25T16:10:32.456Z [info]: => GET /user/123
 * 2025-08-25T16:10:32.470Z [info]: => GET /user/123 200 - 14ms
 * ```
 */

import { Request, Response, NextFunction } from "express";
import { logger } from "@utils/logs";

/**
 * Middleware to log HTTP requests and responses.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Function to pass control to the next middleware
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  logger.info(`=> ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`⬅️  ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
};
