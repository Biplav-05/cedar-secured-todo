import { mysqlTable, int, varchar, uniqueIndex, boolean } from "drizzle-orm/mysql-core";
import { timestamps } from "./shared";

export const user = mysqlTable(
  "user",
  {
    id: int().autoincrement().primaryKey(),
    firstName: varchar({ length: 55 }).notNull(),
    lastName: varchar({ length: 55 }).notNull(),
    isActive: boolean().default(true),
    email: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("email_unique_idx").on(table.email),
  ]
);