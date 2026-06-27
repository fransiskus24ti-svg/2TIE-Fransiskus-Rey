import React, { createContext, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
// ThemeCustomization dinonaktifkan sementara untuk debugging
// import ThemeCustomization from './themes';
import router from './routes/index.jsx'; // Langsung import router (bukan array)

export const TokoContext = createContext();

// ============================================================
// ERROR BOUNDARY — menangkap error di komponen anak
// ============================================================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ Error caught by Boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: '#d32f2f', background: '#ffebee', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1>⚠️ Terjadi Error di Aplikasi</h1>
          <details style={{ whiteSpace: 'pre-wrap', fontSize: '14px', marginTop: '16px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Klik untuk lihat detail error</summary>
            <pre style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
              {this.state.error?.toString()}
            </pre>
            <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '8px' }}>
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
          <p style={{ marginTop: '16px' }}>🔍 Periksa console browser (F12) untuk detail lebih lanjut.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================
// KOMPONEN APP UTAMA
// ============================================================
function App() {
  console.log('✅ App.jsx rendered');
  console.log('🔍 router object:', router);
  console.log('🔍 router type:', typeof router);
  // router bukan array, jadi tidak ada length

  // State global
  const [dataBarang, setDataBarang] = useState([
    { id: 1, nama: 'Semen Tiga Roda', stok: 50, harga: 65000, satuan: 'unit' },
    { id: 2, nama: 'Cat Tembok Dulux 5kg', stok: 12, harga: 180000, satuan: 'unit' },
    { id: 3, nama: 'Paku Beton 5cm', stok: 100, harga: 500, satuan: 'pcs' },
  ]);

  const [riwayatTransaksi, setRiwayatTransaksi] = useState([
    { jam: '09:00 WIB', barang: 'Besi 8mm', qty: 20, totalHarga: 1200000 },
    { jam: '14:20 WIB', barang: 'Cat Tembok Dulux 5kg', qty: 2, totalHarga: 360000 },
    { jam: '14:30 WIB', barang: 'Semen Tiga Roda', qty: 10, totalHarga: 650000 },
  ]);

  const [catatanOperasional, setCatatanOperasional] = useState([
    'Pengiriman pasir Merapi tiba jam 14:00.',
    'Cek kembali nota supplier Semen Gresik.',
    'Servis berkala armada pick-up hari Sabtu.',
  ]);

  // Jika router tidak valid, tampilkan pesan error
  if (!router || typeof router !== 'object') {
    return <div style={{ padding: '40px', color: 'red', fontSize: '24px' }}>❌ Router tidak valid! Periksa routes/index.jsx</div>;
  }

  // 🔥 Menggunakan RouterProvider dengan router yang sudah diimport
  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh' }}>
        <TokoContext.Provider
          value={{
            dataBarang,
            setDataBarang,
            riwayatTransaksi,
            setRiwayatTransaksi,
            catatanOperasional,
            setCatatanOperasional,
          }}
        >
          <RouterProvider router={router} />
        </TokoContext.Provider>
      </div>
    </ErrorBoundary>
  );
}

export default App;