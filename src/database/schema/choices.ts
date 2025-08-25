/**
 * Task-related enums and choices configuration for the application.
 *
 * - Defines MySQL enum types for task status and priority using Drizzle ORM.
 * - Provides choice mappings for UI labels and future use.
 * - Exports TypeScript types for status and priority based on the defined choices.
 * - Sets default values for task status and priority.
 *
 * Exports:
 * - TaskStatus: MySQL enum for task status.
 * - TaskPriority: MySQL enum for task priority.
 * - TaskStatusChoices: Array of status choices with labels for UI or mapping.
 * - TaskPriorityChoices: Array of priority choices with labels for UI or mapping.
 * - TaskStatusType: TypeScript type for task status values.
 * - TaskPriorityType: TypeScript type for task priority values.
 * - TaskStatusDefault: Default task status.
 * - TaskPriorityDefault: Default task priority.
 */

import { mysqlEnum } from "drizzle-orm/mysql-core";

export const TaskStatus = mysqlEnum("task_status", ["todo", "pending", "in_progress", "completed"]);
export const TaskPriority = mysqlEnum("task_priority", ["low", "medium", "high"]);

// TODO will be used in future for mapping choices
export const TaskStatusChoices = [
  { value: "todo", label: "To-Do" },
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In-Progress" },
  { value: "completed", label: "Completed" },
] as const;

export const TaskPriorityChoices = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] as const;


export type TaskStatusType = typeof TaskStatusChoices[number]["value"];
export type TaskPriorityType = typeof TaskPriorityChoices[number]["value"];

export const TaskStatusDefault: TaskStatusType = TaskStatusChoices[0].value;
export const TaskPriorityDefault: TaskPriorityType = TaskPriorityChoices[0].value;