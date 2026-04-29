import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import MainLayout from 'layouts/MainLayout';

// pages
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/default')));
const SamplePage = Loadable(lazy(() => import('views/pages/SamplePage')));

// utils
const UtilsTypography = Loadable(lazy(() => import('views/components/Typography')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/', // Ini untuk localhost:3000/
      element: <DashboardDefault />
    },
    {
      path: 'dashboard', // MODIFIKASI: Sekarang localhost:3000/dashboard akan jalan
      element: <DashboardDefault />
    },
    {
      path: 'sample-page', // Dibuat relatif (tanpa slash di depan lebih aman untuk nested)
      element: <SamplePage />
    },
    {
      path: 'components',
      children: [
        {
          path: 'typography',
          element: <UtilsTypography />
        }
      ]
    }
  ]
};

export default MainRoutes;