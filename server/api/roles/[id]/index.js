import { defineEventHandler, getQuery } from "h3";
import { createConnection } from "../../../utils/db";

export default defineEventHandler(async (event) => {
  try {
    const pool = await createConnection();
    const { id } = event.context.params;
    if (!id) {
      return { success: false, error: "ID is required", statusCode: 400 };
    }
    // Fetch role by ID
    const [role] = await pool.query("SELECT * FROM roles WHERE id = ?", [id]);

    if (role.length === 0) {
      return { success: false, error: "Role not found", statusCode: 404 };
    }
    // Fetch associated function IDs
    const [functionIds] = await pool.query(
      "SELECT function_id FROM function_availables WHERE role_id = ?",
      [id]
    );
    const [parents] = await pool.query(
      `SELECT fm.id FROM function_availables fa
         JOIN function_models fm ON fa.function_id = fm.id
         WHERE fa.role_id = ? AND fm.parent_id IS NULL`,
      [id]
    );
    return {
      success: true,
      data: {
        id: role[0].id,
        name: role[0].name,
        des: role[0].des,
        Parents_id: parents.map((row) => row.id),
        function_id: functionIds.map((row) => row.function_id),
      },
      statusCode: 200,
    };
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, error: error.message, statusCode: 500 };
  }
});
