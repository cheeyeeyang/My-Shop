// // server/api/protected.js
// import authMiddleware from '../middleware/auth'

// export default defineEventHandler(async (event) => {
//   await authMiddleware(event) // Apply authentication middleware only to this route

//   return {
//     message: 'You are authorized!',
//     user: event.context.user // User details are added to context by the middleware
//   }
// })
