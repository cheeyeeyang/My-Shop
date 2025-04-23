import { createConnection } from "../../utils/db";
import middleWareRoute from '../../middleware/auth.js'
export default defineEventHandler(async (event) => {
 // middleWareRoute(event);
  try {
    const pool = await createConnection();
    const [users] = await pool.query("SELECT * FROM users");

    await pool.end(); // Close connection
    return users;
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
});
