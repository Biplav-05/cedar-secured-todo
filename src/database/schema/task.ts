import { mysqlTable, int, varchar, timestamp, index, foreignKey } from "drizzle-orm/mysql-core";
import { timestamps } from "./shared";
import { project } from "./project";
import { TaskStatus, TaskPriority, TaskStatusDefault, TaskPriorityDefault } from "./choices";

export const task = mysqlTable(
  "task",
  {
    id: int().autoincrement().primaryKey(),
    projectId: int().notNull(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 500 }).notNull(),
    status: TaskStatus.default(TaskStatusDefault),
    priority: TaskPriority.default(TaskPriorityDefault),
    dueDate: timestamp().notNull(),
    ...timestamps,
  },
  (table) => [
    index("idx_task_projectId").on(table.projectId),
    index("idx_task_status").on(table.status),
    index("idx_task_priority").on(table.priority),
    foreignKey({
      columns: [table.projectId],
      foreignColumns: [project.id],
    }),
  ]
);