import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Stack,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalanceWallet as WalletIcon,
  Receipt as ReceiptIcon,
  LocalShipping as ShippingIcon,
  Storefront as StoreIcon,
} from '@mui/icons-material';

// Fungsi format Rupiah
const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka);
};

const LaporanLabaRugiKaryawan = () => {
  const theme = useTheme();
  const [periode, setPeriode] = useState('Jan 2026');

  // Data dummy (bisa diganti dengan data dari API)
  const data = {
    pendapatan: 125_000_000,
    biaya: 87_500_000,
    labaBersih: 37_500_000,
    rincianPendapatan: [
      { label: 'Penjualan Produk A', nilai: 75_000_000 },
      { label: 'Penjualan Produk B', nilai: 50_000_000 },
    ],
    rincianBiaya: [
      { label: 'Biaya Bahan Baku', nilai: 40_000_000 },
      { label: 'Biaya Operasional', nilai: 30_000_000 },
      { label: 'Biaya Pengiriman', nilai: 17_500_000 },
    ],
  };

  // Warna tematik
  const colors = {
    pendapatan: '#2e7d32',
    biaya: '#d32f2f',
    laba: '#1976d2',
    bgPendapatan: '#e8f5e9',
    bgBiaya: '#ffebee',
    bgLaba: '#e3f2fd',
  };

  return (
    <Box sx={{ py: 4, bgcolor: '#f4f7fc', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          {/* Header */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
              color: 'white',
            }}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5" fontWeight={700}>
                  📊 Laporan Laba-Rugi
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Ringkasan keuangan periode{' '}
                  <Chip
                    label={periode}
                    size="small"
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                </Typography>
              </Grid>
              <Grid item>
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <Select
                    value={periode}
                    onChange={(e) => setPeriode(e.target.value)}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.15)',
                      color: 'white',
                      '& .MuiSelect-icon': { color: 'white' },
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  >
                    <MenuItem value="Jan 2026">Jan 2026</MenuItem>
                    <MenuItem value="Feb 2026">Feb 2026</MenuItem>
                    <MenuItem value="Mar 2026">Mar 2026</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Ringkasan Angka (3 Cards) */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${colors.bgPendapatan}, #c8e6c9)`,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <TrendingUpIcon sx={{ color: colors.pendapatan, fontSize: 32 }} />
                    <Typography variant="subtitle2" color="textSecondary" fontWeight={600}>
                      Total Pendapatan
                    </Typography>
                  </Stack>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: colors.pendapatan, mt: 1 }}
                  >
                    {formatRupiah(data.pendapatan)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${colors.bgBiaya}, #ffcdd2)`,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <TrendingDownIcon sx={{ color: colors.biaya, fontSize: 32 }} />
                    <Typography variant="subtitle2" color="textSecondary" fontWeight={600}>
                      Total Biaya
                    </Typography>
                  </Stack>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: colors.biaya, mt: 1 }}
                  >
                    {formatRupiah(data.biaya)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${colors.bgLaba}, #bbdefb)`,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <WalletIcon sx={{ color: colors.laba, fontSize: 32 }} />
                    <Typography variant="subtitle2" color="textSecondary" fontWeight={600}>
                      Laba Bersih
                    </Typography>
                  </Stack>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: colors.laba, mt: 1 }}
                  >
                    {formatRupiah(data.labaBersih)}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {((data.labaBersih / data.pendapatan) * 100).toFixed(1)}% margin
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Tabel Rincian */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <ReceiptIcon sx={{ color: colors.pendapatan }} />
                  <Typography variant="h6" fontWeight={700}>
                    Rincian Pendapatan
                  </Typography>
                </Stack>
                <TableContainer>
                  <Table size="medium">
                    <TableBody>
                      {data.rincianPendapatan.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <StoreIcon fontSize="small" color="primary" />
                              <Typography>{item.label}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            {formatRupiah(item.nilai)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Total Pendapatan</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                          {formatRupiah(data.pendapatan)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <TrendingDownIcon sx={{ color: colors.biaya }} />
                  <Typography variant="h6" fontWeight={700}>
                    Rincian Biaya
                  </Typography>
                </Stack>
                <TableContainer>
                  <Table size="medium">
                    <TableBody>
                      {data.rincianBiaya.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <ShippingIcon fontSize="small" color="error" />
                              <Typography>{item.label}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            {formatRupiah(item.nilai)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Total Biaya</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                          {formatRupiah(data.biaya)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>

          {/* Catatan kaki */}
          <Paper
            elevation={0}
            sx={{ p: 2, borderRadius: 3, bgcolor: 'background.paper' }}
          >
            <Typography variant="caption" color="textSecondary">
              * Data ini bersifat simulasi. Hubungkan dengan API keuangan untuk data riil.
            </Typography>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default LaporanLabaRugiKaryawan;