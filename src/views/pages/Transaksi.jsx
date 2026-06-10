import React, { useState } from 'react';
import { 
    Grid, Card, CardHeader, CardContent, TextField, Button, 
    Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, Typography, MenuItem, Box, Divider 
} from '@mui/material';

const Transaksi = () => {
    // 1. Ambil data barang dari LocalStorage (Terhubung ke Inventaris)
    const [barang, setBarang] = useState(() => {
        const saved = localStorage.getItem('data_toko');
        return saved ? JSON.parse(saved) : [
            { id: 1, nama: 'Semen Padang', stok: 100, harga: 65000 },
            { id: 2, nama: 'Cat Dulux', stok: 20, harga: 150000 }
        ];
    });

    // 2. Ambil data riwayat transaksi dari LocalStorage agar tidak hilang saat di-refresh
    const [riwayat, setRiwayat] = useState(() => {
        const savedRiwayat = localStorage.getItem('riwayat_toko');
        return savedRiwayat ? JSON.parse(savedRiwayat) : [];
    });

    const [pilihanBarang, setPilihanBarang] = useState('');
    const [jumlah, setJumlah] = useState(1);

    // Cari data barang yang sedang dipilih secara real-time
    const detailBarangTerpilih = barang.find(b => b.nama === pilihanBarang);
    const totalBayarRealtime = detailBarangTerpilih ? detailBarangTerpilih.harga * (parseInt(jumlah) || 0) : 0;

    // 3. Fungsi Simpan Transaksi
    const handleSimpan = () => {
        const qtyBeli = parseInt(jumlah);

        if (!pilihanBarang) {
            alert('Silakan pilih barang terlebih dahulu!');
            return;
        }

        if (!qtyBeli || qtyBeli <= 0) {
            alert('Jumlah beli harus minimal 1!');
            return;
        }
        
        if (detailBarangTerpilih && detailBarangTerpilih.stok >= qtyBeli) {
            // Update Stok di State & LocalStorage
            const dataBaru = barang.map(b => 
                b.nama === pilihanBarang ? { ...b, stok: b.stok - qtyBeli } : b
            );
            setBarang(dataBaru);
            localStorage.setItem('data_toko', JSON.stringify(dataBaru));

            // Masukkan ke Riwayat Transaksi & Simpan ke LocalStorage
            const riwayatBaru = [
                { 
                    nama: pilihanBarang, 
                    qty: qtyBeli, 
                    hargaSatuan: detailBarangTerpilih.harga,
                    total: totalBayarRealtime, 
                    tgl: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) 
                }, 
                ...riwayat
            ];
            setRiwayat(riwayatBaru);
            localStorage.setItem('riwayat_toko', JSON.stringify(riwayatBaru));
            
            alert('Transaksi Berhasil!');
            
            // Reset Form setelah sukses
            setPilihanBarang('');
            setJumlah(1);
        } else {
            alert(`Stok tidak cukup! Stok tersedia: ${detailBarangTerpilih?.stok || 0}`);
        }
    };

    // 4. Fungsi Reset/Hapus Semua Riwayat Hari Ini
    const handleClearRiwayat = () => {
        if (window.confirm('Apakah Anda yakin ingin menghapus semua riwayat transaksi hari ini?')) {
            setRiwayat([]);
            localStorage.removeItem('riwayat_toko');
        }
    };

    return (
        <Grid container spacing={3} sx={{ p: 1 }}>
            {/* FORM KASIR */}
            <Grid item xs={12} md={4}>
                <Card elevation={3} sx={{ borderRadius: 3 }}>
                    <CardHeader 
                        title="Input Penjualan" 
                        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold', color: 'primary.main' }}
                        sx={{ borderBottom: '1px solid #f0f0f0', pb: 1.5 }}
                    />
                    <CardContent sx={{ pt: 3 }}>
                        {/* Dropdown Pilih Barang */}
                        <TextField
                            select
                            fullWidth
                            label="Pilih Barang"
                            value={pilihanBarang}
                            onChange={(e) => setPilihanBarang(e.target.value)}
                            sx={{ mb: 2.5 }}
                        >
                            {barang.map((b) => (
                                <MenuItem key={b.id} value={b.nama} disabled={b.stok === 0}>
                                    {b.nama} {b.stok === 0 ? '(Stok Habis)' : `(Stok: ${b.stok})`}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Input Jumlah Beli */}
                        <TextField
                            fullWidth
                            type="number"
                            label="Jumlah Beli"
                            value={jumlah}
                            onChange={(e) => setJumlah(e.target.value)}
                            onBlur={() => { if (!jumlah || jumlah < 1) setJumlah(1); }} // Kembalikan ke 1 jika dikosongkan
                            sx={{ mb: 3 }}
                        />

                        {/* Ringkasan Pembayaran Khusus (Muncul jika barang sudah dipilih) */}
                        {pilihanBarang && (
                            <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 2, mb: 3 }}>
                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography variant="body2" color="text.secondary">Harga Satuan:</Typography>
                                    <Typography variant="body2" fontWeight="medium">Rp {detailBarangTerpilih?.harga.toLocaleString('id-ID')}</Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="subtitle1" fontWeight="bold">Total Bayar:</Typography>
                                    <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                                        Rp {totalBayarRealtime.toLocaleString('id-ID')}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        <Button 
                            variant="contained" 
                            color="primary" 
                            fullWidth 
                            size="large"
                            onClick={handleSimpan}
                            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold', py: 1.2 }}
                        >
                            Bayar & Kurangi Stok
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

            {/* TABEL RIWAYAT TRANSAKSI */}
            <Grid item xs={12} md={8}>
                <Card elevation={3} sx={{ borderRadius: 3 }}>
                    <CardHeader 
                        title="Riwayat Transaksi Hari Ini" 
                        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                        action={
                            riwayat.length > 0 && (
                                <Button 
                                    size="small" 
                                    color="error" 
                                    variant="outlined" 
                                    onClick={handleClearRiwayat}
                                    sx={{ textTransform: 'none', borderRadius: 1.5 }}
                                >
                                    Hapus Riwayat
                                </Button>
                            )
                        }
                        sx={{ borderBottom: '1px solid #f0f0f0', pb: 1.5 }}
                    />
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead sx={{ bgcolor: 'grey.50' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Jam</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Nama Barang</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Harga</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Qty</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Total Harga</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {riwayat.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                                            Belum ada transaksi masuk hari ini.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    riwayat.map((r, i) => (
                                        <TableRow key={i} hover>
                                            <TableCell>{r.tgl}</TableCell>
                                            <TableCell>
                                                <Typography fontWeight="medium" variant="body2">{r.nama}</Typography>
                                            </TableCell>
                                            <TableCell align="right">Rp {r.hargaSatuan?.toLocaleString('id-ID')}</TableCell>
                                            <TableCell align="center">{r.qty}</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                                                Rp {r.total.toLocaleString('id-ID')}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Transaksi;