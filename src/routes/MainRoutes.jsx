import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layouts/MainLayout'; // Layout yang ada Sidebarnya

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/default')));
const InventarisPage = Loadable(lazy(() => import('views/pages/InventarisToko')));
const TransaksiPage = Loadable(lazy(() => import('views/pages/Transaksi')));

const MainRoutes = {
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
      path: 'inventaris',
      element: <InventarisPage /> // <--- Harus InventarisPage (sesuai const di atas)
    },
    {
      path: 'transaksi',
      element: <TransaksiPage /> // <--- Harus TransaksiPage (sesuai const di atas)
    }
  ]
};

export default MainRoutes;