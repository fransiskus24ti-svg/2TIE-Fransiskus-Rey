import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Chip,
  Stack,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer, // ✅ import ditambahkan
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import {
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  LocalPrintshop as PrintIcon,
  WarningAmber as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';

// ========== Konstanta & Helper ==========
const STATUS_OPTIONS = [
  { value: 'Semua', label: 'Semua' },
  { value: 'Jatuh Tempo', label: 'Jatuh Tempo' },
  { value: 'Belum Jatuh Tempo', label: 'Belum Jatuh Tempo' },
  { value: 'Lunas', label: 'Lunas' },
];

const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);

// Data dummy dengan tanggal lebih realistis
const BonPiutangDummy = [
  {
    id: 'BN-001',
    nama: 'Toko Jaya Abadi',
    sisa: 12000000,
    tempo: 'Besok',
    jatuhTempoDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    status: 'Jatuh Tempo',
    metode: 'Bon/Kredit',
  },
  {
    id: 'BN-002',
    nama: 'Kontraktor Budi',
    sisa: 4500000,
    tempo: '14 Jun 2026',
    jatuhTempoDate: new Date('2026-06-14T00:00:00'),
    status: 'Belum Jatuh Tempo',
    metode: 'Bon/Kredit',
  },
  {
    id: 'BN-003',
    nama: 'CV Karya Mandiri',
    sisa: 7200000,
    tempo: '20 Jun 2026',
    jatuhTempoDate: new Date('2026-06-20T00:00:00'),
    status: 'Belum Jatuh Tempo',
    metode: 'Bon/Kredit',
  },
  {
    id: 'BN-004',
    nama: 'UD Bina Usaha',
    sisa: 0,
    tempo: '-',
    jatuhTempoDate: null,
    status: 'Lunas',
    metode: 'Tunai',
  },
  {
    id: 'BN-005',
    nama: 'PT Sumber Rejeki',
    sisa: 21500000,
    tempo: '30 Jun 2026',
    jatuhTempoDate: new Date('2026-06-30T00:00:00'),
    status: 'Belum Jatuh Tempo',
    metode: 'Bon/Kredit',
  },
  {
    id: 'BN-006',
    nama: 'Toko Mebel Jaya',
    sisa: 8300000,
    tempo: '5 Jul 2026',
    jatuhTempoDate: new Date('2026-07-05T00:00:00'),
    status: 'Belum Jatuh Tempo',
    metode: 'Bon/Kredit',
  },
];

const statusColor = (status) => {
  switch (status) {
    case 'Jatuh Tempo':
      return { chipBg: 'rgba(239,68,68,0.12)', chipText: '#ef4444', bar: '#ef4444', icon: <WarningIcon fontSize="small" /> };
    case 'Belum Jatuh Tempo':
      return { chipBg: 'rgba(245,158,11,0.12)', chipText: '#f59e0b', bar: '#f59e0b', icon: null };
    case 'Lunas':
      return { chipBg: 'rgba(16,185,129,0.12)', chipText: '#10b981', bar: '#10b981', icon: <CheckCircleIcon fontSize="small" /> };
    default:
      return { chipBg: 'rgba(100,116,139,0.12)', chipText: '#64748b', bar: '#64748b', icon: null };
  }
};

// ========== Komponen Utama ==========
export default function BonPiutangAdmin() {
  const [items, setItems] = useState(BonPiutangDummy);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  // State untuk sorting
  const [sortBy, setSortBy] = useState(null); // 'id' | 'nama' | 'sisa' | 'tempo' | 'status'
  const [sortOrder, setSortOrder] = useState('asc');

  // State dialog hapus & mark lunas
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: '', // 'delete' or 'lunas'
    id: null,
    nama: '',
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // ===== Filter & Sorting =====
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = items.filter((x) => {
      const matchQ =
        !q ||
        x.nama.toLowerCase().includes(q) ||
        x.id.toLowerCase().includes(q) ||
        x.metode.toLowerCase().includes(q);
      const matchStatus = filterStatus === 'Semua' || x.status === filterStatus;
      return matchQ && matchStatus;
    });

    // Sorting
    if (sortBy) {
      result = [...result].sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];
        if (sortBy === 'sisa') {
          valA = a.sisa || 0;
          valB = b.sisa || 0;
        }
        if (sortBy === 'tempo') {
          // sort by date if possible, else string
          const dateA = a.jatuhTempoDate ? new Date(a.jatuhTempoDate) : null;
          const dateB = b.jatuhTempoDate ? new Date(b.jatuhTempoDate) : null;
          if (dateA && dateB) {
            valA = dateA.getTime();
            valB = dateB.getTime();
          } else {
            valA = a.tempo;
            valB = b.tempo;
          }
        }
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [items, search, filterStatus, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paged = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Statistik
  const stats = useMemo(() => {
    const totalSisa = items.reduce((sum, x) => sum + (x.sisa || 0), 0);
    const jatuhTempo = items.filter((x) => x.status === 'Jatuh Tempo' && (x.sisa || 0) > 0).length;
    const belum = items.filter((x) => x.status === 'Belum Jatuh Tempo' && (x.sisa || 0) > 0).length;
    const lunas = items.filter((x) => x.status === 'Lunas').length;
    return { totalSisa, jatuhTempo, belum, lunas };
  }, [items]);

  // ===== Handler =====
  const handleRefresh = () => {
    setItems(BonPiutangDummy);
    setSortBy(null);
    setSortOrder('asc');
    setPage(1);
    setSnackbar({ open: true, message: 'Data berhasil direset ke awal', severity: 'success' });
  };

  const handleExport = () => {
    const headers = ['ID', 'Nama', 'Sisa', 'Tempo', 'Status', 'Metode'];
    const rows = filtered.map((x) => [x.id, x.nama, x.sisa, x.tempo, x.status, x.metode]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bon_piutang_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setSnackbar({ open: true, message: 'Export CSV berhasil', severity: 'success' });
  };

  const handlePrint = () => window.print();

  // Handler untuk menandai lunas dengan konfirmasi
  const handleMarkLunas = (id, nama) => {
    setConfirmDialog({ open: true, type: 'lunas', id, nama });
  };

  const confirmMarkLunas = () => {
    const { id } = confirmDialog;
    setItems((prev) =>
      prev.map((x) =>
        x.id === id ? { ...x, sisa: 0, status: 'Lunas', tempo: '-', metode: 'Tunai' } : x
      )
    );
    setSnackbar({ open: true, message: `Nota ${id} berhasil ditandai lunas`, severity: 'success' });
    setConfirmDialog({ open: false, type: '', id: null, nama: '' });
  };

  // Handler hapus data
  const handleDelete = (id, nama) => {
    setConfirmDialog({ open: true, type: 'delete', id, nama });
  };

  const confirmDelete = () => {
    const { id } = confirmDialog;
    setItems((prev) => prev.filter((x) => x.id !== id));
    setSnackbar({ open: true, message: `Data ${id} berhasil dihapus`, severity: 'success' });
    setConfirmDialog({ open: false, type: '', id: null, nama: '' });
  };

  const closeConfirm = () => {
    setConfirmDialog({ open: false, type: '', id: null, nama: '' });
  };

  // Handler sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Helper untuk menampilkan ikon sorting
  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />;
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f1f5f9', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', mb: 0.5 }}>
          Bon / Piutang (Admin)
        </Typography>
        <Typography variant="body1" sx={{ color: '#475569' }}>
          Pantau saldo bon/piutang pelanggan dan lakukan aksi seperti penandaan lunas atau hapus data.
        </Typography>
      </Box>

      {/* Statistik Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 4, p: 2.5, bgcolor: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#334155', textTransform: 'uppercase' }}>
              Total Sisa
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#2563eb', mt: 1 }}>
              {formatRupiah(stats.totalSisa)}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 4, p: 2.5, bgcolor: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#334155', textTransform: 'uppercase' }}>
              Jatuh Tempo
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#ef4444', mt: 1 }}>
              {stats.jatuhTempo} Nota
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 4, p: 2.5, bgcolor: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#334155', textTransform: 'uppercase' }}>
              Belum Jatuh Tempo
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#f59e0b', mt: 1 }}>
              {stats.belum} Nota
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 4, p: 2.5, bgcolor: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#334155', textTransform: 'uppercase' }}>
              Lunas
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#10b981', mt: 1 }}>
              {stats.lunas} Nota
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Kontrol: Search, Filter, Actions */}
      <Card sx={{ borderRadius: 4, p: 2.5, mb: 3 }} variant="outlined">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Cari nama / ID / metode..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <Box sx={{ display: 'flex', alignItems: 'center', pr: 1, color: '#94a3b8' }}>
                    <SearchIcon fontSize="small" />
                  </Box>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: 'background.paper' } }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              size="small"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setPage(1);
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: 'background.paper' } }}
            >
              {STATUS_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={5}>
            <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
              <Tooltip title="Export CSV">
                <IconButton onClick={handleExport}>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cetak">
                <IconButton onClick={handlePrint}>
                  <PrintIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reset Data">
                <IconButton onClick={handleRefresh}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </Card>

      {/* Peringatan Jatuh Tempo */}
      {stats.jatuhTempo > 0 && (
        <Paper sx={{ p: 1.8, borderRadius: 3, mb: 3, border: '1px solid rgba(239,68,68,0.25)', bgcolor: 'rgba(239,68,68,0.06)' }}>
          <Stack direction="row" spacing={1.2} alignItems="center">
            <WarningIcon sx={{ color: '#ef4444' }} />
            <Typography fontWeight={800} color="#991b1b">
              Peringatan: ada {stats.jatuhTempo} nota jatuh tempo. Segera lakukan tindakan!
            </Typography>
          </Stack>
        </Paper>
      )}

      {/* Tabel */}
      <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 900, cursor: 'pointer' }}
                onClick={() => handleSort('id')}
              >
                ID {getSortIcon('id')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 900, cursor: 'pointer' }}
                onClick={() => handleSort('nama')}
              >
                Nama {getSortIcon('nama')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 900, cursor: 'pointer' }}
                onClick={() => handleSort('sisa')}
              >
                Sisa {getSortIcon('sisa')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 900, cursor: 'pointer' }}
                onClick={() => handleSort('tempo')}
              >
                Tempo {getSortIcon('tempo')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 900, cursor: 'pointer' }}
                onClick={() => handleSort('status')}
              >
                Status {getSortIcon('status')}
              </TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                  <Typography color="text.secondary">Tidak ada data bon/piutang yang sesuai.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              paged.map((row) => {
                const c = statusColor(row.status);
                return (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      <Chip label={row.id} size="small" sx={{ bgcolor: 'rgba(37,99,235,0.08)', color: '#2563eb', fontWeight: 800 }} />
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={800}>{row.nama}</Typography>
                      <Typography variant="caption" color="text.secondary">{row.metode}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={900} color={row.sisa > 0 ? c.chipText : 'text.secondary'}>
                        {row.sisa > 0 ? formatRupiah(row.sisa) : '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={row.jatuhTempoDate ? row.jatuhTempoDate.toLocaleDateString('id-ID') : 'Tidak ada tanggal'}>
                        <Typography fontWeight={700}>{row.tempo}</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        icon={c.icon}
                        sx={{
                          bgcolor: c.chipBg,
                          color: c.chipText,
                          fontWeight: 900,
                          '& .MuiChip-icon': { color: c.chipText },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {row.status !== 'Lunas' && (
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ bgcolor: c.bar, textTransform: 'none', borderRadius: 2, fontWeight: 900 }}
                            onClick={() => handleMarkLunas(row.id, row.nama)}
                          >
                            Tandai Lunas
                          </Button>
                        )}
                        {row.status === 'Lunas' && (
                          <Chip label="Selesai" size="small" variant="outlined" sx={{ fontWeight: 900, color: '#10b981', borderColor: '#10b981' }} />
                        )}
                        <Tooltip title="Hapus data">
                          <IconButton size="small" onClick={() => handleDelete(row.id, row.nama)} sx={{ color: '#ef4444' }}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination + Info */}
      {filtered.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2, flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            Menampilkan {((page - 1) * rowsPerPage) + 1}–{Math.min(page * rowsPerPage, filtered.length)} dari {filtered.length} data
          </Typography>
          {totalPages > 1 && (
            <Pagination count={totalPages} page={page} onChange={(_, p) => setPage(p)} color="primary" />
          )}
        </Box>
      )}

      {/* Dialog Konfirmasi */}
      <Dialog open={confirmDialog.open} onClose={closeConfirm}>
        <DialogTitle>
          {confirmDialog.type === 'lunas' ? 'Tandai Lunas' : 'Hapus Data'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmDialog.type === 'lunas'
              ? `Apakah Anda yakin ingin menandai nota ${confirmDialog.id} (${confirmDialog.nama}) sebagai lunas?`
              : `Apakah Anda yakin ingin menghapus data ${confirmDialog.id} (${confirmDialog.nama})? Tindakan ini tidak dapat dibatalkan.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm}>Batal</Button>
          <Button
            onClick={confirmDialog.type === 'lunas' ? confirmMarkLunas : confirmDelete}
            color={confirmDialog.type === 'lunas' ? 'success' : 'error'}
            variant="contained"
          >
            {confirmDialog.type === 'lunas' ? 'Ya, Lunas' : 'Hapus'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifikasi */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}