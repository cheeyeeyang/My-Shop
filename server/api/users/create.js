import { createConnection } from '../../utils/db';
import bcrypt from 'bcryptjs'
export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // Step 1: Validate required fields
    if (!body.name || !body.email || !body.password) {
        return { success: false, error: 'All fields (name, email, password) are required.' };
    }

    // Step 2: Validate email format (simple regex check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
        return { success: false, error: 'Invalid email format.' };
    }

    // Step 3: Validate password length
    if (body.password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long.' };
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    try {
        const pool = await createConnection();
        await pool.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [body.name, body.email, hashedPassword]
        );
        await pool.end(); // Close connection
        return { success: true, message: 'User created successfully!' };
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message || 'Unknown error' };
    }
});
