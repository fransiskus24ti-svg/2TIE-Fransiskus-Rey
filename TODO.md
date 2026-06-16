# TODO

## Step 1 — Routing
- [x] Edit `src/routes/MainRoutes.jsx` agar route `/karyawan` (index) memakai `src/views/karyawan/DashboardKaryawan.jsx`.

## Step 2 — Dashboard UI Karyawan (tampilan berbeda)
- [ ] Update `src/views/karyawan/DashboardKaryawan.jsx`:
  - [ ] Ubah hero/title jadi “Operasional Harian” (karyawan-oriented)
  - [ ] Ganti struktur layout menjadi:
    - [ ] Kolom kiri: Antrian Tugas + Ringkasan Penjualan Kasir
    - [ ] Kolom kanan: Status Stok ringkas + Checklist Shift
  - [ ] Tambahkan komponen Interaktif: Checklist Shift (state) dan Antrian Tugas (action/click)
  - [ ] Kurangi kemiripan dengan dashboard admin/premium (ubah konten/tampilan tabel riwayat jadi list)

## Step 3 — Verifikasi
- [ ] Jalankan aplikasi dan cek:
  - [ ] `/karyawan` tampil dashboard yang sudah diperbarui
  - [ ] Checkbox checklist shift dan klik antrian berjalan tanpa error

