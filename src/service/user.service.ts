import { db } from "@db-pool";
import { user } from "@database/schema/user";
import { eq } from "drizzle-orm";
import { CustomServiceError as CustomError, ServiceResult } from "@utils/service.response";

/**
 * UserService
 * -----------
 * Handles all business logic for users.
 * Returns ServiceResult objects: { instance, error }.
 */
export class UserService {

  /**
   * createUser
   * ----------
   * Creates a new user in the database.
   */
  static async createUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<ServiceResult<{ id: number; firstName: string; lastName: string; email: string }>> {
  try {
    const result = await db.transaction(async (tx) => {
      const [existingUser] = await tx
        .select()
        .from(user)
        .where(eq(user.email, data.email));

      if (existingUser) {
        return { error: new CustomError("User with same email already exists", 400) };
      }

      const [inserted] = await tx
        .insert(user)
        .values({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        })
        .$returningId();

      const newUserId = inserted.id;

      const [newUser] = await tx.select().from(user).where(eq(user.id, newUserId));

      return { instance: newUser };
    });

    return result ?? { error: new CustomError("Failed to create user") };
  } catch (err: any) {
    return { error: new CustomError("Failed to create user") };
  }
}

  /**
   * getAllUsers
   * -----------
   * Retrieves all users from the database.
   */
  static async getAllUsers(): Promise<ServiceResult<any[]>> {
    try {
      const users = await db.select().from(user);
      return { instance: users };
    } catch (err: any) {
      return { error: new CustomError("Failed to fetch users") };
    }
  }

  /**
   * getUserById
   * -----------
   * Retrieves a single user by ID.
   */
  static async getUserById(id: number): Promise<ServiceResult<any>> {
    try {
      const [userRow] = await db.select().from(user).where(eq(user.id, id));

      if (!userRow) {
        return { error: new CustomError("User not found", 404) };
      }

      return { instance: userRow };
    } catch (err: any) {
      return { error: new CustomError("Failed to fetch user") };
    }
  }

  /**
   * updateUser
   * ----------
   * Updates an existing user by ID with new data.
   */
  static async updateUser(
    id: number,
    data: Partial<{ firstName: string; lastName: string; password: string }>
  ): Promise<ServiceResult<any>> {
    try {
      const [updatedUser] = await db.transaction(async (tx) => {
        await tx.update(user).set(data).where(eq(user.id, id));
        return tx.select().from(user).where(eq(user.id, id));
      });

      if (!updatedUser) {
        return { error: new CustomError("User not found or not updated", 404) };
      }

      return { instance: updatedUser };
    } catch (err: any) {
      return { error: new CustomError("Failed to update user") };
    }
  }

  /**
   * deleteUser
   * ----------
   * Deletes a user by ID.
   */
  static async deleteUser(id: number): Promise<ServiceResult<boolean>> {
    try {
      const result = await db.delete(user).where(eq(user.id, id));

      const affectedRows =
        typeof (result as any).affectedRows === "number" ? (result as any).affectedRows : 0;

      if (affectedRows === 0) {
        return { error: new CustomError("User not found", 404) };
      }

      return { instance: true };
    } catch (err: any) {
      return { error: new CustomError("Failed to delete user") };
    }
  }
}
