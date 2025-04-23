import { createConnection } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.id) {
    return { success: false, error: body.id, statusCode: 400 };
  }

  if (!body.name) {
    return { success: false, error: "Name is required", statusCode: 422 };
  }

  let pool;

  try {
    const pool = await createConnection();
    await pool.query("START TRANSACTION");
    // Update role details
    await pool.query("UPDATE roles SET name = ?, des = ? WHERE id = ?", [
      body.name,
      body.des || null,
      body.id,
    ]);
    // Delete all existing function associations
    await pool.query("DELETE FROM function_availables WHERE role_id = ?", [
      body.id,
    ]);
    // Insert new function associations if function_id exists
    const functionIds = Array.isArray(body.function_id) ? body.function_id : [];

    if (Array.isArray(body.function_id) && body.function_id.length > 0) {
      functionIds.map(async (functionId) => {
        const insertQuery = `INSERT INTO function_availables (role_id, function_id) VALUES (?, ?)`;
        await pool.query(insertQuery, [body.id, functionId]);
      });
    }
    await pool.query("COMMIT");
    return {
      success: true,
      message: "Role updated successfully",
      statusCode: 200,
    };
  } catch (error) {
    if (pool) {
      await pool.query("ROLLBACK");
    }
    console.error("Error creating role:", error);
    return {
      success: false,
      error: error.message || "Failed to create role",
      statusCode: 500,
    };
  } finally {
    if (pool) {
      await pool.end(); // Ensure connection is closed
    }
  }
});
