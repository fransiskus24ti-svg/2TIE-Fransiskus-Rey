import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  Paper,
  Button,
  ButtonGroup,
  Chip,
  Stack,
  Divider,
  Avatar,
  Tooltip,
  IconButton,
  alpha,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  ShoppingCart as CartIcon,
  Storefront as StoreIcon,
  AttachMoney as MoneyIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  Star as StarIcon,
} from '@mui/icons-material';

// =========================== DATA DUMMY ===========================
const MONTHLY_SALES = [
  { month: 'Jan', revenue: 45000000, orders: 120, avgOrder: 375000 },
  { month: 'Feb', revenue: 52000000, orders: 135, avgOrder: 385185 },
  { month: 'Mar', revenue: 48000000, orders: 110, avgOrder: 436364 },
  { month: 'Apr', revenue: 61000000, orders: 150, avgOrder: 406667 },
  { month: 'May', revenue: 55000000, orders: 130, avgOrder: 423077 },
  { month: 'Jun', revenue: 67000000, orders: 160, avgOrder: 418750 },
  { month: 'Jul', revenue: 72000000, orders: 175, avgOrder: 411429 },
  { month: 'Aug', revenue: 68000000, orders: 165, avgOrder: 412121 },
  { month: 'Sep', revenue: 59000000, orders: 140, avgOrder: 421429 },
  { month: 'Oct', revenue: 63000000, orders: 145, avgOrder: 434483 },
  { month: 'Nov', revenue: 70000000, orders: 155, avgOrder: 451613 },
  { month: 'Dec', revenue: 85000000, orders: 190, avgOrder: 447368 },
];

const CATEGORY_SALES = [
  { label: 'Elektronik', value: 40, color: '#2563eb' },
  { label: 'Fashion', value: 25, color: '#10b981' },
  { label: 'Makanan', value: 20, color: '#f59e0b' },
  { label: 'Lainnya', value: 15, color: '#8b5cf6' },
];

const TOP_PRODUCTS = [
  { name: 'Smartphone X', sales: 85000000, units: 45 },
  { name: 'Laptop Pro', sales: 62000000, units: 28 },
  { name: 'Headphone Z', sales: 23000000, units: 120 },
  { name: 'Sneakers Air', sales: 18000000, units: 60 },
];

const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);

// =========================== GRAFIK BATANG ===========================
const BarChart = ({ data, height = 180 }) => {
  const maxVal = Math.max(...data.map((d) => d.revenue));
  return (
    <Box sx={{ width: '100%', height, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
      {data.map((item, idx) => {
        const percent = (item.revenue / maxVal) * 100;
        return (
          <Tooltip key={idx} title={`${item.month}: ${formatRupiah(item.revenue)}`} arrow placement="top">
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <Box
                sx={{
                  width: '100%',
                  height: `${Math.max(percent, 3)}%`,
                  minHeight: '6px',
                  borderRadius: '4px 4px 0 0',
                  background: 'linear-gradient(180deg, #10b981, #6ee7b7)',
                  transition: 'height 0.4s ease',
                  '&:hover': { opacity: 0.8, transform: 'scaleY(1.02)', transformOrigin: 'bottom' },
                }}
              />
              <Typography variant="caption" sx={{ mt: 0.5, color: '#64748b', fontSize: '10px', fontWeight: 600 }}>
                {item.month}
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
            {formatRupiah(85000000)}
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
export default function LaporanPenjualan() {
  const [period, setPeriod] = useState('Bulanan');

  // Statistik agregat
  const stats = useMemo(() => {
    const totalRevenue = MONTHLY_SALES.reduce((s, d) => s + d.revenue, 0);
    const totalOrders = MONTHLY_SALES.reduce((s, d) => s + d.orders, 0);
    const avgOrder = totalRevenue / totalOrders;
    const topProduct = TOP_PRODUCTS.reduce((max, p) => (p.sales > max.sales ? p : max), TOP_PRODUCTS[0]);
    return { totalRevenue, totalOrders, avgOrder, topProduct: topProduct.name };
  }, []);

  const recentData = MONTHLY_SALES.slice(-6);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* HEADER */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 1 }}>
            <StoreIcon sx={{ color: '#10b981', fontSize: 32 }} />
            Laporan Penjualan
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
            Analisis penjualan per periode dan rincian transaksi
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: { xs: 2, md: 0 } }}>
          <ButtonGroup variant="outlined" size="small">
            {['Harian', 'Mingguan', 'Bulanan', 'Tahunan'].map((p) => (
              <Button
                key={p}
                onClick={() => setPeriod(p)}
                sx={{
                  bgcolor: period === p ? '#10b981' : 'transparent',
                  color: period === p ? '#fff' : '#475569',
                  borderColor: period === p ? '#10b981' : '#cbd5e1',
                  '&:hover': { bgcolor: period === p ? '#059669' : '#f1f5f9' },
                }}
              >
                {p}
              </Button>
            ))}
          </ButtonGroup>
          <IconButton size="small" sx={{ color: '#64748b' }}><DownloadIcon /></IconButton>
          <IconButton size="small" sx={{ color: '#64748b' }}><PrintIcon /></IconButton>
          <IconButton size="small" sx={{ color: '#64748b' }}><RefreshIcon /></IconButton>
        </Box>
      </Box>

      {/* STATISTIK CARDS */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Penjualan', value: formatRupiah(stats.totalRevenue), icon: <MoneyIcon />, color: '#2563eb' },
          { label: 'Jumlah Order', value: stats.totalOrders.toLocaleString(), icon: <CartIcon />, color: '#10b981' },
          { label: 'Rata-rata / Order', value: formatRupiah(stats.avgOrder), icon: <TrendingUpIcon />, color: '#f59e0b' },
          { label: 'Produk Terlaris', value: stats.topProduct, icon: <StarIcon />, color: '#8b5cf6' },
        ].map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card sx={{ p: 2.5, borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar sx={{ bgcolor: alpha(item.color, 0.1), color: item.color, width: 44, height: 44, borderRadius: 2 }}>
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
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Tren Penjualan 6 Bulan Terakhir</Typography>
              <Chip label="6 bulan" size="small" sx={{ bgcolor: '#ecfdf5', color: '#10b981', fontWeight: 600 }} />
            </Stack>
            <BarChart data={recentData} height={200} />
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>* Total pendapatan per bulan</Typography>
              <Stack direction="row" spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: 1, bgcolor: '#10b981' }} />
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Pendapatan</Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Penjualan per Kategori</Typography>
            <DonutChart data={CATEGORY_SALES} size={150} />
          </Paper>
        </Grid>
      </Grid>

      {/* TABEL DETAIL BULANAN */}
      <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Rincian Bulanan</Typography>
          <Chip label="12 bulan" size="small" sx={{ bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }} />
        </Stack>
        <Box sx={{ overflowX: 'auto' }}>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse',
            '& th, & td': { px: 2, py: 1.5, textAlign: 'left', borderBottom: '1px solid #f1f5f9' },
            '& th': { color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' },
            '& td': { color: '#0f172a', fontWeight: 500 },
          }}>
            <thead>
              <tr>
                <th>Bulan</th>
                <th>Pendapatan</th>
                <th>Jumlah Order</th>
                <th>Rata-rata Order</th>
                <th>Pertumbuhan</th>
              </tr>
            </thead>
            <tbody>
              {MONTHLY_SALES.map((row, index) => {
                const prevRevenue = index > 0 ? MONTHLY_SALES[index - 1].revenue : row.revenue;
                const growth = ((row.revenue - prevRevenue) / prevRevenue) * 100;
                const isPositive = growth >= 0;
                return (
                  <tr key={row.month}>
                    <td><Typography fontWeight={700}>{row.month}</Typography></td>
                    <td>{formatRupiah(row.revenue)}</td>
                    <td>{row.orders}</td>
                    <td>{formatRupiah(row.avgOrder)}</td>
                    <td>
                      <Chip
                        label={`${isPositive ? '+' : ''}${growth.toFixed(1)}%`}
                        size="small"
                        sx={{
                          bgcolor: isPositive ? alpha('#10b981', 0.1) : alpha('#ef4444', 0.1),
                          color: isPositive ? '#10b981' : '#ef4444',
                          fontWeight: 700,
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}