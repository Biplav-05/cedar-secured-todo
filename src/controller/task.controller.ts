import { Request, Response } from "express";
import { TaskService } from "@service/task.service";

/**
 * TaskController
 * --------------
 * Handles HTTP requests for task-related operations.
 * Delegates business logic to the TaskService layer.
 */
export class TaskController {

  /**
   * create
   * ------
   * Creates a new task using data from the request body.
   * Responds with a simple success message.
   * HTTP Status: 201 on success, 500 on server error.
   */
  static async create(req: Request, res: Response) {
    try {
      await TaskService.createTask(req.body);
      res.status(201).json({ message: "Task created successfully." });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * getAllByProject
   * -----------------
   * Fetches all tasks associated with a specific project by projectId.
   * HTTP Status: 200 on success, 500 on server error.
   */
  static async getAllByProject(req: Request, res: Response) {
    try {
      const tasks = await TaskService.getTasksByProject(Number(req.params.projectId));
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * getById
   * -------
   * Fetches a single task by ID.
   * HTTP Status: 200 on success, 404 if not found, 500 on server error.
   */
  static async getById(req: Request, res: Response) {
    try {
      const task = await TaskService.getTaskById(Number(req.params.id));
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * update
   * ------
   * Updates an existing task by ID with request body data.
   * HTTP Status: 200 on success, 404 if not found, 500 on server error.
   */
  static async update(req: Request, res: Response) {
    try {
      const task = await TaskService.updateTask(Number(req.params.id), req.body);
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * delete
   * ------
   * Deletes a task by ID.
   * Responds with a success message if deleted.
   * HTTP Status: 200 on success, 404 if not found, 500 on server error.
   */
  static async delete(req: Request, res: Response) {
    try {
      const deleted = await TaskService.deleteTask(Number(req.params.id));
      if (!deleted) return res.status(404).json({ error: "Task not found" });
      res.json({ message: "Task deleted" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}
