/**
 * Database configuration and connection setup using MySQL2 with Drizzle ORM.
 *
 * - Loads environment variables using dotenv for secure database credentials.
 * - Creates a MySQL connection pool with the given host, user, password, and database.
 * - Initializes Drizzle ORM with the connection pool to provide a strongly-typed
 *   query builder and ORM interface.
 *
 * Export:
 * - `db`: An instance of Drizzle ORM bound to the MySQL connection pool, 
 *   which can be used throughout the application to perform queries.
 */

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import * as tables from "@database/schema";

dotenv.config();
const connection = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const db = drizzle(connection,{
    schema:{
      ...tables
    },
    casing: 'snake_case',
    mode: 'default'
});