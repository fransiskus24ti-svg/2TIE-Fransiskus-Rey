import React, { useState, useMemo } from 'react';
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
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Receipt as ReceiptIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

// Data dummy retur barang - HANYA status 'Diproses' atau 'Selesai'
const dummyRetur = [
  { id: 1, namaBarang: 'Semen Tiga Roda', jumlah: 5, alasan: 'Rusak', status: 'Diproses', tanggal: '2026-01-15' },
  { id: 2, namaBarang: 'Cat Tembok Dulux', jumlah: 2, alasan: 'Salah warna', status: 'Selesai', tanggal: '2026-01-16' },
  { id: 3, namaBarang: 'Paku Beton 5cm', jumlah: 10, alasan: 'Karat', status: 'Selesai', tanggal: '2026-01-17' },
  { id: 4, namaBarang: 'Besi Beton 10mm', jumlah: 3, alasan: 'Benturan', status: 'Diproses', tanggal: '2026-01-18' },
  { id: 5, namaBarang: 'Keramik 40x40', jumlah: 4, alasan: 'Pecah', status: 'Selesai', tanggal: '2026-01-19' },
];

export default function ReturBarangKaryawan() {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [returData, setReturData] = useState(dummyRetur);

  // Statistik (hanya untuk Diproses & Selesai)
  const totalRetur = returData.length;
  const totalSelesai = returData.filter((x) => x.status === 'Selesai').length;
  const totalDiproses = returData.filter((x) => x.status === 'Diproses').length;

  // Filter data
  const filteredData = useMemo(() => {
    let data = returData;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      data = data.filter((x) => x.namaBarang.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') {
      data = data.filter((x) => x.status === statusFilter);
    }
    return data;
  }, [search, statusFilter, returData]);

  // Paginasi
  const paginatedData = useMemo(() => {
    return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleRefresh = () => {
    setSearch('');
    setStatusFilter('all');
    setPage(0);
  };
  const handleDelete = (id) => {
    setReturData(returData.filter((item) => item.id !== id));
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const getStatusChip = (status) => {
    if (status === 'Selesai') {
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="Selesai"
          size="small"
          sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 700 }}
        />
      );
    } else if (status === 'Diproses') {
      return (
        <Chip
          icon={<PendingIcon />}
          label="Diproses"
          size="small"
          sx={{ bgcolor: '#fff3e0', color: '#ed6c02', fontWeight: 700 }}
        />
      );
    }
    return <Chip label={status} size="small" />;
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
              background: 'linear-gradient(135deg, #bf360c 0%, #e64a19 100%)',
              color: 'white',
            }}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5" fontWeight={700}>
                  🔄 Retur Barang
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Manajemen retur dan pengembalian barang
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handleRefresh} sx={{ color: 'white' }}>
                  <RefreshIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>

          {/* Kartu Statistik (3 kartu: Total, Selesai, Diproses) */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ReceiptIcon color="primary" />
                    <Typography variant="subtitle2" color="textSecondary" fontWeight={600}>
                      Total Retur
                    </Typography>
                  </Stack>
                  <Typography variant="h4" fontWeight={800} sx={{ mt: 1 }}>
                    {totalRetur}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  borderLeft: `4px solid ${theme.palette.success.main}`,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CheckCircleIcon color="success" />
                    <Typography variant="subtitle2" color="textSecondary" fontWeight={600}>
                      Selesai
                    </Typography>
                  </Stack>
                  <Typography variant="h4" fontWeight={800} sx={{ mt: 1, color: 'success.main' }}>
                    {totalSelesai}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  borderLeft: `4px solid ${theme.palette.warning.main}`,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PendingIcon sx={{ color: theme.palette.warning.main }} />
                    <Typography variant="subtitle2" color="textSecondary" fontWeight={600}>
                      Diproses
                    </Typography>
                  </Stack>
                  <Typography variant="h4" fontWeight={800} sx={{ mt: 1, color: 'warning.main' }}>
                    {totalDiproses}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Filter & Pencarian */}
          <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Cari barang retur..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ bgcolor: 'background.paper' }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Filter Status</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Filter Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value="all">Semua</MenuItem>
                    <MenuItem value="Diproses">Diproses</MenuItem>
                    <MenuItem value="Selesai">Selesai</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenDialog}
                  sx={{ bgcolor: '#bf360c', '&:hover': { bgcolor: '#e64a19' } }}
                >
                  Tambah Retur
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Tabel Utama */}
          <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3 }}>
            <Table stickyHeader size="medium">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, bgcolor: '#fafafa' }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 700, bgcolor: '#fafafa' }}>Nama Barang</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, bgcolor: '#fafafa' }}>
                    Jumlah
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, bgcolor: '#fafafa' }}>Alasan</TableCell>
                  <TableCell sx={{ fontWeight: 700, bgcolor: '#fafafa' }}>Tanggal</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, bgcolor: '#fafafa' }}>
                    Status
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, bgcolor: '#fafafa' }}>
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="textSecondary">
                        Tidak ada retur barang ditemukan
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((row, index) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{row.namaBarang}</TableCell>
                      <TableCell align="right">{row.jumlah}</TableCell>
                      <TableCell>{row.alasan}</TableCell>
                      <TableCell>{row.tanggal}</TableCell>
                      <TableCell align="center">{getStatusChip(row.status)}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Baris per halaman"
            />
          </TableContainer>

          {/* Dialog Tambah Retur */}
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ bgcolor: '#bf360c', color: 'white' }}>
              Tambah Retur Barang
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Nama Barang" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Jumlah" type="number" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Alasan" variant="outlined" size="small" multiline rows={2} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select label="Status" defaultValue="Diproses">
                      <MenuItem value="Diproses">Diproses</MenuItem>
                      <MenuItem value="Selesai">Selesai</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Tanggal" type="date" variant="outlined" size="small" defaultValue="2026-01-20" />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseDialog} variant="outlined">
                Batal
              </Button>
              <Button onClick={handleCloseDialog} variant="contained" sx={{ bgcolor: '#bf360c' }}>
                Simpan
              </Button>
            </DialogActions>
          </Dialog>

          {/* Catatan Kaki */}
          <Paper
            elevation={0}
            sx={{ p: 2, borderRadius: 3, bgcolor: 'background.paper', textAlign: 'center' }}
          >
            <Typography variant="caption" color="textSecondary">
              * Data ini hanya simulasi. Hubungkan dengan API retur barang yang sebenarnya.
            </Typography>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}