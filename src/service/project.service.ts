import { db } from "@db-pool";
import { project } from "@database/schema/project";
import { eq } from "drizzle-orm";

/**
 * ProjectService
 * ----------------
 * Handles all business logic related to projects.
 * Interacts with the database using Drizzle ORM.
 */
export class ProjectService {

  /**
   * createProject
   * -------------
   * Creates a new project in the database.
   * Always returns a simple success message.
   * @param data - Object containing project details (userId, name, description, optional activeStatus)
   * @returns Success message string
   */
  static async createProject(data: {
    userId: number;
    name: string;
    description: string;
    activeStatus?: boolean;
  }): Promise<string> {
    try {
      await db.insert(project).values({
        userId: data.userId,
        name: data.name,
        description: data.description,
        activeStatus: data.activeStatus ?? true,
      });

      return "Project created successfully.";
    } catch (err) {
      console.error("Error creating project:", err);
      throw new Error("Failed to create project");
    }
  }

  /**
   * getProjectsByUser
   * -----------------
   * Fetches all projects associated with a specific user.
   * @param userId - ID of the user
   * @returns Array of project objects
   */
  static async getProjectsByUser(userId: number) {
    try {
      return await db.select().from(project).where(eq(project.userId, userId));
    } catch (err) {
      console.error(`Error fetching projects for user ${userId}:`, err);
      throw new Error("Failed to fetch projects");
    }
  }

  /**
   * getProjectById
   * --------------
   * Fetches a single project by its ID.
   * @param id - Project ID
   * @returns Project object if found, otherwise undefined
   */
  static async getProjectById(id: number) {
    try {
      const [projectRow] = await db.select().from(project).where(eq(project.id, id));
      return projectRow;
    } catch (err) {
      console.error(`Error fetching project with ID ${id}:`, err);
      throw new Error("Failed to fetch project");
    }
  }

  /**
   * updateProject
   * -------------
   * Updates an existing project identified by ID with new data.
   * @param id - Project ID
   * @param data - Partial object containing updated fields (name, description, activeStatus)
   * @returns Updated project object
   */
  static async updateProject(id: number, data: Partial<{
    name: string;
    description: string;
    activeStatus?: boolean;
  }>) {
    try {
      await db.update(project).set(data).where(eq(project.id, id));
      const [updatedProject] = await db.select().from(project).where(eq(project.id, id));
      return updatedProject;
    } catch (err) {
      console.error(`Error updating project with ID ${id}:`, err);
      throw new Error("Failed to update project");
    }
  }

  /**
   * deleteProject
   * -------------
   * Deletes a project by its ID.
   * @param id - Project ID
   * @returns true if a project was deleted, false if no matching project exists
   */
  static async deleteProject(id: number): Promise<boolean> {
    try {
      const result = await db.delete(project).where(eq(project.id, id));

      // Extract number of affected rows safely
      const affectedRows = typeof (result as any).affectedRows === "number"
        ? (result as any).affectedRows
        : (result as any).rowCount ?? 0;

      return affectedRows > 0;
    } catch (err) {
      console.error(`Error deleting project with ID ${id}:`, err);
      throw new Error("Failed to delete project");
    }
  }
}
