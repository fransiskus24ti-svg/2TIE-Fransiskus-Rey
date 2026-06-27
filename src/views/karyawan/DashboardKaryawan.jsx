import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  Stack,
  Chip,
  Paper,
  Button,
  Avatar,
  Divider,
  IconButton,
  Fade,
  useTheme,
  alpha,
  LinearProgress,
  Container,
  Snackbar,
  Alert,
  Skeleton,
  Tooltip,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Storefront as StoreIcon,
  TrendingUp as TrendingUpIcon,
  AddShoppingCart as CartIcon,
  Search as SearchIcon,
  Map as MapIcon,
  WhatsApp as WhatsAppIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  Receipt as ReceiptIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  LocationOn as LocationOnIcon,
  AttachMoney as MoneyIcon,
  Assignment as AssignmentIcon,
  Close as CloseIcon,
  NotificationsActive as NotifIcon,
  Task as TaskIcon,
  WarningAmber as WarningAmberIcon,
  DoneAll as DoneAllIcon,
  HourglassTop as HourglassIcon,
} from '@mui/icons-material';

// --- Context (untuk data global) ---
import { TokoContext } from '../../App.jsx';

// --- Styled Components ---
const GlassCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  backgroundColor: 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.06)}`,
  boxShadow: '0 4px 24px rgba(0,0,0,0.03), 0 1px 4px rgba(0,0,0,0.02)',
  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
  '&:hover': {
    boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
    transform: 'translateY(-2px)',
  },
}));

const GradientCard = styled(GlassCard)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: '#fff',
  border: 'none',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 48px rgba(102,126,234,0.25)',
  },
}));

const QuickActionButton = styled(Button)(({ theme, color }) => ({
  borderRadius: '16px',
  padding: '14px 18px',
  justifyContent: 'flex-start',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  backgroundColor: alpha(color, 0.05),
  border: `1px solid ${alpha(color, 0.08)}`,
  color: theme.palette.text.primary,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha(color, 0.10),
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 16px ${alpha(color, 0.12)}`,
  },
  '& .MuiButton-startIcon': {
    color: color,
    fontSize: '1.6rem',
    marginRight: '12px',
  },
}));

const StatusCard = styled(Paper)(({ theme, status }) => ({
  padding: '14px 18px',
  borderRadius: '14px',
  borderLeft: `4px solid ${status === 'waiting' ? '#f59e0b' : '#ef4444'}`,
  backgroundColor: alpha(status === 'waiting' ? '#f59e0b' : '#ef4444', 0.04),
  marginBottom: '10px',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: alpha(status === 'waiting' ? '#f59e0b' : '#ef4444', 0.08),
    transform: 'translateX(4px)',
  },
}));

const StokItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
  '&:last-child': { borderBottom: 'none' },
}));

const StatBadge = styled(Box)(({ theme, color }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '2px 10px',
  borderRadius: '999px',
  backgroundColor: alpha(color, 0.10),
  color: color,
  fontSize: '0.7rem',
  fontWeight: 700,
}));

const AlertItem = styled(Box)(({ theme, severity }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 14px',
  borderRadius: '12px',
  backgroundColor: alpha(
    severity === 'critical' ? '#ef4444' :
    severity === 'warning' ? '#f59e0b' : '#3b82f6',
    0.06
  ),
  border: `1px solid ${alpha(
    severity === 'critical' ? '#ef4444' :
    severity === 'warning' ? '#f59e0b' : '#3b82f6',
    0.12
  )}`,
  marginBottom: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha(
      severity === 'critical' ? '#ef4444' :
      severity === 'warning' ? '#f59e0b' : '#3b82f6',
      0.10
    ),
  },
}));

// --- Main Component ---
export default function DashboardKaryawan() {
  const theme = useTheme();
  const { dataBarang, riwayatTransaksi, catatanOperasional } = useContext(TokoContext);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showTasks, setShowTasks] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);

  // Data dummy (sebagian bisa diambil dari context, misal riwayat transaksi)
  const totalTransaksi = useMemo(() => riwayatTransaksi?.length || 142, [riwayatTransaksi]);
  const kenaikan = '+12%';
  const targetProgress = 60;
  const nominalPenjualan = useMemo(() => {
    const total = riwayatTransaksi?.reduce((acc, item) => acc + (item.totalHarga || 0), 0) || 42850000;
    return `Rp ${total.toLocaleString('id-ID')}`;
  }, [riwayatTransaksi]);
  const uangAwal = 'Rp 2,000,000';
  const uangFisik = 'Rp 44,850,000';

  // --- Stok dari context dengan alert low stock ---
  const stokData = useMemo(() => {
    if (dataBarang && dataBarang.length > 0) {
      return dataBarang.map(item => ({
        name: item.nama,
        masuk: item.stok || 0,
        keluar: Math.floor(item.stok * 0.3), // dummy keluar
        minimal: item.minimal || 10,
        unit: item.satuan || 'pcs',
      }));
    }
    return [
      { name: 'Semen Tiga Roda 50kg', masuk: 5000, keluar: 3000, minimal: 100, unit: 'sak' },
      { name: 'Besi 10mm (12m)', masuk: 2000, keluar: 1000, minimal: 50, unit: 'batang' },
      { name: 'Pipa PVC 4" Rucika', masuk: 1000, keluar: 200, minimal: 30, unit: 'batang' },
      { name: 'Cat Tembok Dulux 5kg', masuk: 800, keluar: 400, minimal: 20, unit: 'pcs' },
      { name: 'Paku Beton 5cm', masuk: 120, keluar: 90, minimal: 50, unit: 'kg' },
      { name: 'Keramik 40x40', masuk: 60, keluar: 45, minimal: 20, unit: 'box' },
    ];
  }, [dataBarang]);

  // --- Low Stock Alert ---
  const lowStockItems = useMemo(() => {
    return stokData
      .filter(item => item.masuk < item.minimal)
      .map(item => ({
        ...item,
        severity: item.masuk === 0 ? 'critical' : 'warning',
        percentage: Math.round((item.masuk / item.minimal) * 100),
      }))
      .sort((a, b) => a.percentage - b.percentage);
  }, [stokData]);

  // --- Tugas Harian (dummy) ---
  const tugasHarian = [
    { id: 1, task: 'Update stok barang masuk hari ini', priority: 'high', status: 'pending' },
    { id: 2, task: 'Verifikasi pembayaran pelanggan', priority: 'medium', status: 'pending' },
    { id: 3, task: 'Koordinasi dengan tim pengiriman', priority: 'high', status: 'in-progress' },
    { id: 4, task: 'Rekap penjualan harian', priority: 'medium', status: 'done' },
    { id: 5, task: 'Cek kondisi barang di gudang', priority: 'low', status: 'pending' },
  ];

  const pendingTasks = tugasHarian.filter(t => t.status !== 'done');
  const completedTasks = tugasHarian.filter(t => t.status === 'done');

  // Daftar pengiriman & piutang (dummy)
  const daftarPengiriman = [
    { id: '#TRX-9221', customer: 'Bpk. Rahmat', address: 'Vila Molati', status: 'waiting' },
    { id: '#TRX-9222', customer: 'Ibu Susi', address: 'Perum Indah', status: 'waiting' },
    { id: '#TPK-9221', customer: 'CV Bangun Sejahtera', address: 'Jl. Merdeka', status: 'waiting' },
    { id: '#TRX-9223', customer: 'Toko Jaya', address: 'Jl. Sudirman', status: 'waiting' },
  ];

  const daftarPiutang = [
    { customer: 'CV Bangun Sejahtera', total: 'Rp 12,500,000', dueDate: '2025-07-15' },
    { customer: 'Adrian Pratama', total: 'Rp 3,240,000', dueDate: '2025-07-20' },
    { customer: 'Gusak', total: 'Rp 2,100,000', dueDate: '2025-07-25' },
  ];

  // Handler refresh manual
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({ open: true, message: 'Dashboard berhasil diperbarui', severity: 'success' });
    }, 600);
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#3b82f6';
      default: return '#64748b';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'done': return <DoneAllIcon sx={{ fontSize: '1rem', color: '#10b981' }} />;
      case 'in-progress': return <HourglassIcon sx={{ fontSize: '1rem', color: '#f59e0b' }} />;
      default: return <ScheduleIcon sx={{ fontSize: '1rem', color: '#94a3b8' }} />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f6f8fc',
        py: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Fade in timeout={500}>
          <Box>
            {/* HEADER */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              sx={{ mb: 4 }}
              spacing={2}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: 'primary.main',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(102,126,234,0.3)',
                  }}
                >
                  <StoreIcon sx={{ fontSize: '1.8rem' }} />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    Dashboard Karyawan
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Ringkasan performa & tugas harian
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Chip
                  label="Hari Ini"
                  size="small"
                  sx={{ fontWeight: 600, bgcolor: alpha('#10b981', 0.1), color: '#10b981' }}
                />
                <Chip
                  label="Online"
                  size="small"
                  sx={{ fontWeight: 600, bgcolor: alpha('#3b82f6', 0.08), color: '#3b82f6' }}
                  icon={<Box sx={{ width: 6, height: 6, bgcolor: '#10b981', borderRadius: '50%' }} />}
                />
                <Tooltip title="Refresh Dashboard">
                  <IconButton
                    onClick={handleRefresh}
                    sx={{ bgcolor: alpha('#3b82f6', 0.06), '&:hover': { bgcolor: alpha('#3b82f6', 0.12) } }}
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>

            {/* STATISTIK UTAMA */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <GlassCard sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    Selamat Pagi, Andi 👋
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', mb: 2.5 }}>
                    Berikut ringkasan performa toko hari ini.
                  </Typography>

                  {loading ? (
                    <Stack spacing={1.5}>
                      <Skeleton variant="text" width="60%" height={40} />
                      <Skeleton variant="text" width="80%" height={30} />
                      <Skeleton variant="rectangular" height={60} />
                    </Stack>
                  ) : (
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                          TOTAL TRANSAKSI
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                          {totalTransaksi}
                        </Typography>
                        <StatBadge color="#10b981">
                          <TrendingUpIcon sx={{ fontSize: '0.8rem' }} />
                          {kenaikan} ke Kemarin
                        </StatBadge>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                          TARGET
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1} sx={{ mt: 0.5 }}>
                          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                            {targetProgress}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={targetProgress}
                            sx={{
                              flex: 1,
                              height: 6,
                              borderRadius: 999,
                              backgroundColor: alpha('#3b82f6', 0.08),
                              '& .MuiLinearProgress-bar': {
                                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                                borderRadius: 999,
                              },
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                          NOMINAL PENJUALAN
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                          {nominalPenjualan}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                </GlassCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <GradientCard sx={{ p: 3, height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, opacity: 0.9, mb: 2 }}>
                    STATUS KASIR (FISIK VS SISTEM)
                  </Typography>
                  <Stack spacing={1.5}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Uang Awal</Typography>
                      <Typography variant="body2" fontWeight={600}>{uangAwal}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Uang Fisik</Typography>
                      <Typography variant="body2" fontWeight={600} color="#a7f3d0">{uangFisik}</Typography>
                    </Stack>
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Selisih</Typography>
                      <Typography variant="body2" fontWeight={700} color="#fcd34d">
                        Rp 42,850,000
                      </Typography>
                    </Stack>
                  </Stack>
                </GradientCard>
              </Grid>
            </Grid>

            {/* MAIN CONTENT */}
            <Grid container spacing={3}>
              {/* KIRI */}
              <Grid item xs={12} lg={7}>
                <Stack spacing={3}>
                  {/* Akses Cepat */}
                  <GlassCard sx={{ p: 2.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>
                      Akses Cepat
                    </Typography>
                    <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={4}>
                        <QuickActionButton
                          fullWidth
                          startIcon={<CartIcon />}
                          color="#3b82f6"
                          onClick={() => alert('Navigasi ke Transaksi')}
                        >
                          <Stack>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>Buat Transaksi</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              Klik untuk baru
                            </Typography>
                          </Stack>
                        </QuickActionButton>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <QuickActionButton
                          fullWidth
                          startIcon={<SearchIcon />}
                          color="#10b981"
                          onClick={() => alert('Cek Stok')}
                        >
                          <Stack>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>Cek Stok & Harga</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              Periksa kuantitas
                            </Typography>
                          </Stack>
                        </QuickActionButton>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <QuickActionButton
                          fullWidth
                          startIcon={<MapIcon />}
                          color="#f59e0b"
                          onClick={() => alert('Status Kirim')}
                        >
                          <Stack>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>Cek Status Kirim</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              Pantau driver
                            </Typography>
                          </Stack>
                        </QuickActionButton>
                      </Grid>
                    </Grid>
                  </GlassCard>

                  {/* LOW STOCK ALERT - FITUR BARU */}
                  <GlassCard sx={{ p: 2.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        ⚠️ Low Stock Alert
                      </Typography>
                      <Chip
                        label={`${lowStockItems.length} item kritis`}
                        size="small"
                        icon={<WarningAmberIcon sx={{ fontSize: '0.8rem' }} />}
                        sx={{
                          fontWeight: 600,
                          bgcolor: lowStockItems.length > 0 ? alpha('#ef4444', 0.1) : alpha('#10b981', 0.1),
                          color: lowStockItems.length > 0 ? '#ef4444' : '#10b981',
                        }}
                      />
                    </Stack>

                    {lowStockItems.length === 0 ? (
                      <Box
                        sx={{
                          py: 4,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          color: '#10b981',
                        }}
                      >
                        <CheckCircleIcon sx={{ fontSize: 48, opacity: 0.5 }} />
                        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                          Semua stok dalam kondisi aman ✅
                        </Typography>
                      </Box>
                    ) : (
                      lowStockItems.slice(0, 5).map((item, idx) => (
                        <AlertItem key={idx} severity={item.severity}>
                          <Box sx={{ flexShrink: 0 }}>
                            <WarningAmberIcon
                              sx={{
                                color: item.severity === 'critical' ? '#ef4444' : '#f59e0b',
                                fontSize: '1.4rem',
                              }}
                            />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                              {item.name}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Stok: <strong>{item.masuk}</strong> {item.unit}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Minimal: {item.minimal} {item.unit}
                              </Typography>
                              <Box sx={{ flex: 1, maxWidth: 80 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={Math.min(item.percentage, 100)}
                                  sx={{
                                    height: 4,
                                    borderRadius: 2,
                                    backgroundColor: alpha('#64748b', 0.15),
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: item.severity === 'critical' ? '#ef4444' : '#f59e0b',
                                    },
                                  }}
                                />
                              </Box>
                            </Box>
                          </Box>
                          <Chip
                            label={item.severity === 'critical' ? 'Kritis' : 'Menipis'}
                            size="small"
                            sx={{
                              bgcolor: item.severity === 'critical' ? alpha('#ef4444', 0.1) : alpha('#f59e0b', 0.1),
                              color: item.severity === 'critical' ? '#ef4444' : '#f59e0b',
                              fontWeight: 600,
                            }}
                          />
                        </AlertItem>
                      ))
                    )}
                    {lowStockItems.length > 5 && (
                      <Box sx={{ mt: 1, textAlign: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          + {lowStockItems.length - 5} item lainnya
                        </Typography>
                      </Box>
                    )}
                  </GlassCard>

                  {/* Stok Kirim */}
                  <GlassCard sx={{ p: 2.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        Stok Kirim
                      </Typography>
                      <Chip
                        label={`${stokData.length} item`}
                        size="small"
                        sx={{ fontWeight: 600, bgcolor: alpha('#3b82f6', 0.08), color: '#3b82f6' }}
                      />
                    </Stack>
                    <Grid container spacing={0.5} sx={{ mb: 0.5, px: 0.5 }}>
                      <Grid item xs={6}>
                        <Typography variant="caption" fontWeight={600} color="text.secondary">Barang</Typography>
                      </Grid>
                      <Grid item xs={3} textAlign="right">
                        <Typography variant="caption" fontWeight={600} color="text.secondary">Masuk</Typography>
                      </Grid>
                      <Grid item xs={3} textAlign="right">
                        <Typography variant="caption" fontWeight={600} color="text.secondary">Keluar</Typography>
                      </Grid>
                    </Grid>
                    {stokData.slice(0, 6).map((item, idx) => (
                      <StokItem key={idx}>
                        <Typography variant="body2" sx={{ fontWeight: 600, flex: 1 }}>{item.name}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#10b981', minWidth: 50, textAlign: 'right' }}>
                          {item.masuk.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#ef4444', minWidth: 50, textAlign: 'right' }}>
                          {item.keluar.toLocaleString()}
                        </Typography>
                      </StokItem>
                    ))}
                    {stokData.length > 6 && (
                      <Box sx={{ mt: 1, textAlign: 'center' }}>
                        <Typography variant="caption" color="text.secondary">+ {stokData.length - 6} item lainnya</Typography>
                      </Box>
                    )}
                  </GlassCard>

                  {/* Status Pengiriman */}
                  <GlassCard sx={{ p: 2.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        Status Pengiriman
                      </Typography>
                      <Chip
                        label={`${daftarPengiriman.length} Menunggu Driver`}
                        icon={<ScheduleIcon sx={{ fontSize: '0.8rem' }} />}
                        size="small"
                        sx={{ fontWeight: 600, bgcolor: alpha('#f59e0b', 0.1), color: '#f59e0b' }}
                      />
                    </Stack>

                    {daftarPengiriman.map((item) => (
                      <StatusCard key={item.id} status={item.status}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                              {item.id}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                              {item.customer}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <MapIcon sx={{ fontSize: '0.7rem' }} /> {item.address}
                            </Typography>
                          </Box>
                          <Chip
                            label="Menunggu Driver"
                            size="small"
                            sx={{ fontWeight: 600, bgcolor: alpha('#f59e0b', 0.12), color: '#f59e0b' }}
                          />
                        </Stack>
                      </StatusCard>
                    ))}
                  </GlassCard>
                </Stack>
              </Grid>

              {/* KANAN */}
              <Grid item xs={12} lg={5}>
                <Stack spacing={3}>
                  {/* RINGKASAN TUGAS HARIAN - FITUR BARU */}
                  <GlassCard sx={{ p: 2.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        📋 Ringkasan Tugas Harian
                      </Typography>
                      <Chip
                        label={`${pendingTasks.length} pending`}
                        size="small"
                        icon={<TaskIcon sx={{ fontSize: '0.8rem' }} />}
                        sx={{ fontWeight: 600, bgcolor: alpha('#f59e0b', 0.1), color: '#f59e0b' }}
                      />
                    </Stack>

                    {loading ? (
                      <Stack spacing={1}>
                        <Skeleton variant="rectangular" height={40} />
                        <Skeleton variant="rectangular" height={40} />
                        <Skeleton variant="rectangular" height={40} />
                      </Stack>
                    ) : (
                      <>
                        {tugasHarian.map((task) => (
                          <Paper
                            key={task.id}
                            elevation={0}
                            sx={{
                              p: 2,
                              borderRadius: '12px',
                              border: `1px solid ${alpha(
                                task.status === 'done' ? '#10b981' :
                                task.status === 'in-progress' ? '#f59e0b' : '#e2e8f0',
                                0.15
                              )}`,
                              backgroundColor: alpha(
                                task.status === 'done' ? '#10b981' :
                                task.status === 'in-progress' ? '#f59e0b' : '#ffffff',
                                0.04
                              ),
                              mb: 1.5,
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                transform: 'translateX(4px)',
                                borderColor: alpha(
                                  task.status === 'done' ? '#10b981' :
                                  task.status === 'in-progress' ? '#f59e0b' : '#94a3b8',
                                  0.3
                                ),
                              },
                            }}
                          >
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                              <Box sx={{ flexShrink: 0 }}>
                                {getStatusIcon(task.status)}
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 600,
                                    color: '#0f172a',
                                    textDecoration: task.status === 'done' ? 'line-through' : 'none',
                                    opacity: task.status === 'done' ? 0.6 : 1,
                                  }}
                                >
                                  {task.task}
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                                  <Chip
                                    label={task.priority}
                                    size="small"
                                    sx={{
                                      height: 20,
                                      fontSize: '0.6rem',
                                      fontWeight: 700,
                                      bgcolor: alpha(getPriorityColor(task.priority), 0.1),
                                      color: getPriorityColor(task.priority),
                                    }}
                                  />
                                  <Chip
                                    label={task.status === 'done' ? 'Selesai' : task.status === 'in-progress' ? 'Proses' : 'Pending'}
                                    size="small"
                                    sx={{
                                      height: 20,
                                      fontSize: '0.6rem',
                                      fontWeight: 700,
                                      bgcolor: alpha(
                                        task.status === 'done' ? '#10b981' :
                                        task.status === 'in-progress' ? '#f59e0b' : '#94a3b8',
                                        0.1
                                      ),
                                      color: task.status === 'done' ? '#10b981' :
                                             task.status === 'in-progress' ? '#f59e0b' : '#64748b',
                                    }}
                                  />
                                </Stack>
                              </Box>
                              {task.status !== 'done' && (
                                <IconButton
                                  size="small"
                                  sx={{
                                    bgcolor: alpha('#10b981', 0.08),
                                    '&:hover': { bgcolor: alpha('#10b981', 0.16) },
                                  }}
                                  onClick={() => {
                                    setSnackbar({
                                      open: true,
                                      message: `Tugas "${task.task}" ditandai selesai`,
                                      severity: 'success'
                                    });
                                  }}
                                >
                                  <CheckCircleIcon sx={{ fontSize: '1rem', color: '#10b981' }} />
                                </IconButton>
                              )}
                            </Stack>
                          </Paper>
                        ))}
                      </>
                    )}
                  </GlassCard>

                  {/* Piutang Jatuh Tempo */}
                  <GlassCard sx={{ p: 2.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        Piutang Jatuh Tempo
                      </Typography>
                      <Chip
                        label={`${daftarPiutang.length} Pemasukan`}
                        icon={<WarningIcon sx={{ fontSize: '0.8rem' }} />}
                        size="small"
                        sx={{ fontWeight: 600, bgcolor: alpha('#ef4444', 0.1), color: '#ef4444' }}
                      />
                    </Stack>

                    {daftarPiutang.map((item, idx) => (
                      <Paper
                        key={idx}
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: '14px',
                          border: `1px solid ${alpha('#ef4444', 0.08)}`,
                          bgcolor: alpha('#ef4444', 0.02),
                          mb: 1.5,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: alpha('#ef4444', 0.06),
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                              {item.customer}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#ef4444' }}>
                              {item.total}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              Jatuh tempo: {item.dueDate}
                            </Typography>
                          </Box>
                          <IconButton
                            color="success"
                            size="small"
                            sx={{ bgcolor: alpha('#25D366', 0.08), '&:hover': { bgcolor: alpha('#25D366', 0.16) } }}
                            onClick={() => alert(`WhatsApp ke ${item.customer}`)}
                          >
                            <WhatsAppIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Paper>
                    ))}
                  </GlassCard>

                  {/* Ringkasan Hari Ini */}
                  <GlassCard sx={{ p: 2.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>
                      Ringkasan Hari Ini
                    </Typography>
                    <Stack spacing={1.5}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">Transaksi sukses</Typography>
                        <Typography variant="body2" fontWeight={700}>38</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">Barang terjual</Typography>
                        <Typography variant="body2" fontWeight={700}>156 unit</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">Driver aktif</Typography>
                        <Typography variant="body2" fontWeight={700}>4 orang</Typography>
                      </Stack>
                      <Divider />
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">Total piutang</Typography>
                        <Typography variant="body2" fontWeight={700} color="#ef4444">Rp 17,840,000</Typography>
                      </Stack>
                      {/* Catatan Operasional dari Context */}
                      {catatanOperasional && catatanOperasional.length > 0 && (
                        <>
                          <Divider />
                          <Box>
                            <Typography variant="caption" fontWeight={600} color="text.secondary">
                              📋 Catatan Operasional
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              {catatanOperasional.slice(0, 3).map((note, idx) => (
                                <Typography key={idx} variant="caption" sx={{ color: 'text.secondary', display: 'block', py: 0.3 }}>
                                  • {note}
                                </Typography>
                              ))}
                            </Box>
                          </Box>
                        </>
                      )}
                    </Stack>
                  </GlassCard>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity={snackbar.severity} sx={{ borderRadius: '12px' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}