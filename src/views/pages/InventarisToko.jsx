import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Grid, Card, CardContent, TextField, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, InputAdornment, Stack 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// =====================================================
// MAP GAMBAR PER PRODUK (pakai via.placeholder + warna)
// Ganti URL di bawah dengan gambar lokal kamu jika ada
// =====================================================
const gambarProduk = {
  'Semen Tiga Roda':         'https://placehold.co/600x300/e2e8f0/334155?text=Semen+Tiga+Roda',
  'Cat Tembok Dulux 5kg':    'https://placehold.co/600x300/dbeafe/1e40af?text=Cat+Dulux+5kg',
  'Paku Beton 5cm':          'https://placehold.co/600x300/f1f5f9/475569?text=Paku+Beton+5cm',
  'Besi Beton 8mm':          'https://placehold.co/600x300/fef9c3/713f12?text=Besi+Beton+8mm',
  'Besi Beton 10mm':         'https://placehold.co/600x300/fef9c3/713f12?text=Besi+Beton+10mm',
  'Besi Beton 12mm':         'https://placehold.co/600x300/fef9c3/713f12?text=Besi+Beton+12mm',
  'Pipa PVC Wavin 3 Inch':   'https://placehold.co/600x300/dcfce7/14532d?text=Pipa+PVC+3+Inch',
  'Pipa PVC Wavin 4 Inch':   'https://placehold.co/600x300/dcfce7/14532d?text=Pipa+PVC+4+Inch',
  'Bata Merah Press':        'https://placehold.co/600x300/fee2e2/7f1d1d?text=Bata+Merah+Press',
  'Batako Semen':            'https://placehold.co/600x300/f1f5f9/334155?text=Batako+Semen',
};

const dataAwalDummy = [
  { id: 1,  nama: 'Semen Tiga Roda',       stok: 50,   harga: 'Rp 65.000',    deskripsi: 'Semen PCC berkualitas tinggi untuk plesteran dan pasangan bata.' },
  { id: 2,  nama: 'Cat Tembok Dulux 5kg',  stok: 12,   harga: 'Rp 180.000',   deskripsi: 'Cat interior premium dengan daya sebar luas dan tahan lama.' },
  { id: 3,  nama: 'Paku Beton 5cm',        stok: 100,  harga: 'Rp 500/pcs',   deskripsi: 'Paku baja kuat khusus untuk permukaan beton keras.' },
  { id: 4,  nama: 'Besi Beton 8mm',        stok: 85,   harga: 'Rp 45.000',    deskripsi: 'Besi tulangan struktur bangunan standar SNI.' },
  { id: 5,  nama: 'Besi Beton 10mm',       stok: 60,   harga: 'Rp 68.000',    deskripsi: 'Besi tulangan struktur cor ukuran medium.' },
  { id: 6,  nama: 'Besi Beton 12mm',       stok: 40,   harga: 'Rp 95.000',    deskripsi: 'Besi beton ulir super kuat untuk fondasi utama.' },
  { id: 7,  nama: 'Pipa PVC Wavin 3 Inch', stok: 35,   harga: 'Rp 55.000',    deskripsi: 'Pipa saluran air bersih bertekanan tinggi.' },
  { id: 8,  nama: 'Pipa PVC Wavin 4 Inch', stok: 25,   harga: 'Rp 78.000',    deskripsi: 'Pipa pembuangan air kotor ukuran besar.' },
  { id: 9,  nama: 'Bata Merah Press',      stok: 2500, harga: 'Rp 850/pcs',   deskripsi: 'Bata merah matang hasil press mesin, kokoh dan presisi.' },
  { id: 10, nama: 'Batako Semen',          stok: 800,  harga: 'Rp 3.500/pcs', deskripsi: 'Batako cetak semen kuat untuk dinding pagar dan rumah.' }
];

// Gambar fallback kalau nama tidak ada di map
const GAMBAR_DEFAULT = 'https://placehold.co/600x300/f1f5f9/94a3b8?text=Material+Bangunan';

const InventarisToko = () => {
  const [barang, setBarang]         = useState(dataAwalDummy);
  const [cari, setCari]             = useState('');
  const [error, setError]           = useState(null);
  const [viewDetailId, setViewDetailId] = useState(null);
  const [inputNama, setInputNama]   = useState('');
  const [inputStok, setInputStok]   = useState('');
  const [inputHarga, setInputHarga] = useState('');

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=10')
      .then((res) => { if (res.status !== 200) setError('Gagal fetch data awal'); })
      .catch((err) => setError(err.message || 'Error Jaringan API'));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBarang(
        cari === ''
          ? dataAwalDummy
          : dataAwalDummy.filter(item => item.nama.toLowerCase().includes(cari.toLowerCase()))
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [cari]);

  const handleTambah = () => {
    if (inputNama.trim()) {
      const itemBaru = {
        id: barang.length > 0 ? Math.max(...barang.map(b => b.id)) + 1 : 1,
        nama: inputNama,
        stok: inputStok ? parseInt(inputStok) : 0,
        harga: inputHarga ? `Rp ${Number(inputHarga).toLocaleString('id-ID')}` : 'Rp 0',
        deskripsi: 'Barang baru ditambahkan secara manual ke dalam sistem gudang.'
      };
      setBarang([itemBaru, ...barang]);
      setInputNama(''); setInputStok(''); setInputHarga('');
    }
  };

  // =========================================================================
  // HALAMAN DETAIL — dengan gambar produk
  // =========================================================================
  if (viewDetailId !== null) {
    const dataDetail = dataAwalDummy.find(item => item.id === viewDetailId);
    const namaBarang = dataDetail ? dataDetail.nama : 'Produk Custom';
    const urlGambar  = gambarProduk[namaBarang] || GAMBAR_DEFAULT;

    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', bgcolor: '#f8fafc', minHeight: '100vh', alignItems: 'center' }}>
        <Card sx={{ maxWidth: 550, width: '100%', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          
          {/* ✅ GAMBAR PRODUK */}
          <Box sx={{ width: '100%', height: 240, bgcolor: '#f1f5f9', overflow: 'hidden' }}>
            <img
              src={urlGambar}
              alt={namaBarang}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = GAMBAR_DEFAULT;
              }}
            />
          </Box>

          <CardContent sx={{ p: 3 }}>
            <Typography variant="caption" sx={{ color: '#1e88e5', fontWeight: 700, letterSpacing: 1 }}>
              DETAIL PRODUK (ID: #{viewDetailId})
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, mb: 2, color: '#1e293b' }}>
              {namaBarang}
            </Typography>

            <Box sx={{ bgcolor: '#f1f5f9', p: 3, borderRadius: '12px', mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                <strong>Stok Gudang:</strong> {dataDetail ? dataDetail.stok : 0} unit
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5, color: '#1e88e5', fontWeight: 700 }}>
                <strong>Harga Pokok:</strong> {dataDetail ? dataDetail.harga : 'Rp 0'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mt: 2, lineHeight: 1.6 }}>
                <strong>Deskripsi:</strong> {dataDetail ? dataDetail.deskripsi : '-'}
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => setViewDetailId(null)}
              sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, bgcolor: '#384252', '&:hover': { bgcolor: '#1e293b' } }}
            >
              Kembali ke Dashboard Toko
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // =========================================================================
  // DASHBOARD UTAMA (tidak berubah)
  // =========================================================================
  return (
    <Box sx={{ width: '100%', p: 3, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
          Dashboard / <span style={{ color: '#2196f3' }}>Product List</span>
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mt: 0.5 }}>
          Stok Barang (Full Integrated Architecture)
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0,0,0,0.02)', border: '1px solid #eef2f6', p: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 3 }}>
                Input Inventaris Baru
              </Typography>
              <Stack spacing={2.5}>
                <TextField fullWidth label="Nama Barang Bangunan" variant="outlined" value={inputNama} onChange={(e) => setInputNama(e.target.value)} />
                <TextField fullWidth label="Stok" type="number" variant="outlined" value={inputStok} onChange={(e) => setInputStok(e.target.value)} />
                <TextField fullWidth label="Harga" type="number" variant="outlined" value={inputHarga} onChange={(e) => setInputHarga(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start">Rp</InputAdornment> }} />
                <Button variant="contained" fullWidth onClick={handleTambah} startIcon={<AddIcon />}
                  sx={{ bgcolor: '#384252', color: '#fff', p: 1.5, borderRadius: '10px', fontWeight: 700, textTransform: 'none', '&:hover': { bgcolor: '#1e293b' } }}>
                  Tambah Stok Barang
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0,0,0,0.02)', border: '1px solid #eef2f6', overflow: 'hidden' }}>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Data Inventaris Toko</Typography>
              <TextField size="small" placeholder="Cari produk bangunan..." value={cari} onChange={(e) => setCari(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8', fontSize: '1.2rem' }} /></InputAdornment> }}
                sx={{ width: 260, '& .MuiOutlinedInput-root': { borderRadius: '8px', bgcolor: '#f8fafc' } }} />
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ borderTop: '1px solid #f1f5f9' }}>
              <Table>
                <TableHead sx={{ bgcolor: '#1e88e5' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 700, pl: 3 }}>ID</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Nama Barang</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Stok</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Harga</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700, pr: 3 }} align="center">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {barang.length > 0 ? (
                    barang.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell sx={{ pl: 3, color: '#64748b', fontWeight: 600 }}>#{row.id}</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>{row.nama}</TableCell>
                        <TableCell sx={{ color: '#334155', fontWeight: 500 }}>{row.stok} unit</TableCell>
                        <TableCell sx={{ color: '#1e88e5', fontWeight: 700 }}>{row.harga}</TableCell>
                        <TableCell sx={{ pr: 3 }} align="center">
                          <Button variant="outlined" size="small" onClick={() => setViewDetailId(row.id)}
                            sx={{ textTransform: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '0.75rem' }}>
                            Lihat Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 6, color: '#94a3b8' }}>
                        {error ? error : "Barang tidak ditemukan dalam inventaris..."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InventarisToko;