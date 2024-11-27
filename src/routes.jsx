import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import RolesPage from './pages/RolesPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/users" element={<UsersPage />} />
    <Route path="/roles" element={<RolesPage />} />
  </Routes>
);

export default AppRoutes;
