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
  TrendingDown as TrendingDownIcon,
  AttachMoney as MoneyIcon,
  Receipt as ReceiptIcon,
  AccountBalance as BalanceIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from '@mui/icons-material';

// =========================== DATA DUMMY ===========================
const MONTHLY_DATA = [
  { month: 'Jan', revenue: 45000000, cost: 33000000, grossProfit: 12000000, otherIncome: 2000000, netProfit: 14000000 },
  { month: 'Feb', revenue: 52000000, cost: 38000000, grossProfit: 14000000, otherIncome: 1000000, netProfit: 15000000 },
  { month: 'Mar', revenue: 48000000, cost: 37000000, grossProfit: 11000000, otherIncome: 3000000, netProfit: 14000000 },
  { month: 'Apr', revenue: 61000000, cost: 43000000, grossProfit: 18000000, otherIncome: 2000000, netProfit: 20000000 },
  { month: 'May', revenue: 55000000, cost: 40000000, grossProfit: 15000000, otherIncome: 1000000, netProfit: 16000000 },
  { month: 'Jun', revenue: 67000000, cost: 46000000, grossProfit: 21000000, otherIncome: 4000000, netProfit: 25000000 },
  { month: 'Jul', revenue: 72000000, cost: 48000000, grossProfit: 24000000, otherIncome: 3000000, netProfit: 27000000 },
  { month: 'Aug', revenue: 68000000, cost: 46000000, grossProfit: 22000000, otherIncome: 2000000, netProfit: 24000000 },
  { month: 'Sep', revenue: 59000000, cost: 43000000, grossProfit: 16000000, otherIncome: 1000000, netProfit: 17000000 },
  { month: 'Oct', revenue: 63000000, cost: 44000000, grossProfit: 19000000, otherIncome: 2000000, netProfit: 21000000 },
  { month: 'Nov', revenue: 70000000, cost: 47000000, grossProfit: 23000000, otherIncome: 3000000, netProfit: 26000000 },
  { month: 'Dec', revenue: 85000000, cost: 55000000, grossProfit: 30000000, otherIncome: 5000000, netProfit: 35000000 },
];

const EXPENSE_CATEGORIES = [
  { label: 'HPP', value: 55, color: '#ef4444' },
  { label: 'Gaji', value: 25, color: '#f59e0b' },
  { label: 'Sewa', value: 10, color: '#3b82f6' },
  { label: 'Lainnya', value: 10, color: '#8b5cf6' },
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
                  background: 'linear-gradient(180deg, #3b82f6, #93c5fd)',
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
            {formatRupiah(55000000)}
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
export default function LaporanLabaRugi() {
  const [period, setPeriod] = useState('Bulanan');

  // Statistik agregat
  const stats = useMemo(() => {
    const totalRevenue = MONTHLY_DATA.reduce((s, d) => s + d.revenue, 0);
    const totalCost = MONTHLY_DATA.reduce((s, d) => s + d.cost, 0);
    const totalGrossProfit = MONTHLY_DATA.reduce((s, d) => s + d.grossProfit, 0);
    const totalNetProfit = MONTHLY_DATA.reduce((s, d) => s + d.netProfit, 0);
    const margin = (totalNetProfit / totalRevenue) * 100;
    return { totalRevenue, totalCost, totalGrossProfit, totalNetProfit, margin };
  }, []);

  const recentData = MONTHLY_DATA.slice(-6);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* HEADER */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 1 }}>
            <BalanceIcon sx={{ color: '#3b82f6', fontSize: 32 }} />
            Laporan Laba-Rugi
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
            Estimasi laba berdasarkan margin keuntungan dan rincian transaksi
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: { xs: 2, md: 0 } }}>
          <ButtonGroup variant="outlined" size="small">
            {['Harian', 'Mingguan', 'Bulanan', 'Tahunan'].map((p) => (
              <Button
                key={p}
                onClick={() => setPeriod(p)}
                sx={{
                  bgcolor: period === p ? '#3b82f6' : 'transparent',
                  color: period === p ? '#fff' : '#475569',
                  borderColor: period === p ? '#3b82f6' : '#cbd5e1',
                  '&:hover': { bgcolor: period === p ? '#2563eb' : '#f1f5f9' },
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
          { label: 'Total Pendapatan', value: formatRupiah(stats.totalRevenue), icon: <MoneyIcon />, color: '#2563eb' },
          { label: 'Total Biaya', value: formatRupiah(stats.totalCost), icon: <TrendingDownIcon />, color: '#ef4444' },
          { label: 'Laba Kotor', value: formatRupiah(stats.totalGrossProfit), icon: <TrendingUpIcon />, color: '#f59e0b' },
          { label: 'Laba Bersih', value: formatRupiah(stats.totalNetProfit), icon: <TrendingUpIcon />, color: '#10b981' },
          { label: 'Margin Laba', value: `${stats.margin.toFixed(1)}%`, icon: <ReceiptIcon />, color: '#8b5cf6' },
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
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Pendapatan 6 Bulan Terakhir</Typography>
              <Chip label="6 bulan" size="small" sx={{ bgcolor: '#eff6ff', color: '#2563eb', fontWeight: 600 }} />
            </Stack>
            <BarChart data={recentData} height={200} />
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>* Pendapatan kotor sebelum biaya</Typography>
              <Stack direction="row" spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: 1, bgcolor: '#3b82f6' }} />
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Pendapatan</Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Komposisi Biaya</Typography>
            <DonutChart data={EXPENSE_CATEGORIES} size={150} />
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
                <th>Biaya</th>
                <th>Laba Kotor</th>
                <th>Pendapatan Lain</th>
                <th>Laba Bersih</th>
                <th>Margin</th>
              </tr>
            </thead>
            <tbody>
              {MONTHLY_DATA.map((row) => {
                const margin = (row.netProfit / row.revenue) * 100;
                return (
                  <tr key={row.month}>
                    <td><Typography fontWeight={700}>{row.month}</Typography></td>
                    <td>{formatRupiah(row.revenue)}</td>
                    <td>{formatRupiah(row.cost)}</td>
                    <td>{formatRupiah(row.grossProfit)}</td>
                    <td>{formatRupiah(row.otherIncome)}</td>
                    <td><Typography color={row.netProfit > 0 ? '#10b981' : '#ef4444'} fontWeight={700}>{formatRupiah(row.netProfit)}</Typography></td>
                    <td>
                      <Chip label={`${margin.toFixed(1)}%`} size="small"
                        sx={{ bgcolor: margin > 20 ? alpha('#10b981', 0.1) : alpha('#f59e0b', 0.1),
                              color: margin > 20 ? '#10b981' : '#f59e0b', fontWeight: 700 }} />
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