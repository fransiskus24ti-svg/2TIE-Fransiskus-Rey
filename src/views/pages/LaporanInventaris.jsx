import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  Paper,
  Button,
  Chip,
  Stack,
  Divider,
  Avatar,
  Tooltip,
  IconButton,
  TextField,
  MenuItem,
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  WarningAmber as WarningIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

// =========================== DATA DUMMY TOKO BANGUNAN ===========================
const INVENTORY_DATA = [
  { id: 'INV-001', name: 'Semen Merah Putih 50kg', category: 'Material Bangunan', stock: 150, price: 52000, status: 'Tersedia' },
  { id: 'INV-002', name: 'Batu Bata Merah (1000 pcs)', category: 'Material Bangunan', stock: 20, price: 850000, status: 'Tersedia' },
  { id: 'INV-003', name: 'Pasir Bangunan 1 Colt', category: 'Material Bangunan', stock: 8, price: 1200000, status: 'Tersedia' },
  { id: 'INV-004', name: 'Besi Beton 10mm (12m)', category: 'Material Bangunan', stock: 35, price: 75000, status: 'Tersedia' },
  { id: 'INV-005', name: 'Cat Tembok 5kg', category: 'Cat', stock: 45, price: 180000, status: 'Tersedia' },
  { id: 'INV-006', name: 'Pipa PVC 1/2" (4m)', category: 'Pipa', stock: 120, price: 25000, status: 'Tersedia' },
  { id: 'INV-007', name: 'Keramik Lantai 40x40 (box)', category: 'Material Bangunan', stock: 5, price: 65000, status: 'Stok Rendah' },
  { id: 'INV-008', name: 'Genteng Metal (1 lbr)', category: 'Material Bangunan', stock: 0, price: 45000, status: 'Habis' },
  { id: 'INV-009', name: 'Palu Konstruksi', category: 'Alat', stock: 25, price: 120000, status: 'Tersedia' },
  { id: 'INV-010', name: 'Meteran 10m', category: 'Alat', stock: 18, price: 40000, status: 'Tersedia' },
  { id: 'INV-011', name: 'Dynamo Listrik 1 HP', category: 'Alat', stock: 3, price: 2500000, status: 'Stok Rendah' },
  { id: 'INV-012', name: 'Lem Pipa 100ml', category: 'Material Bangunan', stock: 60, price: 15000, status: 'Tersedia' },
  { id: 'INV-013', name: 'Seng Gelombang (1 lbr)', category: 'Material Bangunan', stock: 40, price: 85000, status: 'Tersedia' },
  { id: 'INV-014', name: 'Baut & Mur M10 (1 kg)', category: 'Material Bangunan', stock: 10, price: 25000, status: 'Stok Rendah' },
  { id: 'INV-015', name: 'Gerinda Tangan 4"', category: 'Alat', stock: 7, price: 650000, status: 'Tersedia' },
];

const CATEGORIES = ['Semua', 'Material Bangunan', 'Cat', 'Pipa', 'Alat'];
const STATUS_OPTIONS = ['Semua', 'Tersedia', 'Stok Rendah', 'Habis'];

const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);

// =========================== GRAFIK BATANG ===========================
const BarChart = ({ data, height = 180 }) => {
  const maxVal = Math.max(...data.map((d) => d.stock));
  return (
    <Box sx={{ width: '100%', height, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
      {data.map((item, idx) => {
        const percent = (item.stock / maxVal) * 100;
        return (
          <Tooltip key={idx} title={`${item.name}: ${item.stock} unit`} arrow placement="top">
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <Box
                sx={{
                  width: '100%',
                  height: `${Math.max(percent, 3)}%`,
                  minHeight: '6px',
                  borderRadius: '4px 4px 0 0',
                  background: 'linear-gradient(180deg, #8b5cf6, #c4b5fd)',
                  transition: 'height 0.4s ease',
                  '&:hover': { opacity: 0.8, transform: 'scaleY(1.02)', transformOrigin: 'bottom' },
                }}
              />
              <Typography variant="caption" sx={{ mt: 0.5, color: '#64748b', fontSize: '9px', fontWeight: 600, textAlign: 'center', maxWidth: '100%' }}>
                {item.name.length > 12 ? item.name.slice(0, 10) + '…' : item.name}
              </Typography>
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
};

// =========================== DONUT CHART ===========================
const DonutChart = ({ data, size = 130 }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  let angle = 0;
  const segments = data.map((item) => {
    const percent = (item.value / total) * 100;
    const start = angle;
    const end = angle + (percent / 100) * 360;
    angle = end;
    const startRad = (start - 90) * (Math.PI / 180);
    const endRad = (end - 90) * (Math.PI / 180);
    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);
    const large = percent > 50 ? 1 : 0;
    return {
      ...item,
      path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${large} 1 ${x2} ${y2} Z`,
    };
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', width: size, height: size }}>
        <svg viewBox="0 0 100 100" width={size} height={size}>
          {segments.map((seg, i) => (
            <path key={i} d={seg.path} fill={seg.color} stroke="#fff" strokeWidth="2" />
          ))}
          <circle cx="50" cy="50" r="26" fill="#fff" />
        </svg>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>Total</Typography>
          <Typography variant="body2" sx={{ fontWeight: 900, color: '#1e293b' }}>
            {data.length} Kategori
          </Typography>
        </Box>
      </Box>
      <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
        {data.map((item, idx) => (
          <Chip
            key={idx}
            label={`${item.label} ${Math.round(item.value)}%`}
            size="small"
            sx={{ bgcolor: alpha(item.color, 0.1), color: item.color, fontWeight: 600, border: `1px solid ${alpha(item.color, 0.2)}` }}
          />
        ))}
      </Stack>
    </Box>
  );
};

// =========================== KOMPONEN UTAMA ===========================
export default function LaporanInventaris() {
  const [items, setItems] = useState(INVENTORY_DATA);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Statistik agregat
  const stats = useMemo(() => {
    const totalItems = items.length;
    const totalStock = items.reduce((s, i) => s + i.stock, 0);
    const totalValue = items.reduce((s, i) => s + i.stock * i.price, 0);
    const lowStock = items.filter((i) => i.status === 'Stok Rendah').length;
    const outOfStock = items.filter((i) => i.status === 'Habis').length;
    return { totalItems, totalStock, totalValue, lowStock, outOfStock };
  }, [items]);

  // Data untuk grafik kategori (top 5 terbanyak stok)
  const categoryStock = useMemo(() => {
    const catMap = {};
    items.forEach((i) => {
      catMap[i.category] = (catMap[i.category] || 0) + i.stock;
    });
    return Object.entries(catMap)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
  }, [items]);

  // Data untuk donut (distribusi stok per kategori)
  const categoryDistribution = useMemo(() => {
    const catMap = {};
    items.forEach((i) => {
      catMap[i.category] = (catMap[i.category] || 0) + i.stock;
    });
    const total = Object.values(catMap).reduce((a, b) => a + b, 0);
    return Object.entries(catMap)
      .map(([label, value]) => ({ label, value: (value / total) * 100 }))
      .map((item, index) => ({
        ...item,
        color: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'][index % 5],
      }));
  }, [items]);

  // Data untuk bar chart (top 5 item dengan stok terbanyak)
  const topStockItems = useMemo(() => {
    return [...items].sort((a, b) => b.stock - a.stock).slice(0, 5);
  }, [items]);

  // Filter & Pagination
  const filteredItems = useMemo(() => {
    let result = items;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((i) => i.name.toLowerCase().includes(q) || i.id.toLowerCase().includes(q));
    }
    if (filterCategory !== 'Semua') {
      result = result.filter((i) => i.category === filterCategory);
    }
    if (filterStatus !== 'Semua') {
      result = result.filter((i) => i.status === filterStatus);
    }
    return result;
  }, [items, search, filterCategory, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / rowsPerPage));
  const pagedItems = filteredItems.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Handler
  const handleRefresh = () => {
    setItems(INVENTORY_DATA);
    setSearch('');
    setFilterCategory('Semua');
    setFilterStatus('Semua');
    setPage(1);
  };

  const handleExport = () => {
    const headers = ['ID', 'Nama', 'Kategori', 'Stok', 'Harga', 'Status'];
    const rows = filteredItems.map((i) => [i.id, i.name, i.category, i.stock, i.price, i.status]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventaris_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => window.print();

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* HEADER */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 1 }}>
            <InventoryIcon sx={{ color: '#8b5cf6', fontSize: 32 }} />
            Laporan Inventaris
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
            Rekap stok barang toko bangunan dengan filter kategori dan kondisi persediaan
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: { xs: 2, md: 0 } }}>
          <IconButton size="small" sx={{ color: '#64748b' }} onClick={handleExport}><DownloadIcon /></IconButton>
          <IconButton size="small" sx={{ color: '#64748b' }} onClick={handlePrint}><PrintIcon /></IconButton>
          <IconButton size="small" sx={{ color: '#64748b' }} onClick={handleRefresh}><RefreshIcon /></IconButton>
        </Box>
      </Box>

      {/* STATISTIK CARDS */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Item', value: stats.totalItems, icon: <InventoryIcon />, color: '#2563eb' },
          { label: 'Total Stok', value: stats.totalStock, icon: <CategoryIcon />, color: '#10b981' },
          { label: 'Nilai Stok', value: formatRupiah(stats.totalValue), icon: <CheckIcon />, color: '#f59e0b' },
          { label: 'Stok Rendah', value: stats.lowStock, icon: <WarningIcon />, color: '#ef4444' },
          { label: 'Habis', value: stats.outOfStock, icon: <CancelIcon />, color: '#8b5cf6' },
        ].map((item, idx) => (
          <Grid item xs={12} sm={6} md={2.4} key={idx}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ bgcolor: alpha(item.color, 0.1), color: item.color, width: 40, height: 40, borderRadius: 2 }}>
                  {item.icon}
                </Avatar>
                <Box>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                    {item.label}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                    {item.value}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* GRAFIK + DONUT */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Stok Terbanyak (Top 5)</Typography>
              <Chip label="Unit" size="small" sx={{ bgcolor: '#f3e8ff', color: '#8b5cf6', fontWeight: 600 }} />
            </Stack>
            <BarChart data={topStockItems} height={200} />
            <Divider sx={{ my: 2 }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>* Berdasarkan jumlah stok per item</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Distribusi Kategori</Typography>
            <DonutChart data={categoryDistribution} size={150} />
          </Paper>
        </Grid>
      </Grid>

      {/* FILTER & TABEL */}
      <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
          <TextField
            size="small"
            placeholder="Cari nama / ID..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" sx={{ color: '#94a3b8', mr: 1 }} />,
            }}
            sx={{ flex: 2 }}
          />
          <TextField
            select
            size="small"
            label="Kategori"
            value={filterCategory}
            onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }}
            sx={{ flex: 1 }}
          >
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            label="Status"
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
            sx={{ flex: 1 }}
          >
            {STATUS_OPTIONS.map((st) => (
              <MenuItem key={st} value={st}>{st}</MenuItem>
            ))}
          </TextField>
        </Stack>

        <TableContainer component={Box}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Nama</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Kategori</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">Stok</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">Harga</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagedItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">Tidak ada data inventaris</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                pagedItems.map((row) => {
                  const statusColor = row.status === 'Tersedia' ? '#10b981' :
                                     row.status === 'Stok Rendah' ? '#ef4444' : '#94a3b8';
                  return (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        <Chip label={row.id} size="small" sx={{ bgcolor: alpha('#8b5cf6', 0.1), color: '#8b5cf6', fontWeight: 600 }} />
                      </TableCell>
                      <TableCell><Typography fontWeight={600}>{row.name}</Typography></TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell align="right"><Typography fontWeight={700}>{row.stock}</Typography></TableCell>
                      <TableCell align="right">{formatRupiah(row.price)}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          size="small"
                          sx={{ bgcolor: alpha(statusColor, 0.1), color: statusColor, fontWeight: 700 }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredItems.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary">
              Menampilkan {((page - 1) * rowsPerPage) + 1}–{Math.min(page * rowsPerPage, filteredItems.length)} dari {filteredItems.length} item
            </Typography>
            {totalPages > 1 && (
              <Pagination count={totalPages} page={page} onChange={(_, p) => setPage(p)} color="primary" />
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}