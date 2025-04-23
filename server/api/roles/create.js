import { createConnection } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // Validation
  if (!body.name) {
    return {
      success: false,
      error: "Role name is required",
      statusCode: 422,
    };
  }
  
  let pool;
  try {
    pool = await createConnection();

    // Begin transaction
    await pool.query("START TRANSACTION");

    // Insert new role
    const roleQuery = `
            INSERT INTO roles (name, des)
            VALUES (?, ?)
        `;
    const roleValues = [body.name, body.des || null];
    const roleResult = await pool.query(roleQuery, roleValues);

    // Get the last inserted ID
    const roleId = roleResult[0].insertId;
    const functionIds = Array.isArray(body.function_id) ? body.function_id : [];

    if (functionIds.length > 0) {
      await Promise.all(
        functionIds.map(async (functionId) => {
          const checkQuery = `SELECT 1 FROM function_availables WHERE role_id = ? AND function_id = ? LIMIT 1`;
          const checkResult = await pool.query(checkQuery, [
            roleId,
            functionId,
          ]);
          if (checkResult[0].length === 0) {
            const insertQuery = `INSERT INTO function_availables (role_id, function_id) VALUES (?, ?)`;
            await pool.query(insertQuery, [roleId, functionId]);
          }
        })
      );
    }
    await pool.query("COMMIT");
    return {
      success: true,
      message: "Role created successfully",
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
