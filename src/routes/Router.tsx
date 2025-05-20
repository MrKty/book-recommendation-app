import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import BookList from '../pages/BookList';
import BookDetail from '../pages/BookDetail';

const isAuthenticated = () => !!localStorage.getItem('user');

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={isAuthenticated() ? <BookList /> : <Navigate to="/login" />}
      />
      <Route
        path="/book/:id"
        element={isAuthenticated() ? <BookDetail /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;