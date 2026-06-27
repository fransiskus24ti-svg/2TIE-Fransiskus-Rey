import React from 'react';
import { Navigate } from 'react-router-dom';

// 🔥 Import GUEST LAYOUT dari folder layouts, bukan didefinisikan di sini
import GuestLayout from '../layouts/GuestLayout/index.jsx';

// Import semua halaman guest
import HomeGuest from '../views/guest/HomeGuest.jsx';
import KategoriProdukGuest from '../views/guest/KategoriProdukGuest.jsx';
import KontakGuest from '../views/guest/KontakGuest.jsx';
import PromoGuest from '../views/guest/PromoGuest.jsx';
import ReturBarangGuest from '../views/guest/ReturBarangGuest.jsx';
import TentangGuest from '../views/guest/TentangGuest.jsx';
import PelangganGuest from '../views/guest/PelangganGuest.jsx';


// Placeholder untuk transaksi
import PlaceholderGuestTransaksi from '../views/pages/Login.jsx';

const GuestRoutes = {
  path: '/guest',
  element: <GuestLayout />, // ✅ GuestLayout diimpor dari folder layouts
  children: [
    { index: true, element: <HomeGuest /> },                // Halaman utama guest
    { path: 'home', element: <HomeGuest /> },
    { path: 'kategori-produk', element: <KategoriProdukGuest /> },
    { path: 'kontak', element: <KontakGuest /> },
    { path: 'promo', element: <PromoGuest /> },
    { path: 'retur-barang', element: <ReturBarangGuest /> },
    { path: 'retur', element: <ReturBarangGuest /> },
    { path: 'tentang', element: <TentangGuest /> },
    { path: 'pelanggan', element: <PelangganGuest /> },

    { path: 'transaksi', element: <PlaceholderGuestTransaksi /> },
    { path: 'riwayat-transaksi', element: <PlaceholderGuestTransaksi /> },

    { path: '*', element: <Navigate to="/guest" replace /> },
  ],
};

export default GuestRoutes;