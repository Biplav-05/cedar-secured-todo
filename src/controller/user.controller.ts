import { Request, Response } from "express";
import { UserService } from "@service/user.service";
import { successResponse, errorResponse } from "@utils/response";

/**
 * Handles HTTP requests for user-related operations
 */
export class UserController {

  /**
   * Create a new user
   */
  static async create(req: Request, res: Response) {
    const result = await UserService.createUser(req.body);

    if (result.error) {
      return errorResponse(res, result.error, result.error.statusCode);
    }

    // Successful response
    return successResponse(res, "User Created", 201);
  }

  /**
   * Get all users
   */
  static async getAll(req: Request, res: Response) {
    const result = await UserService.getAllUsers();

    if (result.error) {
      return errorResponse(res, result.error, result.error.statusCode);
    }

    return successResponse(res, result.instance);
  }

  /**
   * Get user by ID
   */
  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await UserService.getUserById(id);

    if (result.error) {
      return errorResponse(res, result.error, result.error.statusCode);
    }

    return successResponse(res, result.instance);
  }

  /**
   * Update a user
   */
  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await UserService.updateUser(id, req.body);

    if (result.error) {
      return errorResponse(res, result.error, result.error.statusCode);
    }

    return successResponse(res, "User's data u[dated.");
  }

  /**
   * Delete a user
   */
  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await UserService.deleteUser(id);

    if (result.error) {
      return errorResponse(res, result.error, result.error.statusCode);
    }

    return successResponse(res, { message: "User deleted successfully" });
  }
}
