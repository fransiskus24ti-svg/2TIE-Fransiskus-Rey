import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, MenuItem } from '@mui/material';

const Transaksi = () => {
    // 1. Ambil data barang dari LocalStorage (Data yang sama dengan Inventaris)
    const [barang, setBarang] = useState(() => {
        const saved = localStorage.getItem('data_toko');
        return saved ? JSON.parse(saved) : [
            { id: 1, nama: 'Semen Padang', stok: 100, harga: 65000 },
            { id: 2, nama: 'Cat Dulux', stok: 20, harga: 150000 }
        ];
    });

    const [pilihanBarang, setPilihanBarang] = useState('');
    const [jumlah, setJumlah] = useState(1);
    const [riwayat, setRiwayat] = useState([]);

    // 2. Fungsi Simpan Transaksi
    const handleSimpan = () => {
        const itemSesuai = barang.find(b => b.nama === pilihanBarang);
        
        if (itemSesuai && itemSesuai.stok >= jumlah) {
            // Update Stok di State
            const dataBaru = barang.map(b => 
                b.nama === pilihanBarang ? { ...b, stok: b.stok - jumlah } : b
            );
            setBarang(dataBaru);
            localStorage.setItem('data_toko', JSON.stringify(dataBaru)); // Simpan ke "Database"

            // Masukkan ke Riwayat Transaksi
            const total = itemSesuai.harga * jumlah;
            setRiwayat([{ nama: pilihanBarang, qty: jumlah, total: total, tgl: new Date().toLocaleTimeString() }, ...riwayat]);
            
            alert('Transaksi Berhasil!');
        } else {
            alert('Stok tidak cukup atau barang belum dipilih!');
        }
    };

    return (
        <Grid container spacing={3}>
            {/* FORM KASIR */}
            <Grid item xs={12} md={4}>
                <Card>
                    <CardHeader title="Input Penjualan" />
                    <CardContent>
                        <TextField
                            select
                            fullWidth
                            label="Pilih Barang"
                            value={pilihanBarang}
                            onChange={(e) => setPilihanBarang(e.target.value)}
                            sx={{ mb: 2 }}
                        >
                            {barang.map((b) => (
                                <MenuItem key={b.id} value={b.nama}>
                                    {b.nama} (Stok: {b.stok})
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            type="number"
                            label="Jumlah Beli"
                            value={jumlah}
                            onChange={(e) => setJumlah(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button variant="contained" color="primary" fullWidth onClick={handleSimpan}>
                            Bayar & Kurangi Stok
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

            {/* TABEL RIWAYAT TRANSAKSI */}
            <Grid item xs={12} md={8}>
                <Card>
                    <CardHeader title="Riwayat Transaksi Hari Ini" />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ bgcolor: '#eee' }}>
                                <TableRow>
                                    <TableCell>Jam</TableCell>
                                    <TableCell>Barang</TableCell>
                                    <TableCell>Qty</TableCell>
                                    <TableCell>Total Harga</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {riwayat.map((r, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{r.tgl}</TableCell>
                                        <TableCell><strong>{r.nama}</strong></TableCell>
                                        <TableCell>{r.qty}</TableCell>
                                        <TableCell>Rp {r.total.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Transaksi;