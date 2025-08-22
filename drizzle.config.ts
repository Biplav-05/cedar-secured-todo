
/**
 * Drizzle ORM configuration file.
 *
 * - Loads environment variables using dotenv to securely manage DB credentials.
 * - Defines the path to schema definitions and migration output folder.
 * - Specifies the database dialect (e.g., MySQL, PostgreSQL) based on environment variable.
 * - Provides database connection details including host, user, password, and database name.
 * - Enforces `snake_case` naming convention for generated database objects.
 *
 * Export:
 * - Default configuration object for Drizzle ORM, used by CLI and migration tools.
 */

import dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/database/schema",
  out: "./src/database/migration",
  dialect: process.env.DB_VENDOR,
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  casing: "snake_case",
};
