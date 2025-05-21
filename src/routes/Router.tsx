import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import BookList from '../pages/BookList';
import BookDetail from '../pages/BookDetail';
import Header from '../components/Header';

const isAuthenticated = () =>
  !!(localStorage.getItem('user') || sessionStorage.getItem('user'));

const Router = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return isLoginPage ? (
    // No layout for login
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  ) : isAuthenticated() ? (
    // Full layout for authenticated users
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flexShrink: 0 }}>
        <Header />
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  ) : (
    // Redirect unauthenticated users
    <Navigate to="/login" />
  );
};

export default Router;