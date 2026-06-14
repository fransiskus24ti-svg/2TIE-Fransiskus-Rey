import React, { useMemo, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  Stack,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  IconButton,
  Button,
  Tooltip,
  Fade,
} from '@mui/material';

import RefreshIcon from '@mui/icons-material/Refresh';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { alpha } from '@mui/material/styles';

const StatCard = ({ title, value, subtitle, icon: Icon, color }) => {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: '18px',
        border: `1px solid ${alpha(color, 0.18)}`,
        background: `linear-gradient(135deg, ${alpha(color, 0.06)} 0%, ${alpha(color, 0.02)} 100%)`,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontSize: '1.8rem', fontWeight: 900, color: 'text.primary', mt: 0.5 }}>
            {value}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            {subtitle}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(color, 0.12),
            border: `1px solid ${alpha(color, 0.25)}`,
          }}
        >
          <Icon sx={{ color }} />
        </Box>
      </Stack>
    </Card>
  );
};

const QuickRow = ({ title, description, color, icon: Icon }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: '16px',
        border: `1px solid ${alpha(color, 0.18)}`,
        bgcolor: alpha(color, 0.04),
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(color, 0.12),
            border: `1px solid ${alpha(color, 0.25)}`,
            flexShrink: 0,
          }}
        >
          <Icon sx={{ color }} />
        </Box>
        <Box>
          <Typography fontWeight={800} sx={{ color }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <ArrowForwardIcon sx={{ color: alpha(color, 0.9) }} />
        </Box>
      </Stack>
    </Paper>
  );
};

export default function DashboardKaryawan() {
  const [live] = useState(true);
  const [loading, setLoading] = useState(false);

  const stokAman = 1876;
  const penjualanHariIni = 'Rp 12,4 Jt';
  const transaksiHariIni = 38;
  const stokKritis = 3;

  const notifications = useMemo(
    () => [
      {
        id: 1,
        title: 'Stok Semen Menipis',
        message: 'Semen Tiga Roda tersisa 10 sak. Segera lakukan permintaan stok.',
        tone: 'warning',
      },
      {
        id: 2,
        title: 'Transaksi Terbaru',
        message: 'Penjualan berhasil tercatat untuk pelanggan: Toko Jaya Abadi.',
        tone: 'success',
      },
    ],
    []
  );

  const stokRows = useMemo(
    () => [
      { name: 'Semen Tiga Roda', stok: 450, minimal: 100, warna: '#3b82f6' },
      { name: 'Besi & Baja', stok: 80, minimal: 120, warna: '#ef4444' },
      { name: 'Cat Tembok Dulux', stok: 180, minimal: 60, warna: '#10b981' },
      { name: 'Paku Beton', stok: 600, minimal: 100, warna: '#10b981' },
      { name: 'Pipa', stok: 150, minimal: 200, warna: '#f59e0b' },
    ],
    []
  );

  const riwayatRows = useMemo(
    () => [
      { waktu: '09:15 WIB', item: 'Semen Tiga Roda', qty: 10, total: 'Rp 6.500.000', status: 'Selesai' },
      { waktu: '10:02 WIB', item: 'Cat Tembok Dulux 5kg', qty: 6, total: 'Rp 1.080.000', status: 'Selesai' },
      { waktu: '11:20 WIB', item: 'Besi 8mm', qty: 20, total: 'Rp 1.200.000', status: 'Diproses' },
      { waktu: '12:05 WIB', item: 'Paku Beton 5cm', qty: 12, total: 'Rp 60.000', status: 'Selesai' },
    ],
    []
  );

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 700);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', pb: 4, bgcolor: '#f8fafc', pt: 3, px: { xs: 2, sm: 3, md: 4 } }}>
      <Fade in timeout={500}>
        <Stack direction="row" justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 3, gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 950, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 1 }}>
              Dashboard Karyawan
              <Chip
                icon={<FiberManualRecordIcon sx={{ fontSize: '0.55rem', animation: 'pulse 1.5s infinite', color: '#10b981 !important' }} />}
                label={live ? 'Live' : 'Off'}
                size="small"
                sx={{ bgcolor: alpha('#10b981', 0.12), color: '#10b981', fontWeight: 800 }}
              />
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
              Ringkasan operasional kasir & stok hari ini
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
            <Tooltip title="Refresh">
              <IconButton onClick={handleRefresh} disabled={loading} sx={{ bgcolor: alpha('#3b82f6', 0.08) }}>
                <RefreshIcon sx={{ color: '#2563eb' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifikasi">
              <IconButton sx={{ bgcolor: alpha('#ef4444', 0.08) }}>
                <NotificationsIcon sx={{ color: '#ef4444' }} />
              </IconButton>
            </Tooltip>
            <Button
              variant="outlined"
              sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 800 }}
              endIcon={<ArrowForwardIcon />}
            >
              Lihat Detail
            </Button>
          </Stack>
        </Stack>
      </Fade>

      {/* Stat Cards */}
      <Grid container spacing={2.8} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Penjualan"
            value={penjualanHariIni}
            subtitle={`${transaksiHariIni} transaksi hari ini`}
            icon={ReceiptLongOutlinedIcon}
            color="#f59e0b"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Stok"
            value={`${stokAman.toLocaleString('id-ID')}`}
            subtitle="yang terdata & tersinkronisasi"
            icon={Inventory2OutlinedIcon}
            color="#10b981"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Barang Masuk / Keluar"
            value="24"
            subtitle="aktivitas logistik hari ini"
            icon={LocalShippingOutlinedIcon}
            color="#3b82f6"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Stok Kritis"
            value={`${stokKritis}`}
            subtitle="perlu perhatian segera"
            icon={WarningAmberRoundedIcon}
            color="#ef4444"
          />
        </Grid>
      </Grid>

      {/* Main content */}
      <Grid container spacing={2.8}>
        <Grid item xs={12} lg={7}>
          <Stack spacing={2.8}>
            <QuickRow
              color="#2563eb"
              title="Kasir / Penjualan"
              description="Mulai proses transaksi penjualan dan update status selesai/diproses."
              icon={ReceiptLongOutlinedIcon}
            />

            <Card sx={{ p: 2.5, borderRadius: '20px', border: `1px solid ${alpha('#3b82f6', 0.18)}` }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 950, color: '#0f172a' }}>
                    Notifikasi Stok Menipis
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Informasi prioritas untuk operasional hari ini
                  </Typography>
                </Box>
                <Chip label="Auto" size="small" sx={{ bgcolor: alpha('#10b981', 0.12), color: '#10b981', fontWeight: 900 }} />
              </Stack>

              <Stack spacing={1.2}>
                {notifications.map((n) => (
                  <Paper
                    key={n.id}
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: '16px',
                      border: `1px solid ${n.tone === 'warning' ? alpha('#f59e0b', 0.35) : alpha('#10b981', 0.3)}`,
                      bgcolor: n.tone === 'warning' ? alpha('#f59e0b', 0.08) : alpha('#10b981', 0.07),
                    }}
                  >
                    <Typography sx={{ fontWeight: 900, color: n.tone === 'warning' ? '#b45309' : '#047857' }}>
                      {n.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {n.message}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Card>

            <Card sx={{ p: 2.5, borderRadius: '20px' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 950, color: '#0f172a' }}>
                    Riwayat Transaksi (Hari Ini)
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Catatan penjualan yang sudah selesai/diproses
                  </Typography>
                </Box>
                <Chip icon={<HistoryOutlinedIcon />} label="Real-time" size="small" sx={{ fontWeight: 900 }} />
              </Stack>

              <TableContainer sx={{ borderRadius: '16px', border: `1px solid ${alpha('#0f172a', 0.08)}` }} component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f1f5f9' }}>
                      <TableCell>Waktu</TableCell>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Qty</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {riwayatRows.map((r, idx) => (
                      <TableRow key={idx} hover>
                        <TableCell sx={{ fontWeight: 800 }}>{r.waktu}</TableCell>
                        <TableCell>{r.item}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 800 }}>{r.qty}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 800 }}>{r.total}</TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={r.status}
                            sx={{
                              fontWeight: 900,
                              bgcolor: r.status === 'Selesai' ? alpha('#10b981', 0.12) : alpha('#f59e0b', 0.14),
                              color: r.status === 'Selesai' ? '#047857' : '#b45309',
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Stack spacing={2.8}>
            <Card sx={{ p: 2.5, borderRadius: '20px' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 950, color: '#0f172a' }}>
                    Manajemen Stok
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Level stok vs minimal
                  </Typography>
                </Box>
                <Chip label="Aman" size="small" sx={{ bgcolor: alpha('#10b981', 0.12), color: '#10b981', fontWeight: 900 }} />
              </Stack>

              <Stack spacing={1.4}>
                {stokRows.map((s, idx) => {
                  const status = s.stok >= s.minimal ? 'Aman' : 'Kritis';
                  const progress = Math.min(100, Math.round((s.stok / s.minimal) * 100));
                  const barColor = status === 'Aman' ? '#10b981' : '#ef4444';

                  return (
                    <Box key={idx}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography sx={{ fontWeight: 900, color: 'text.primary' }}>{s.name}</Typography>
                        <Chip size="small" label={status} sx={{ bgcolor: alpha(barColor, 0.12), color: barColor, fontWeight: 900 }} />
                      </Stack>
                      <Box sx={{ height: 10, borderRadius: 999, bgcolor: alpha(barColor, 0.1), overflow: 'hidden' }}>
                        <Box sx={{ width: `${Math.max(6, progress)}%`, height: '100%', bgcolor: barColor, borderRadius: 999 }} />
                      </Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Stok: {s.stok} • Minimal: {s.minimal}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>
            </Card>

            <Stack spacing={1.6}>
              <QuickRow
                color="#10b981"
                title="Barang Masuk"
                description="Input barang masuk untuk menjaga ketersediaan stok."
                icon={Inventory2OutlinedIcon}
              />
              <QuickRow
                color="#ef4444"
                title="Barang Keluar"
                description="Input barang keluar (rusak/retur/non-penjualan)."
                icon={ReceiptLongOutlinedIcon}
              />
            </Stack>

            <Card sx={{ p: 2.5, borderRadius: '20px' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 950, color: '#0f172a' }}>
                    Aksi Cepat
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Mulai dari dashboard tanpa menunggu menu
                  </Typography>
                </Box>
                <Chip label="Kasir" size="small" sx={{ fontWeight: 900 }} />
              </Stack>

              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ borderRadius: '14px', py: 1.2, fontWeight: 900, textTransform: 'none', bgcolor: '#2563eb' }}
                    onClick={() => {
                      window.location.href = '/karyawan/manajemen-karyawan';
                    }}
                  >
                    Proses Kasir / Penjualan
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ borderRadius: '14px', py: 1.2, fontWeight: 900, textTransform: 'none' }}
                    onClick={() => {
                      window.location.href = '/karyawan/manajemen-karyawan';
                    }}
                  >
                    Buka Data Barang
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </Box>
  );
}
