import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layouts/MainLayout'; // Layout yang ada Sidebarnya

// DASHBOARD
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/default')));
const InventarisPage = Loadable(lazy(() => import('views/pages/InventarisToko')));
const TransaksiPage = Loadable(lazy(() => import('views/pages/Transaksi')));

// AUTH
const LoginPage = Loadable(lazy(() => import('views/pages/Login')));
const RegisterPage = Loadable(lazy(() => import('views/pages/Register')));
const ForgotPage = Loadable(lazy(() => import('views/pages/Forgot')));

const MainRoutes = {
  path: '/',
  children: [
    
    // ================= AUTH =================
    {
      path: '/',
      children: [
        {
          index: true,
          element: <LoginPage />
        },
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: 'register',
          element: <RegisterPage />
        },
        {
          path: 'forgot-password',
          element: <ForgotPage />
        }
      ]
    },

    {
      path: 'admin',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <DashboardDefault />
        },
        {
          path: 'dashboard',
          element: <DashboardDefault />
        },
        {
          path: 'pesanan',
          element: <h1>Halaman Pesanan</h1>
        },
        {
          path: 'tracking',
          element: <h1>Halaman Tracking</h1>
        },
        {
          path: 'inventaris',
          element: <InventarisPage />
        },
        {
          path: 'transaksi',
          element: <TransaksiPage />
        }
      ]
    }
  ]
};

export default MainRoutes;