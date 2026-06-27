import React, { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  AccountBalanceWallet as WalletIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

// Dummy data piutang
const dummyPiutang = [
  { id: 'P-001', pelanggan: 'Toko Bangunan Jaya', jumlah: 1500000, tanggal: '2026-01-05', jatuhTempo: '2026-02-05', status: 'Belum Lunas' },
  { id: 'P-002', pelanggan: 'CV. Karya Mandiri', jumlah: 2500000, tanggal: '2026-01-10', jatuhTempo: '2026-02-10', status: 'Lunas' },
  { id: 'P-003', pelanggan: 'UD. Sumber Rezeki', jumlah: 3500000, tanggal: '2026-01-12', jatuhTempo: '2026-02-12', status: 'Overdue' },
  { id: 'P-004', pelanggan: 'Toko Elektronik Sentosa', jumlah: 1000000, tanggal: '2026-01-15', jatuhTempo: '2026-02-15', status: 'Belum Lunas' },
  { id: 'P-005', pelanggan: 'PT. Mega Jaya', jumlah: 5000000, tanggal: '2026-01-18', jatuhTempo: '2026-02-18', status: 'Lunas' },
  { id: 'P-006', pelanggan: 'Toko Material Abadi', jumlah: 800000, tanggal: '2026-01-20', jatuhTempo: '2026-02-20', status: 'Overdue' },
];

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
};

const statusConfig = {
  'Lunas': { bg: '#e8f5e9', color: '#2e7d32', icon: <CheckCircleIcon />, label: 'Lunas' },
  'Belum Lunas': { bg: '#fff3e0', color: '#ed6c02', icon: <ScheduleIcon />, label: 'Belum Lunas' },
  'Overdue': { bg: '#ffebee', color: '#c62828', icon: <WarningIcon />, label: 'Overdue' },
};

export default function ManajemenPiutangKaryawan() {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Statistik
  const totalPiutang = dummyPiutang.length;
  const totalNominal = dummyPiutang.reduce((acc, cur) => acc + cur.jumlah, 0);
  const lunas = dummyPiutang.filter(x => x.status === 'Lunas').length;
  const belumLunas = dummyPiutang.filter(x => x.status === 'Belum Lunas').length;
  const overdue = dummyPiutang.filter(x => x.status === 'Overdue').length;

  // Filter
  const filteredData = useMemo(() => {
    let data = dummyPiutang;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      data = data.filter(x =>
        x.pelanggan.toLowerCase().includes(q) ||
        x.id.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') {
      data = data.filter(x => x.status === statusFilter);
    }
    return data;
  }, [search, statusFilter]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const handleRefresh = () => {
    setSearch('');
    setStatusFilter('all');
    setPage(0);
  };

  return (
    <Box sx={{ py: 4, bgcolor: '#f4f7fc', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          {/* Header Gradien */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #004d40 0%, #00695c 100%)',
              color: 'white',
            }}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5" fontWeight={700}>
                  📋 Manajemen Piutang (Bon)
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Kelola tagihan dan pembayaran pelanggan
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handleRefresh} sx={{ color: 'white' }}>
                  <RefreshIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>

          {/* Statistik */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 3, borderLeft: `4px solid ${theme.palette.primary.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <WalletIcon color="primary" />
                    <Typography variant="subtitle2" color="textSecondary" fontWeight={600}>Total Piutang</Typography>
                  </Stack>
                  <Typography variant="h4" fontWeight={800}>{totalPiutang}</Typography>
                  <Typography variant="caption" color="textSecondary">{formatRupiah(totalNominal)}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 3, borderLeft: `4px solid ${theme.palette.success.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CheckCircleIcon color="success" />
                    <Typography variant="subtitle2" color="textSecondary" fontWeight={600}>Lunas</Typography>
                  </Stack>
                  <Typography variant="h4" fontWeight={800} color="success.main">{lunas}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 3, borderLeft: `4px solid ${theme.palette.warning.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ScheduleIcon sx={{ color: theme.palette.warning.main }} />
                    <Typography variant="subtitle2" color="textSecondary" fontWeight={600}>Belum Lunas</Typography>
                  </Stack>
                  <Typography variant="h4" fontWeight={800} color="warning.main">{belumLunas}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 3, borderLeft: `4px solid ${theme.palette.error.main}` }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <WarningIcon color="error" />
                    <Typography variant="subtitle2" color="textSecondary" fontWeight={600}>Overdue</Typography>
                  </Stack>
                  <Typography variant="h4" fontWeight={800} color="error.main">{overdue}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Filter & Pencarian */}
          <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth size="small"
                  placeholder="Cari ID atau pelanggan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Filter Status</InputLabel>
                  <Select value={statusFilter} label="Filter Status" onChange={(e) => setStatusFilter(e.target.value)}>
                    <MenuItem value="all">Semua</MenuItem>
                    <MenuItem value="Lunas">Lunas</MenuItem>
                    <MenuItem value="Belum Lunas">Belum Lunas</MenuItem>
                    <MenuItem value="Overdue">Overdue</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography variant="body2" color="textSecondary" align="center">Total: {filteredData.length}</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Tabel */}
          <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, bgcolor: '#fafafa' }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 700, bgcolor: '#fafafa' }}>ID Bon</TableCell>
                  <TableCell sx={{ fontWeight: 700, bgcolor: '#fafafa' }}>Pelanggan</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, bgcolor: '#fafafa' }}>Jumlah</TableCell>
                  <TableCell sx={{ fontWeight: 700, bgcolor: '#fafafa' }}>Tanggal</TableCell>
                  <TableCell sx={{ fontWeight: 700, bgcolor: '#fafafa' }}>Jatuh Tempo</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, bgcolor: '#fafafa' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="textSecondary">Tidak ada data</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((row, idx) => {
                    const st = statusConfig[row.status] || { bg: '#f5f5f5', color: '#616161', icon: null };
                    return (
                      <TableRow key={row.id} hover>
                        <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{row.id}</TableCell>
                        <TableCell>{row.pelanggan}</TableCell>
                        <TableCell align="right">{formatRupiah(row.jumlah)}</TableCell>
                        <TableCell>{row.tanggal}</TableCell>
                        <TableCell>{row.jatuhTempo}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={st.label}
                            size="small"
                            icon={st.icon}
                            sx={{ bgcolor: st.bg, color: st.color, fontWeight: 700 }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, p) => setPage(p)}
              onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
              labelRowsPerPage="Baris per halaman"
            />
          </TableContainer>
        </Stack>
      </Container>
    </Box>
  );
}