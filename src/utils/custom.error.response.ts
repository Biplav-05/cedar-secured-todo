import {ErrorResponse} from "@utils/error.formatter"

// Helper function
export function CustomErrorResponse(message: string | string[], statusCode?: number) {
  throw new ErrorResponse(message, statusCode);
}