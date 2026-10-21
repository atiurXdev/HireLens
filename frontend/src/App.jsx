import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Apply from './pages/Apply';
import PostJob from './pages/PostJob';
import Applications from './pages/Applications';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return React.createElement(
    'div',
    null,
    React.createElement(Navbar, null),
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: '/', element: React.createElement(Home, null) }),
      React.createElement(Route, { path: '/login', element: React.createElement(Login, null) }),
      React.createElement(Route, { path: '/apply', element: React.createElement(ProtectedRoute, null, React.createElement(Apply, null)) }),
      React.createElement(Route, { path: '/post-job', element: React.createElement(ProtectedRoute, null, React.createElement(PostJob, null)) }),
      React.createElement(Route, { path: '/applications', element: React.createElement(ProtectedRoute, null, React.createElement(Applications, null)) })
    )
  );
}

export default App;