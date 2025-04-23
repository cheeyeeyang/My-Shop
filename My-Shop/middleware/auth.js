export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('token');
    const protectedRoutes = ['/', '/settings/roles', '/settings/users'];
    if (protectedRoutes.includes(to.path) && !token) {
      return navigateTo('/login');
    }
  }
});
