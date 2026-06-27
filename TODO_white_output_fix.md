# TODO: Perbaikan tampilan putih kosong

## Progress
- [x] Analisis global CSS: menghapus pemaksaan background #ffffff & color #0f172a yang bisa bikin tampilan laporan jadi “putih”
  - src/index.css

## Next steps
- [ ] Pastikan route untuk halaman laporan memakai Layout yang benar (bukan placeholder/komponen yang tak merender konten)
  - Cek implementasi di src/routes/MainRoutes.jsx dan apakah ada duplikasi/komentar placeholder
- [ ] Tambahkan fallback debug text/warna pada halaman laporan (contoh: LaporanKeuntungan) untuk memastikan komponen benar-benar ter-render
- [ ] Jika masih putih, cek komponen Layout (mis. LaporanLayout / Paper / Header) untuk konflik warna
- [ ] Setelah fix, jalankan build/dev dan verifikasi beberapa halaman: 
  - /admin/laporan-keuntungan
  - /admin/laporan-laba-rugi
  - /admin/laporan-penjualan
  - /admin/laporan-inventaris

