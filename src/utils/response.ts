import { Response } from "express";

/**
 * Sends a standardized success response
 */
export const successResponse = (
  res: Response,
  data: any,
  statusCode = 200
) => {
  return res.status(statusCode).json({ data });
};

/**
 * Sends a standardized error response
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
