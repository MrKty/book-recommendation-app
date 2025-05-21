import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import BookList from '../pages/BookList';
import BookDetail from '../pages/BookDetail';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect, useState } from 'react';

const isAuthenticated = () =>
  !!(localStorage.getItem('user') || sessionStorage.getItem('user'));

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <div style={{ flexShrink: 0 }}>
        <Header />
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Routes>
          <Route path="/" element={isAuthenticated() ? <BookList /> : <Navigate to="/login" />} />
          <Route path="/book/:id" element={isAuthenticated() ? <BookDetail /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default Router;