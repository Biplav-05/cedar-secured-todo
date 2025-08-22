import { Request, Response } from "express";
import { UserService } from "@service/user.service";

/**
 * ---------------
 * Handles HTTP requests for user-related operations.
 * Delegates business logic to the UserService layer.
 */
export class UserController {
  /**
   * ------
   * Creates a new user using data from the request body.
   * Responds with the created user object.
   * HTTP Status: 201 on success, 500 on server error.
   */
  static async create(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * ------
   * Fetches all users from the database.
   * Responds with an array of users.
   * HTTP Status: 200 on success, 500 on server error.
   */
  static async getAll(_req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * -------
   * Fetches a single user by ID from the request parameters.
   * Responds with the user object if found.
   * HTTP Status: 200 on success, 404 if not found, 500 on server error.
   */
  static async getById(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(Number(req.params.id));
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * ------
   * Updates an existing user identified by ID with request body data.
   * Responds with the updated user object.
   * HTTP Status: 200 on success, 404 if not found, 500 on server error.
   */
  static async update(req: Request, res: Response) {
    try {
      const user = await UserService.updateUser(Number(req.params.id), req.body);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  /**
   * ------
   * Deletes a user by ID from the request parameters.
   * Responds with a success message if deleted.
   * HTTP Status: 200 on success, 404 if not found, 500 on server error.
   */
  static async delete(req: Request, res: Response) {
    try {
      const deleted = await UserService.deleteUser(Number(req.params.id));

      if (!deleted) return res.status(404).json({ error: "User not found" });

      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(4).json({ error: (err as Error).message });
    }
}
}
