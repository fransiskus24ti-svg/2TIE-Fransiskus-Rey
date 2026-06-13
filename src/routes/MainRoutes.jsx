import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layouts/MainLayout';
import GuestLayout from 'layouts/GuestLayout';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/default')));
const InventarisPage = Loadable(lazy(() => import('views/pages/InventarisToko')));
const TransaksiPage = Loadable(lazy(() => import('views/pages/Transaksi')));
const RiwayatTransaksiPage = Loadable(lazy(() => import('views/pages/RiwayatTransaksi')));
const PelangganPage = Loadable(lazy(() => import('views/pages/Pelanggan')));
const LaporanKeuanganPage = Loadable(lazy(() => import('views/pages/LaporanKeuangan')));
const ManajemenUserPage = Loadable(lazy(() => import('views/pages/ManajemenUser')));
const ReturBarangPage = Loadable(lazy(() => import('views/pages/ReturBarang')));

const LoginPage = Loadable(lazy(() => import('views/pages/Login')));
const RegisterPage = Loadable(lazy(() => import('views/pages/Register')));
const ForgotPage = Loadable(lazy(() => import('views/pages/Forgot')));

const GuestHomePage = Loadable(lazy(() => import('views/guest/HomeGuest')));
const TentangGuestPage = Loadable(lazy(() => import('views/guest/TentangGuest')));
const KontakGuestPage = Loadable(lazy(() => import('views/guest/KontakGuest')));
const PromoGuestPage = Loadable(lazy(() => import('views/guest/PromoGuest')));
const KategoriProdukGuestPage = Loadable(lazy(() => import('views/guest/KategoriProdukGuest')));
const ReturBarangGuestPage = Loadable(lazy(() => import('views/guest/ReturBarangGuest')));

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
        { path: 'manajemen-user', element: <ManajemenUserPage /> },
        { path: 'retur-barang', element: <ReturBarangPage /> }
      ]
    },
    {
      path: 'guest',
      element: <GuestLayout />,
      children: [
        { index: true, element: <GuestHomePage /> },
        { path: 'transaksi', element: <TransaksiPage /> },
        { path: 'riwayat-transaksi', element: <RiwayatTransaksiPage /> },
        { path: 'pelanggan', element: <PelangganPage /> },
        { path: 'tentang', element: <TentangGuestPage /> },
        { path: 'kontak', element: <KontakGuestPage /> },
        { path: 'kategori-produk', element: <KategoriProdukGuestPage /> },
        { path: 'promo', element: <PromoGuestPage /> },
        { path: 'retur', element: <ReturBarangGuestPage /> }
      ]
    }
  ]
};

export default MainRoutes;