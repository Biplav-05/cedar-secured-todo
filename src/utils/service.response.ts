/**
 * ----------------------------------------------------------------------
 * CustomServiceError
 * ----------------------------------------------------------------------
 * Generic error class for service layer operations.
 *
 * Features:
 * - Allows passing a descriptive error message.
 * - Optional HTTP status code (default: 400).
 * - Can be returned from service methods as part of ServiceResult.
 *
 * Example usage:
 * ```ts
 * return { error: new CustomServiceError("User not found", 404) };
 * ```
 */
export class CustomServiceError {
  message: string;
  statusCode: number;

  /**
   * @param message - Error description
   * @param statusCode - HTTP status code (default: 400)
   */
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

/**
 * ----------------------------------------------------------------------
 * ServiceResult<T>
 * ----------------------------------------------------------------------
 * Generic interface representing the result of a service layer operation.
 *
 * Properties:
 * - `instance` - The successful result (optional)
 * - `error` - A CustomServiceError instance if operation failed (optional)
 *
 * Example usage:
 * ```ts
 * const result: ServiceResult<User> = await UserService.createUser(data);
 * if (result.error) { ... }
 * else { console.log(result.instance); }
 * ```
 */
export interface ServiceResult<T> {
  instance?: T;
  error?: CustomServiceError;
}
