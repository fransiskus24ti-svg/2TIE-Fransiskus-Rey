import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layouts/MainLayout';

// ==============================|| DASHBOARD & PAGES IMPORT ||============================== //

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/default')));
const InventarisPage = Loadable(lazy(() => import('views/pages/InventarisToko')));
const TransaksiPage = Loadable(lazy(() => import('views/pages/Transaksi')));
const RiwayatTransaksiPage = Loadable(lazy(() => import('views/pages/RiwayatTransaksi')));
const PelangganPage = Loadable(lazy(() => import('views/pages/Pelanggan')));
const LaporanKeuanganPage = Loadable(lazy(() => import('views/pages/LaporanKeuangan')));

// 🛠️ PERBAIKAN: Menyesuaikan impor agar mengarah ke file 'ManajemenUser' yang sudah kita buat
const ManajemenUserPage = Loadable(lazy(() => import('views/pages/ManajemenUser')));

// ==============================|| AUTHENTICATION IMPORT ||============================== //

const LoginPage = Loadable(lazy(() => import('views/pages/Login')));
const RegisterPage = Loadable(lazy(() => import('views/pages/Register')));
const ForgotPage = Loadable(lazy(() => import('views/pages/Forgot')));

// ==============================|| MAIN ROUTING SKEMA ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      children: [
        { index: true, element: <LoginPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'forgot-password', element: <ForgotPage /> }
      ]
    },
    {
      path: 'admin',
      element: <MainLayout />,
      children: [
        { index: true, element: <DashboardDefault /> },
        { path: 'dashboard', element: <DashboardDefault /> },
        { path: 'inventaris', element: <InventarisPage /> },
        { path: 'transaksi', element: <TransaksiPage /> },
        { path: 'riwayat-transaksi', element: <RiwayatTransaksiPage /> },
        { path: 'pelanggan', element: <PelangganPage /> },
        { path: 'laporan-keuangan', element: <LaporanKeuanganPage /> },
        
        // 🛠️ DISINI: Menghubungkan path URL dengan variabel komponen ManajemenUserPage yang baru
        { path: 'manajemen-user', element: <ManajemenUserPage /> }
      ]
    }
  ]
};

export default MainRoutes;