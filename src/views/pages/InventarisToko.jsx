import React, { useState } from 'react';
import { Grid, Card, CardHeader, CardContent, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const InventarisToko = () => {
  // Data inventaris toko bangunan
  const [barang, setBarang] = useState([
    { id: 1, nama: 'Semen Tiga Roda', stok: 50, harga: 'Rp 65.000' },
    { id: 2, nama: 'Cat Tembok Dulux 5kg', stok: 12, harga: 'Rp 180.000' },
    { id: 3, nama: 'Paku Beton 5cm', stok: 100, harga: 'Rp 500/pcs' },
  ]);

  const [inputNama, setInputNama] = useState('');
  const [cari, setCari] = useState('');

  // Fungsi Tambah Barang Baru
  const handleTambah = () => {
    if (inputNama.trim()) {
      const itemBaru = { 
        id: barang.length + 1, 
        nama: inputNama, 
        stok: 0, 
        harga: 'Rp 0' 
      };
      setBarang([...barang, itemBaru]);
      setInputNama('');
    }
  };

  // Logika Pencarian Barang
  const barangTerfilter = barang.filter(b => 
    b.nama.toLowerCase().includes(cari.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={<Typography variant="h3">Input Inventaris Baru</Typography>} />
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <TextField 
                  fullWidth 
                  label="Nama Barang Bangunan" 
                  value={inputNama} 
                  onChange={(e) => setInputNama(e.target.value)} 
                />
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="secondary" fullWidth onClick={handleTambah}>
                  Tambah Stok
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title={<Typography variant="h4">Data Inventaris Toko</Typography>}
            action={
              <TextField 
                size="small" 
                placeholder="Cari barang..." 
                value={cari} 
                onChange={(e) => setCari(e.target.value)} 
              />
            }
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: '#2196f3' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>ID</TableCell>
                  <TableCell sx={{ color: 'white' }}>Nama Barang</TableCell>
                  <TableCell sx={{ color: 'white' }}>Stok</TableCell>
                  <TableCell sx={{ color: 'white' }}>Harga</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {barangTerfilter.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>#{row.id}</TableCell>
                    <TableCell><strong>{row.nama}</strong></TableCell>
                    <TableCell>{row.stok} unit</TableCell>
                    <TableCell>{row.harga}</TableCell>
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

export default InventarisToko;