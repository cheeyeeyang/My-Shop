import { createConnection } from "../../utils/db";

export default defineEventHandler(async (event) => {
  try {
    const pool = await createConnection();

    // Fetch all function models
    const [models] = await pool.query(`
          SELECT id, name, des, parent_id FROM function_models
        `);
    // Close connection (only if not using a pool)
    await pool.end();

    // Convert flat data into a nested structure
    function buildHierarchy(flatData) {
      const map = new Map();
      const tree = [];
      flatData.forEach((item) => {
        const node = {
          id: item.id,
          name: item.name,
          des: item.des,
          children: [],
        };
        map.set(item.id, node);

        if (item.parent_id === null) {
          tree.push(node);
        } else {
          const parent = map.get(item.parent_id);
          if (parent) {
            parent.children.push(node);
          }
        }
      });

      return tree;
    }

    return { function: buildHierarchy(models) };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
});
