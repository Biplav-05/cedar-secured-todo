/**
 * CustomError
 *
 * - Generic error class for all service errors
 * - Can pass message and optional HTTP status code
 */
export class CustomServiceError {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export interface ServiceResult<T> {
  instance?: T;
  error?: CustomServiceError;
}