import { db } from "@db-pool";
import { task } from "@database/schema/task";
import { eq } from "drizzle-orm";
import {
  TaskStatusType,
  TaskPriorityType,
  TaskStatusDefault,
  TaskPriorityDefault,
} from "@database/schema/choices";

/**
 * -----------
 * Handles all business logic related to tasks.
 * Interacts with the database using Drizzle ORM.
 */
export class TaskService {

  /**
   * createTask
   * ----------
   * Creates a new task in the database.
   * Always returns a simple success message.
   * @param data - Object containing task details
   * @returns Success message string
   */
  static async createTask(data: {
    projectId: number;
    title: string;
    description: string;
    status?: TaskStatusType;
    priority?: TaskPriorityType;
    dueDate: Date;
  }): Promise<string> {
    try {
      await db.insert(task).values({
        projectId: data.projectId,
        title: data.title,
        description: data.description,
        status: data.status ?? TaskStatusDefault,
        priority: data.priority ?? TaskPriorityDefault,
        dueDate: data.dueDate,
      });

      return "Task created successfully.";
    } catch (err) {
      console.error("Error creating task:", err);
      throw new Error("Failed to create task");
    }
  }

  /**
   * getTasksByProject
   * -----------------
   * Fetches all tasks associated with a specific project.
   * @param projectId - Project ID
   * @returns Array of task objects
   */
  static async getTasksByProject(projectId: number) {
    try {
      return await db.select().from(task).where(eq(task.projectId, projectId));
    } catch (err) {
      console.error(`Error fetching tasks for project ${projectId}:`, err);
      throw new Error("Failed to fetch tasks");
    }
  }

  /**
   * getTaskById
   * -----------
   * Fetches a single task by its ID.
   * @param id - Task ID
   * @returns Task object if found, otherwise undefined
   */
  static async getTaskById(id: number) {
    try {
      const [taskRow] = await db.select().from(task).where(eq(task.id, id));
      return taskRow;
    } catch (err) {
      console.error(`Error fetching task with ID ${id}:`, err);
      throw new Error("Failed to fetch task");
    }
  }

  /**
   * updateTask
   * ----------
   * Updates an existing task by ID with new data.
   * @param id - Task ID
   * @param data - Partial object containing updated fields
   * @returns Updated task object
   */
  static async updateTask(id: number, data: Partial<{
    title: string;
    description: string;
    status?: TaskStatusType;
    priority?: TaskPriorityType;
    dueDate: Date;
  }>) {
    try {
      await db.update(task).set(data).where(eq(task.id, id));
      const [updatedTask] = await db.select().from(task).where(eq(task.id, id));
      return updatedTask;
    } catch (err) {
      console.error(`Error updating task with ID ${id}:`, err);
      throw new Error("Failed to update task");
    }
  }

  /**
   * deleteTask
   * ----------
   * Deletes a task by its ID.
   * @param id - Task ID
   * @returns true if a task was deleted, false if no matching task exists
   */
  static async deleteTask(id: number): Promise<boolean> {
    try {
      const result = await db.delete(task).where(eq(task.id, id));

      // Extract number of affected rows safely
      const affectedRows = typeof (result as any).affectedRows === "number"
        ? (result as any).affectedRows
        : (result as any).rowCount ?? 0;

      return affectedRows > 0;
    } catch (err) {
      console.error(`Error deleting task with ID ${id}:`, err);
      throw new Error("Failed to delete task");
    }
  }
}
