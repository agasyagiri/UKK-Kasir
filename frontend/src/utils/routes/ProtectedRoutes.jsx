// ProtectedRoutes.jsx
import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getLocalStorage } from "../helper/localStorage";
import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from "../constants";
import AdminLayout from "../../components/layout/Layout";

// Fungsi untuk mengecek autentikasi pengguna dan role
const userAuth = () => {
  const token = getLocalStorage(LOCAL_STORAGE_TOKEN);
  const user = getLocalStorage(LOCAL_STORAGE_USER);

  if (token) {
    return {
      token: token,
      role: user.role,
    };
  } else {
    return false;
  }
};

// Komponen ProtectedRoutes
const ProtectedRoutes = ({ allowedRoles }) => {
  const location = useLocation();
  const { token, role } = userAuth() || {};

  // Jika tidak ada token, redirect ke login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Jika peran pengguna tidak termasuk dalam allowedRoles, redirect ke dashboard sesuai peran
  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === "admin") {
      return <Navigate to="/dashboard/admin" />;
    } else if (role === "kasir") {
      return <Navigate to="/dashboard/kasir/" />;
    } else if (role === "manajer") {
      return <Navigate to="/dashboard/manajer" />;
    }
  }

  // Jika peran sesuai, izinkan akses ke halaman
  return <Outlet />;
};

export default ProtectedRoutes;
