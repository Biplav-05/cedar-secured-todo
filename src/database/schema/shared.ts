import { timestamp } from "drizzle-orm/mysql-core";

export const timestamps = {
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
};
