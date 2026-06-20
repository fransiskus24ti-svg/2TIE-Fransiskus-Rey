import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import PagesRoutes from './PagesRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([MainRoutes, PagesRoutes], {
  // Hindari route mismatch saat VITE_APP_BASE_URL tidak sesuai.
  // Kalau memang deployment butuh basename, set nilai ini sesuai base path deploy.
  basename: ''
});


export default router;
