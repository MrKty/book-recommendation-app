import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import BookList from '../pages/BookList';
import BookDetail from '../pages/BookDetail';
import AppLayout from '../components/layout/AppLayout';
import { isAuthenticated } from '../utils/auth';

const Router = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  if (!isAuthenticated()) return <Navigate to="/login" />;

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppLayout>
  );
};

export default Router;