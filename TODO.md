# TODO

## Selesaikan bug tampilan admin error/putih
1. Perbaiki mapping route vs url menu yang benar.
2. Matikan/restore perubahan yang menyebabkan loop navigasi/blank screen.
3. Pastikan `src/routes/MainRoutes.jsx` kembali valid secara sintaks (tiada comment blok tidak ditutup, dll).
4. Pastikan entry komponen route adalah React component (bukan array/object route config).
5. Test URL langsung: /admin/dashboard, /admin/pengaturan-sistem.

Status:
- [x] Cek route admin di MainRoutes.
- [x] Cek menu admin (dashboard.jsx) ada typo `inventariAs`.
- [ ] Fix blank screen: perlu restore MainRoutes ke versi original karena saat ini sudah dimodifikasi untuk diagnosa.
- [ ] Setelah restore, test ulang.

