import { Response } from "express";

/**
 * ----------------------------------------------------------------------
 * Success Response Utility
 * ----------------------------------------------------------------------
 * Sends a standardized success response to the client.
 *
 * Features:
 * - Wraps any type of data (object, array, or string message) inside `data`.
 * - Default HTTP status code is 200, can be overridden at runtime.
 *
 * @param res - Express Response object
 * @param data - Response payload (object, array, or string)
 * @param statusCode - Optional HTTP status code (default: 200)
 * @returns Express JSON response
 */
export const successResponse = (
  res: Response,
  data: any,
  statusCode = 200
) => {
  return res.status(statusCode).json({ data });
};

/**
 * ----------------------------------------------------------------------
 * Error Response Utility
 * ----------------------------------------------------------------------
 * Sends a standardized error response to the client.
 *
 * Features:
 * - Expects an error object containing at least a `message` property.
 * - Returns the message inside `data.message`.
 * - Default HTTP status code is 400, can be overridden at runtime.
 *
 * @param res - Express Response object
 * @param error - Error object with `message` property
 * @param statusCode - Optional HTTP status code (default: 400)
 * @returns Express JSON response
 */
export const errorResponse = (
  res: Response,
  error: { message: string },
  statusCode = 400
) => {
  return res.status(statusCode).json({
    data: { message: error.message }
  });
};
