import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return React.createElement(Navigate, { to: '/login', replace: true });
  }

  return children;
}

export default ProtectedRoute;