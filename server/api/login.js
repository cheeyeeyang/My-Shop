// server/api/login.js
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createConnection } from '../utils/db'
import { defineEventHandler, readBody, createError } from 'h3'
import { useRuntimeConfig } from '#imports'

// This is the workaround to access runtime config in JS
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const pool = await createConnection()
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
  const user = rows[0]

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  // Access runtime config through event.context
  const config = useRuntimeConfig()
  const token = jwt.sign(
    { id: user.id, phone: user.phone },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  )
  return {
    data: user,
    token,
  }
})
