export const isAuthenticated = () =>
  !!(localStorage.getItem('user') || sessionStorage.getItem('user'));