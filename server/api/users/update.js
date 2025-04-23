import { createConnection } from '../../utils/db';
// import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // Validate required fields
    if (!body.id || !body.name || !body.email) {
        return { 
            success: false, 
            error: 'User ID, name, and email are required' 
        };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
        return { 
            success: false, 
            error: 'Please provide a valid email address' 
        };
    }

    try {
        const pool = await createConnection();
        
        // Check if email belongs to another user
        const [existingUser] = await pool.execute(
            'SELECT id FROM users WHERE email = ? AND id != ? LIMIT 1',
            [body.email, body.id]
        );
        
        if (existingUser.length > 0) {
            await pool.end();
            return { 
                success: false, 
                error: 'Email address is already registered to another user' 
            };
        }

        // Prepare update query
        let query = 'UPDATE users SET name = ?, email = ?';
        const params = [body.name, body.email];
        
        // Only update password if provided
        // if (body.password) {
        //     if (body.password.length < 8) {
        //         await pool.end();
        //         return { 
        //             success: false, 
        //             error: 'Password must be at least 8 characters long' 
        //         };
        //     }
        //     const hashedPassword = await bcrypt.hash(body.password, 10);
        //     query += ', password = ?';
        //     params.push(hashedPassword);
        // }
        
        query += ' WHERE id = ?';
        params.push(body.id);
        
        // Execute update
        const [result] = await pool.execute(query, params);
        
        await pool.end();
        
        if (result.affectedRows === 0) {
            return { 
                success: false, 
                error: 'User not found or no changes made' 
            };
        }
        
        return { 
            success: true, 
            message: 'User updated successfully' 
        };
    } catch (error) {
        console.error('Database error:', error);
        return { 
            success: false, 
            error: 'An error occurred while updating the user' 
        };
    }
});