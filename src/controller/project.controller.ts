import { Request, Response } from "express";
import { ProjectService } from "@service/project.service";

/**
 * ProjectController
 * -----------------
 * Handles HTTP requests for project-related operations.
 * Delegates business logic to the ProjectService layer.
 */
export class ProjectController {
  /**
   * create
   * ------
   * Creates a new project using data from the request body.
   * Responds with the created project object.
   * HTTP Status: 201 on success, 500 on server error.
   */
  static async create(req: Request, res: Response) {
    try {
      const project = await ProjectService.createProject(req.body);
      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * getAllByUser
   * ------------
   * Fetches all projects for a specific user by userId.
   * Responds with an array of projects.
   * HTTP Status: 200 on success, 500 on server error.
   */
  static async getAllByUser(req: Request, res: Response) {
    try {
      const projects = await ProjectService.getProjectsByUser(Number(req.params.userId));
      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * getById
   * -------
   * Fetches a single project by ID.
   * Responds with the project object if found.
   * HTTP Status: 200 on success, 404 if not found, 500 on server error.
   */
  static async getById(req: Request, res: Response) {
    try {
      const project = await ProjectService.getProjectById(Number(req.params.id));
      if (!project) return res.status(404).json({ error: "Project not found" });
      res.json(project);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * update
   * ------
   * Updates an existing project by ID with request body data.
   * Responds with the updated project object.
   * HTTP Status: 200 on success, 404 if not found, 500 on server error.
   */
  static async update(req: Request, res: Response) {
    try {
      const project = await ProjectService.updateProject(Number(req.params.id), req.body);
      if (!project) return res.status(404).json({ error: "Project not found" });
      res.json(project);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * delete
   * ------
   * Deletes a project by ID.
   * Responds with a success message if deleted.
   * HTTP Status: 200 on success, 404 if not found, 500 on server error.
   */
  static async delete(req: Request, res: Response) {
    try {
      const deleted = await ProjectService.deleteProject(Number(req.params.id));
      if (!deleted) return res.status(404).json({ error: "Project not found" });
      res.json({ message: "Project deleted" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}
