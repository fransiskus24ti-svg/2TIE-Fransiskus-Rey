import React, { useState, useMemo } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { alpha, useTheme } from '@mui/material/styles';

import {
  TrendingUp,
  AttachMoney,
  Inventory,
  Receipt,
  Download,
  Refresh,
  LocalShipping,
  People,
} from '@mui/icons-material';

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(angka || 0));
};

const formatDate = (d) => {
  try {
    return new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: '2-digit' });
  } catch {
    return '-';
  }
};

const filterTransactionsByDate = (transactions, filterType) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (filterType) {
    case 'today':
      return transactions.filter((t) => new Date(t.tanggalLengkap) >= today);
    case 'week': {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return transactions.filter((t) => new Date(t.tanggalLengkap) >= weekAgo);
    }
    case 'month': {
      const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      return transactions.filter((t) => new Date(t.tanggalLengkap) >= monthAgo);
    }
    default:
      return transactions;
  }
};

function safeNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export default function LaporanKeuanganKaryawan() {
  const theme = useTheme();

  const [riwayat] = useState(() => {
    const savedRiwayat = localStorage.getItem('riwayat_toko');
    if (!savedRiwayat) return [];
    try {
      const parsed = JSON.parse(savedRiwayat);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [filterType, setFilterType] = useState('week');
  const [profitMarginPercent, setProfitMarginPercent] = useState(25);
  const [query, setQuery] = useState('');

  const filteredData = useMemo(() => {
    const base = filterTransactionsByDate(riwayat, filterType);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter((item) => {
      return (
        String(item?.nama || '').toLowerCase().includes(q) ||
        String(item?.metode || item?.jenis || '').toLowerCase().includes(q)
      );
    });
  }, [riwayat, filterType, query]);

  const stats = useMemo(() => {
    let totalPendapatan = 0;
    let totalProdukTerjual = 0;
    const productSales = {};

    filteredData.forEach((item) => {
      totalPendapatan += safeNumber(item.total);
      totalProdukTerjual += safeNumber(item.qty);
      const nama = item?.nama || 'Unknown';
      productSales[nama] = (productSales[nama] || 0) + safeNumber(item.total);
    });

    const totalKeuntungan = totalPendapatan * (profitMarginPercent / 100);
    const rataTransaksi = filteredData.length > 0 ? totalPendapatan / filteredData.length : 0;

    const topProducts = Object.entries(productSales)
      .map(([nama, omset]) => ({ nama, omset }))
      .sort((a, b) => b.omset - a.omset)
      .slice(0, 5);

    return {
      totalPendapatan,
      totalProdukTerjual,
      totalKeuntungan,
      rataTransaksi,
      jumlahTransaksi: filteredData.length,
      topProducts,
    };
  }, [filteredData, profitMarginPercent]);

  const handleExport = () => {
    const headers = ['Tanggal', 'Waktu', 'Nama Barang', 'Jumlah', 'Harga Satuan', 'Total'];
    const rows = filteredData.map((item) => [
      item.tanggalLengkap,
      item.tgl,
      item.nama,
      item.qty,
      formatRupiah(item.hargaSatuan),
      formatRupiah(item.total),
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan_keuangan_karyawan_${new Date().toISOString().slice(0, 19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => window.location.reload();

  const CardStat = ({ title, value, sub, icon, color }) => {
    return (
      <Card
        sx={{
          borderRadius: '16px',
          p: 2,
          bgcolor: alpha(color, 0.06),
          border: `1px solid ${alpha(color, 0.18)}`,
          boxShadow: 'none',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800 }}>
              {title}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 900, color: color }}>
              {value}
            </Typography>
            {sub && (
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                {sub}
              </Typography>
            )}
          </Stack>
          {icon}
        </Stack>
      </Card>
    );
  };

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header ringkas (karyawan-first) */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Export CSV">
          <IconButton onClick={handleExport} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.08) }}>
            <Download />
          </IconButton>
        </Tooltip>
        <Tooltip title="Refresh Data">
          <IconButton onClick={handleRefresh} sx={{ bgcolor: alpha(theme.palette.info.main, 0.08) }}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      <Card sx={{ mb: 2.5, borderRadius: 4, p: 2 }} variant="outlined">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ md: 'center' }}>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {[
              { value: 'today', label: 'Hari Ini' },
              { value: 'week', label: 'Minggu Ini' },
              { value: 'month', label: 'Bulan Ini' },
              { value: 'all', label: 'Semua' },
            ].map((opt) => (
              <Chip
                key={opt.value}
                label={opt.label}
                onClick={() => setFilterType(opt.value)}
                clickable
                color={filterType === opt.value ? 'primary' : 'default'}
                variant={filterType === opt.value ? 'filled' : 'outlined'}
                sx={{ fontWeight: 900 }}
              />
            ))}
          </Stack>

          <Box sx={{ ml: { md: 'auto' }, display: 'flex', gap: 1, alignItems: 'center', width: { xs: '100%', md: 'auto' }, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ fontWeight: 900, color: 'text.secondary' }}>
              Margin
            </Typography>
            <TextField
              size="small"
              type="number"
              value={profitMarginPercent}
              onChange={(e) => setProfitMarginPercent(Number(e.target.value))}
              sx={{ width: 110 }}
              InputProps={{
                endAdornment: <Box component="span" sx={{ mr: 1, fontWeight: 900 }}>%</Box>,
              }}
            />
            <TextField
              size="small"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari barang / metode..."
              sx={{ width: { xs: '100%', md: 320 } }}
            />
          </Box>
        </Stack>
      </Card>

      {/* Kartu statistik (UI berbeda dari admin: tanpa chart, lebih ringkas) */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <CardStat
            title="TOTAL PENDAPATAN"
            value={formatRupiah(stats.totalPendapatan)}
            sub={`${stats.jumlahTransaksi} transaksi`}
            icon={<AttachMoney sx={{ color: theme.palette.primary.main, fontSize: 30 }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardStat
            title="ESTIMASI KEUNTUNGAN"
            value={formatRupiah(stats.totalKeuntungan)}
            sub={`${profitMarginPercent}% margin`}
            icon={<TrendingUp sx={{ color: theme.palette.success.main, fontSize: 30 }} />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardStat
            title="PRODUK TERJUAL"
            value={`${stats.totalProdukTerjual} pcs`}
            sub="akumulasi qty"
            icon={<Inventory sx={{ color: theme.palette.info.main, fontSize: 30 }} />}
            color={theme.palette.info.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardStat
            title="RATA-RATA TRANSAKSI"
            value={formatRupiah(stats.rataTransaksi)}
            sub="per item"
            icon={<Receipt sx={{ color: theme.palette.warning.main, fontSize: 30 }} />}
            color={theme.palette.warning.main}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ borderRadius: 3, overflow: 'hidden' }} variant="outlined">
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocalShippingLocal />
                  <Typography sx={{ fontWeight: 900 }}>Rincian Transaksi</Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800 }}>
                  {filteredData.length} baris
                </Typography>
              </Stack>
            </Box>

            <TableContainer sx={{ maxHeight: 560 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 900 }}>Tanggal</TableCell>
                    <TableCell sx={{ fontWeight: 900 }}>Waktu</TableCell>
                    <TableCell sx={{ fontWeight: 900 }}>Produk</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 900 }}>Qty</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 900 }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                        <Typography color="text.secondary" fontWeight={900}>
                          Tidak ada transaksi
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.slice(0, 200).map((item, idx) => (
                      <TableRow key={idx} hover>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{formatDate(item.tanggalLengkap)}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.tgl || '-'}</TableCell>
                        <TableCell sx={{ fontWeight: 800 }}>{item.nama || '-'}</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800 }}>{item.qty}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 900, color: 'success.main' }}>
                          {formatRupiah(item.total)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ borderRadius: 3, p: 2.2 }} variant="outlined">
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <People sx={{ color: theme.palette.primary.main }} />
                <Typography sx={{ fontWeight: 900 }}>Produk Terlaris</Typography>
              </Stack>
              <Chip size="small" label="Top 5" sx={{ fontWeight: 900 }} />
            </Stack>

            <Divider sx={{ mb: 1.2 }} />

            <Stack spacing={1}>
              {stats.topProducts.length === 0 ? (
                <Typography color="text.secondary" fontWeight={900} align="center" sx={{ py: 4 }}>
                  Belum ada data
                </Typography>
              ) : (
                stats.topProducts.map((p, i) => (
                  <Box
                    key={p.nama}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      px: 1.2,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.06),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                    }}
                  >
                    <Typography sx={{ fontWeight: 900 }}>
                      #{i + 1} {p.nama}
                    </Typography>
                    <Typography sx={{ fontWeight: 900, color: theme.palette.primary.main }}>
                      {formatRupiah(p.omset)}
                    </Typography>
                  </Box>
                ))
              )}
            </Stack>

            <Divider sx={{ mt: 1.6, mb: 1.2 }} />

            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
              Catatan: tampilan khusus karyawan dan mengambil data dari <b>localStorage riwayat_toko</b>.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

function LocalShippingLocal() {
  return <LocalShipping sx={{ color: '#1976d2' }} />;
}



