import { createConnection } from "../../utils/db";
//import middleWareRoute from '../../middleware/auth.js';
export default defineEventHandler(async (event) => {
   //middleWareRoute(event);
  try {
    const pool = await createConnection();
    const [roles] = await pool.query("SELECT * FROM roles");

    await pool.end(); // Close connection
    return roles;
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
});
