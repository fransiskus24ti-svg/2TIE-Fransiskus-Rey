import React, { useMemo, useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Paper,
  Stack,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Button,
  IconButton,
  TextField,
  MenuItem,
  alpha,
} from '@mui/material';

import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';

import { styled } from '@mui/material/styles';

const GlassCard = styled(Card)(({ theme }) => ({
  borderRadius: '24px',
  backgroundColor: alpha(theme.palette.background.paper, 0.85),
  border: `1px solid ${alpha(theme.palette.divider, 0.14)}`,
  boxShadow: `0 10px 32px ${alpha(theme.palette.common.black, 0.06)}`,
}));

const StatusChip = styled(Chip)(({ theme, $tone }) => ({
  fontWeight: 800,
  borderRadius: '999px',
  padding: '5px 10px',
  backgroundColor: $tone === 'warning' ? alpha('#f59e0b', 0.12) : alpha('#10b981', 0.12),
  color: $tone === 'warning' ? '#b45309' : '#047857',
  border: `1px solid ${$tone === 'warning' ? alpha('#f59e0b', 0.26) : alpha('#10b981', 0.26)}`,
}));

const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka || 0);

const formatDate = (date) => {
  try {
    return new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: '2-digit' });
  } catch {
    return '-';
  }
};

function safeNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export default function LaporanBarangKaryawan() {
  // Load dari localStorage milik ManajemenKaryawan
  const [dataBarang, setDataBarang] = useState(() => {
    try {
      const raw = localStorage.getItem('data_toko');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [riwayat, setRiwayat] = useState(() => {
    try {
      const raw = localStorage.getItem('riwayat_toko');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [query, setQuery] = useState('');
  const [jenis, setJenis] = useState('all'); // all|masuk|keluar|penjualan
  const [showOnlyLowStock, setShowOnlyLowStock] = useState(false);

  const barangByNama = useMemo(() => new Map((dataBarang || []).map((b) => [b?.nama, b])), [dataBarang]);

  const riwayatNorm = useMemo(() => {
    // normalisasi bentuk seperti di ManajemenKaryawan
    const normalize = (r) => {
      const metode = r?.metode;
      const jenisRiwayat =
        r?.jenis ||
        (metode
          ? String(metode).toLowerCase().includes('masuk')
            ? 'masuk'
            : String(metode).toLowerCase().includes('keluar')
              ? 'keluar'
              : 'penjualan'
          : 'penjualan');

      return {
        ...r,
        jenis: jenisRiwayat,
        jenisLabel: jenisRiwayat === 'masuk' ? 'Masuk' : jenisRiwayat === 'keluar' ? 'Keluar' : 'Penjualan',
        qty: safeNumber(r?.qty),
        total: safeNumber(r?.total),
        nama: r?.nama,
        tgl: r?.tgl,
        tanggalLengkap: r?.tanggalLengkap || r?.tanggalLengkap,
        metodenya: r?.metode,
      };
    };

    return (riwayat || []).map(normalize);
  }, [riwayat]);

  const filteredRiwayat = useMemo(() => {
    const q = query.trim().toLowerCase();

    return riwayatNorm
      .filter((r) => {
        if (jenis !== 'all' && r.jenis !== jenis) return false;
        if (showOnlyLowStock) {
          const b = barangByNama.get(r?.nama);
          if (!b) return false;
          // pakai ambang sederhana: stok < 10 dianggap low
          if (safeNumber(b?.stok) >= 10) return false;
        }
        if (!q) return true;
        return String(r?.nama || '').toLowerCase().includes(q) || String(r?.metodenya || '').toLowerCase().includes(q);
      })
      .sort((a, b) => String(b?.id || '').localeCompare(String(a?.id || '')));
  }, [riwayatNorm, query, jenis, showOnlyLowStock, barangByNama]);

  const rekap = useMemo(() => {
    const masuk = filteredRiwayat.filter((r) => r.jenis === 'masuk');
    const keluar = filteredRiwayat.filter((r) => r.jenis === 'keluar');
    const penjualan = filteredRiwayat.filter((r) => r.jenis === 'penjualan');

    const totalQty = (arr) => arr.reduce((s, r) => s + safeNumber(r.qty), 0);
    const totalTotal = (arr) => arr.reduce((s, r) => s + safeNumber(r.total), 0);

    return {
      masukQty: totalQty(masuk),
      keluarQty: totalQty(keluar),
      penjualanQty: totalQty(penjualan),
      masukTotal: totalTotal(masuk),
      keluarTotal: totalTotal(keluar),
      penjualanTotal: totalTotal(penjualan),
      totalRows: filteredRiwayat.length,
    };
  }, [filteredRiwayat]);

  const handleRefresh = () => {
    // sync ulang
    try {
      const rawBarang = localStorage.getItem('data_toko');
      const rawRiwayat = localStorage.getItem('riwayat_toko');
      setDataBarang(rawBarang ? JSON.parse(rawBarang) : []);
      setRiwayat(rawRiwayat ? JSON.parse(rawRiwayat) : []);
    } catch {
      // ignore
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#f4f7fc', minHeight: '100vh' }}>
      <GlassCard sx={{ p: 3, mb: 2.5 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <StorefrontIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            <Box>
              <Typography variant="h4" fontWeight={900} color="primary.main">
                Laporan Barang Karyawan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rekap stok & aktivitas masuk/keluar/penjualan (mengacu ke data localStorage)
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
            <IconButton onClick={handleRefresh} sx={{ bgcolor: alpha('#3b82f6', 0.08) }}>
              <RefreshIcon />
            </IconButton>
            <Chip icon={<HistoryOutlinedIcon />} label={`${rekap.totalRows} record`} variant="outlined" />
          </Stack>
        </Stack>
      </GlassCard>

      {/* Rekap cepat */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} sm={4} md={4}>
          <GlassCard sx={{ p: 2, height: '100%' }}>
            <Stack spacing={0.6}>
              <Typography variant="caption" color="text.secondary">Masuk</Typography>
              <Typography variant="h6" fontWeight={900}>{rekap.masukQty} item</Typography>
              <Typography variant="body2" color="success.main">{formatRupiah(rekap.masukTotal)}</Typography>
            </Stack>
          </GlassCard>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <GlassCard sx={{ p: 2, height: '100%' }}>
            <Stack spacing={0.6}>
              <Typography variant="caption" color="text.secondary">Keluar</Typography>
              <Typography variant="h6" fontWeight={900}>{rekap.keluarQty} item</Typography>
              <Typography variant="body2" color="error.main">{formatRupiah(rekap.keluarTotal)}</Typography>
            </Stack>
          </GlassCard>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <GlassCard sx={{ p: 2, height: '100%' }}>
            <Stack spacing={0.6}>
              <Typography variant="caption" color="text.secondary">Penjualan</Typography>
              <Typography variant="h6" fontWeight={900}>{rekap.penjualanQty} item</Typography>
              <Typography variant="body2" color="primary.main">{formatRupiah(rekap.penjualanTotal)}</Typography>
            </Stack>
          </GlassCard>
        </Grid>
      </Grid>

      {/* Filter */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} md={6}>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            size="small"
            placeholder="Cari nama barang / metode..."
            InputProps={{ startAdornment: <SearchIcon style={{ marginRight: 8 }} /> }}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField select label="Jenis" value={jenis} onChange={(e) => setJenis(e.target.value)} fullWidth size="small">
            <MenuItem value="all">Semua</MenuItem>
            <MenuItem value="masuk">Masuk</MenuItem>
            <MenuItem value="keluar">Keluar</MenuItem>
            <MenuItem value="penjualan">Penjualan</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} md={3}>
          <Button
            fullWidth
            variant={showOnlyLowStock ? 'contained' : 'outlined'}
            onClick={() => setShowOnlyLowStock((s) => !s)}
            sx={{ borderRadius: 3, fontWeight: 900 }}
          >
            {showOnlyLowStock ? 'Low Stock: ON' : 'Low Stock: OFF'}
          </Button>
        </Grid>
      </Grid>

      {/* Tabel */}
      <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Box sx={{ px: 2.5, py: 1.8, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1.2} alignItems="center">
              <ReceiptLongOutlinedIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={900}>Laporan aktivitas barang</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip size="small" label="Klik refresh jika data terbaru" variant="outlined" />
            </Stack>
          </Stack>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 560 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 900 }}>Tanggal</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Jam</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Jenis</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Barang</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900 }}>Qty</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900 }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Stok Saat Ini</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRiwayat.slice(0, 120).map((r) => {
                const b = barangByNama.get(r.nama);
                const stokSaatIni = safeNumber(b?.stok);
                const low = stokSaatIni < 10;

                return (
                  <TableRow key={r.id} hover>
                    <TableCell>{formatDate(r?.tanggalLengkap)}</TableCell>
                    <TableCell>{r?.tgl || '-'}</TableCell>
                    <TableCell>
                      <StatusChip
                        $tone={r.jenis === 'keluar' ? 'warning' : 'success'}
                        size="small"
                        label={r.jenisLabel}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>{r.nama || '-'}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800 }}>{r.qty}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800 }}>{formatRupiah(r.total)}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        variant={low ? 'filled' : 'outlined'}
                        color={low ? 'warning' : 'default'}
                        label={stokSaatIni}
                        sx={low ? { fontWeight: 900 } : { fontWeight: 700 }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}

              {filteredRiwayat.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary" fontWeight={800}>
                      Tidak ada data sesuai filter
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider />
        <Box sx={{ p: 2.2 }}>
          <Typography variant="caption" color="text.secondary">
            Tampilan ini mengambil data dari localStorage: <b>data_toko</b> dan <b>riwayat_toko</b>.
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
