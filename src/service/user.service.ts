import { db } from "@db-pool";
import { user } from "@database/schema/user";
import { eq } from "drizzle-orm";
import { CustomErrorResponse } from "@app/utils/custom.error.response"
/**
 * -----------
 * Handles all business logic related to users.
 * Interacts directly with the database.
 */
export class UserService {

  /**
   * createUser
   * ----------
   * Creates a new user in the database.
   * Uses a transaction to ensure data consistency.
   * @param data - User data (firstName, lastName, email, password)
   * @returns Message indicating user creation
   */
  static async createUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    try {
      const insertedId = await db.transaction(async (tx) => {
        // Check if email already exists
        const [existingUser] = await tx
          .select()
          .from(user)
          .where(eq(user.email, data.email));

        if (existingUser) {
          // throw new Error("User with same email already exists");
          CustomErrorResponse(['User with same email already exists', 'need to change email'])
        }

        // Insert new user
        return await tx
          .insert(user)
          .values({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
          })
          .$returningId();
      });

      return "New user created";
    } catch (err) {
      console.error("Error creating user:", err);
      throw new Error((err as Error).message || "Failed to create user");
    }
  }

  /**
   * getAllUsers
   * -----------
   * Retrieves all users from the database.
   * @returns Array of user objects
   */
  static async getAllUsers() {
    try {
      return await db.select().from(user);
    } catch (err) {
      console.error("Error fetching users:", err);
      throw new Error("Failed to fetch users");
    }
  }

  /**
   * getUserById
   * -----------
   * Retrieves a single user by ID.
   * @param id - User ID
   * @returns User object or undefined if not found
   */
  static async getUserById(id: number) {
    try {
      const [userRow] = await db.select().from(user).where(eq(user.id, id));
      return userRow;
    } catch (err) {
      console.error(`Error fetching user with ID ${id}:`, err);
      throw new Error("Failed to fetch user");
    }
  }

  /**
   * updateUser
   * ----------
   * Updates an existing user by ID with new data.
   * Uses a transaction to ensure data consistency.
   * @param id - User ID
   * @param data - Partial user data to update
   * @returns Updated user object
   */
  static async updateUser(id: number, data: Partial<{
    firstName: string;
    lastName: string;
    password: string;
  }>) {
    try {
      await db.transaction(async (tx) => {
        await tx.update(user).set(data).where(eq(user.id, id));
      });

      const [updatedUser] = await db.select().from(user).where(eq(user.id, id));
      return updatedUser;
    } catch (err) {
      console.error(`Error updating user with ID ${id}:`, err);
      throw new Error("Failed to update user");
    }
  }

  /**
   * deleteUser
   * ----------
   * Deletes a user by ID.
   * @param id - User ID
   */
  static async deleteUser(id: number): Promise<boolean> {
    try {
      const result = await db.delete(user).where(eq(user.id, id));

      // Safe way to get affected rows
      const affectedRows =
        typeof (result as any).affectedRows === "number" ? (result as any).affectedRows : 0;

      return affectedRows > 0; // true if a user was deleted
    } catch (err) {
      console.error(`Error deleting user with ID ${id}:`, err);
      throw new Error("Failed to delete user");
    }
  }
}
