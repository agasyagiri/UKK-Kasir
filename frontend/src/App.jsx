// index.jsx
import React, { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import WelcomeScreen from "../src/WelcomeScreen";
import PublicRoutes from "./utils/routes/PublicRoutes";
import ProtectedRoutes from "./utils/routes/ProtectedRoutes";
import Layout from "./components/layout/Layout";
import {
  Login,
  AdminDashboard,
  AdminUser,
  AdminMeja,
  AdminMenu,
  KasirDashboard,
  KasirTransaksi,
  KasirTransaksiDetail,
  KasirTambahTransaksi,
  KasirTransaksiDetailCetak,
  ManajerDashboard,
  ManajerTransaksi,
  ManajerTransaksiDetail,
  ManajerMenu,
  ManajerLaporan,
} from "./pages";

// buat rute
const router = createBrowserRouter(
  // buat rute dari element
  createRoutesFromElements(
    <>
      {/* Rute utama yang terlindungi */}
      <Route path="/" element={<ProtectedRoutes allowedRoles={["admin", "kasir", "manajer"]} />}>
        {/* auto redirect ke halaman login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rute untuk role admin */}
        <Route path="/dashboard/admin" element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route path="/dashboard/admin" element={<Layout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="user" element={<AdminUser />} />
            <Route path="meja" element={<AdminMeja />} />
            <Route path="menu" element={<AdminMenu />} />
          </Route>
        </Route>

        {/* Rute untuk role kasir */}
        <Route path="/dashboard/kasir" element={<ProtectedRoutes allowedRoles={["kasir"]} />}>
          <Route path="/dashboard/kasir" element={<Layout />}>
            <Route index element={<KasirDashboard />} />
            <Route path="transaksi" element={<KasirTransaksi />} />
            <Route path="tambah-transaksi" element={<KasirTambahTransaksi />} />
            <Route path="transaksi/:id" element={<KasirTransaksiDetail />} />
          </Route>
        </Route>

        {/* Rute untuk role manajer */}
        <Route path="/dashboard/manajer" element={<ProtectedRoutes allowedRoles={["manajer"]} />}>
          <Route path="/dashboard/manajer" element={<Layout />}>
            <Route index element={<ManajerDashboard />} />
            <Route path="transaksi" element={<ManajerTransaksi />} />
            <Route path="transaksi/:id" element={<ManajerTransaksiDetail />} />
            <Route path="menu" element={<ManajerMenu />} />
            <Route path="laporan" element={<ManajerLaporan />} />
          </Route>
        </Route>
      </Route>

      {/* Rute login */}
      <Route path="login" element={<PublicRoutes />}>
        <Route index element={<Login />} />
      </Route>

      {/* Rute cetak transaksi untuk kasir */}
      <Route
        path="/dashboard/kasir/transaksi/:id/cetak"
        element={<KasirTransaksiDetailCetak />}
      />
    </>
  )
);

// Komponen utama
export default function App() {
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(false);

  // Callback untuk menghilangkan welcome screen setelah animasi selesai
  const handleWelcomeComplete = () => {
    setIsWelcomeComplete(true);
  };

  return (
    <>
      {!isWelcomeComplete ? (
        <WelcomeScreen onAnimationComplete={handleWelcomeComplete} />
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}