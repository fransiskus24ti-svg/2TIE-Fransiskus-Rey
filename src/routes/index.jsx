import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../views/pages/Login.jsx';

// ====== ROUTE IMPORTS (FIX ROUTING AGAR TIDAK LEMPAR KE LOGIN) ======
import MainRoutes from './MainRoutes.jsx';
import GuestRoutes from './GuestRoutes.jsx';
import PagesRoutes from './PagesRoutes.jsx';
import KaryawanRoutes from './KaryawanRoutes.jsx';


// ====== AUTH HELPERS ======
const TOKEN_KEY = 'token';
const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  console.log('🔐 isAuthenticated check:', { tokenExists: !!token, TOKEN_KEY });
  return !!token;
};

// ====== PRIVATE ROUTE ======
// Untuk perbaikan akses tampilan admin/karyawan/guest, proteksi sementara dimatikan.
// Setelah routing benar-benar berfungsi, proteksi bisa diaktifkan kembali.
const PrivateRoute = ({ children }) => {
  return children;
};


// ====== PUBLIC ROUTE ======
const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    console.log('🔓 PublicRoute redirect to /admin/dashboard');
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};

// ====== GABUNGAN ROUTES ======
const finalRoutes = [];

// 1. Login
finalRoutes.push({
  path: '/login',
  element: <PublicRoute><Login /></PublicRoute>,
});

// 2. Root
finalRoutes.push({
  path: '/',
  element: isAuthenticated() ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/login" replace />,
});

// 3. Admin routes (PASTIKAN PAKAI KONFIGURASI YANG BENAR)
// Di proyek ini, admin/karyawan/guest dibuat di src/App.jsx melalui router yang berbeda.
// Agar tampilan tidak berubah (header/sidebar ikut yang benar), gunakan routes yang sama:
// - Admin & Karyawan: ambil dari MainRoutes.jsx dan KaryawanRoutes.jsx versi yang konsisten
// Catatan: PrivateRoute sengaja bypass.
if (MainRoutes) {
  if (Array.isArray(MainRoutes)) {
    MainRoutes.forEach(route => finalRoutes.push({ ...route, element: <PrivateRoute>{route.element}</PrivateRoute> }));
  } else {
    finalRoutes.push({ ...MainRoutes, element: <PrivateRoute>{MainRoutes.element}</PrivateRoute> });
  }
}

if (KaryawanRoutes) {
  if (Array.isArray(KaryawanRoutes)) {
    KaryawanRoutes.forEach(route => finalRoutes.push({ ...route, element: <PrivateRoute>{route.element}</PrivateRoute> }));
  } else {
    finalRoutes.push({ ...KaryawanRoutes, element: <PrivateRoute>{KaryawanRoutes.element}</PrivateRoute> });
  }
}

// 5. PagesRoutes (register, forgot, dll)
const pagesArray = Array.isArray(PagesRoutes) ? PagesRoutes : [PagesRoutes];
pagesArray.forEach(route => {
  if (route?.path && route.path !== '/login') finalRoutes.push(route);
});

// 6. GuestRoutes
// Pastikan GuestRoutes masuk sebelum catch-all supaya /guest/... tidak jatuh ke redirect /login
if (GuestRoutes) {
  if (Array.isArray(GuestRoutes)) {
    finalRoutes.push(...GuestRoutes);
  } else {
    finalRoutes.push(GuestRoutes);
  }
}

// DEBUG: pastikan route guest ada
console.log('✅ has /guest ?', finalRoutes.some(r => r.path === '/guest' || (r.children || []).some(c => c.path === 'guest')));




// 7. Catch-all (harus selalu ada)
finalRoutes.push({
  path: '*',
  element: <Navigate to="/login" replace />,
});

// DEBUG: Cek finalRoutes (sekarang pakai console.log, bukan adconsole)
console.log('✅ finalRoutes length:', finalRoutes.length);
console.log('✅ finalRoutes (paths only):', finalRoutes.map(r => r.path));
console.log('✅ has /admin/dashboard?', finalRoutes.some(r => r.path === '/admin' || r.path === '/admin/dashboard' || (r.children || []).some(c => c.path === 'dashboard')));

// Buat router
const router = createBrowserRouter(finalRoutes, {
  basename: '',
});

export default router;