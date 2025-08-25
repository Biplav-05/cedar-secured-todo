import { mysqlTable, int, varchar, boolean, index, foreignKey } from "drizzle-orm/mysql-core";
import { timestamps } from "./shared";
import { user } from "./user";

export const project = mysqlTable(
  "project",
  {
    id: int().autoincrement().primaryKey(),
    userId: int().notNull(),
    name: varchar({ length: 100 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    activeStatus: boolean().default(true),
    ...timestamps,
  },
  (table) => [
    index("idx_project_user_id").on(table.userId),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
    }),
  ]
);
