import React from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Stack,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  Fade,
  Slide,
  alpha,
} from '@mui/material';
import {
  ShoppingCart,
  CheckCircle,
  Refresh,
  TrendingUp,
  Speed,
  Security,
  SupportAgent,
  Storefront,
  LocalShipping,
  Payment,
} from '@mui/icons-material';

const PelangganGuest = () => {
  const features = [
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Cepat & Ringan',
      desc: 'Proses transaksi tanpa hambatan, cocok untuk pembelian dadakan.',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Aman Terenkripsi',
      desc: 'Data Anda dilindungi dengan sistem keamanan berlapis.',
    },
    {
      icon: <Refresh sx={{ fontSize: 40 }} />,
      title: 'Otomatis Tersimpan',
      desc: 'Keranjang tetap tersimpan meski tanpa login.',
    },
    {
      icon: <SupportAgent sx={{ fontSize: 40 }} />,
      title: 'Dukungan 24/7',
      desc: 'Tim kami siap membantu kapan pun Anda butuh.',
    },
  ];

  const steps = [
    { label: 'Pilih Produk', icon: <Storefront />, desc: 'Cari dan tambahkan bahan bangunan ke keranjang.' },
    { label: 'Isi Data Diri', icon: <Payment />, desc: 'Masukkan nama, alamat, dan kontak Anda.' },
    { label: 'Konfirmasi & Bayar', icon: <LocalShipping />, desc: 'Periksa pesanan dan selesaikan pembayaran.' },
  ];

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* ===== HERO SECTION ===== */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 6, md: 10 },
          px: { xs: 2, sm: 4, md: 6 },
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -150,
            right: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 70%)',
            animation: 'pulse 8s ease-in-out infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -120,
            left: -120,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
            animation: 'pulse 10s ease-in-out infinite reverse',
          },
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' },
            '100%': { transform: 'scale(1)' },
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Fade in timeout={800}>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <Chip
                      label="Mode Guest"
                      size="small"
                      sx={{
                        bgcolor: alpha('#4F46E5', 0.2),
                        color: '#a5b4fc',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        letterSpacing: '0.05em',
                        borderRadius: '20px',
                        px: 1.5,
                      }}
                    />
                    <Box sx={{ flex: 1, height: 1, bgcolor: alpha('#fff', 0.08) }} />
                  </Stack>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      color: '#fff',
                      fontSize: { xs: '2.4rem', sm: '3.5rem', md: '4.5rem' },
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                      mb: 2,
                    }}
                  >
                    Beli Bahan Bangunan
                    <Box component="span" sx={{ display: 'block', color: '#a5b4fc' }}>
                      Tanpa Login
                    </Box>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: alpha('#fff', 0.75),
                      maxWidth: 600,
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                      mb: 4,
                    }}
                  >
                    Mode Guest memungkinkan Anda berbelanja cepat tanpa perlu membuat akun.
                    Cukup isi data diri, pilih bahan, dan selesaikan transaksi – praktis!
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      sx={{
                        bgcolor: '#4F46E5',
                        color: '#fff',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: '14px',
                        px: 5,
                        py: 1.6,
                        fontSize: '1rem',
                        boxShadow: '0 8px 30px rgba(79,70,229,0.45)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: '#4338CA',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 14px 40px rgba(79,70,229,0.6)',
                        },
                      }}
                    >
                      Mulai Belanja
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: alpha('#fff', 0.3),
                        color: '#fff',
                        fontWeight: 500,
                        textTransform: 'none',
                        borderRadius: '14px',
                        px: 4,
                        py: 1.6,
                        fontSize: '1rem',
                        '&:hover': {
                          borderColor: '#fff',
                          bgcolor: alpha('#fff', 0.08),
                        },
                      }}
                    >
                      Lihat Panduan
                    </Button>
                  </Stack>
                  <Stack direction="row" spacing={3} sx={{ mt: 4, flexWrap: 'wrap' }}>
                    {[
                      { icon: <CheckCircle />, label: 'Tanpa Registrasi' },
                      { icon: <Refresh />, label: 'Otomatis Tersimpan' },
                      { icon: <TrendingUp />, label: 'Proses Cepat' },
                    ].map((item, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                        <Box sx={{ color: '#a5b4fc', display: 'flex' }}>{item.icon}</Box>
                        <Typography variant="caption" sx={{ color: alpha('#fff', 0.7), fontWeight: 500 }}>
                          {item.label}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Slide direction="left" in timeout={1000}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    component="img"
                    src="https://via.placeholder.com/400x300?text=Ilustrasi+Guest+Mode"
                    alt="Guest Mode Illustration"
                    sx={{
                      maxWidth: '100%',
                      borderRadius: '20px',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                      border: `1px solid ${alpha('#fff', 0.1)}`,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      bgcolor: '#4F46E5',
                      borderRadius: '50%',
                      p: 1.5,
                      boxShadow: '0 10px 30px rgba(79,70,229,0.5)',
                      animation: 'float 3s ease-in-out infinite',
                    }}
                  >
                    <ShoppingCart sx={{ color: '#fff', fontSize: 32 }} />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -10,
                      left: -10,
                      bgcolor: '#10b981',
                      borderRadius: '50%',
                      p: 1,
                      boxShadow: '0 10px 30px rgba(16,185,129,0.4)',
                      animation: 'float 4s ease-in-out infinite reverse',
                    }}
                  >
                    <CheckCircle sx={{ color: '#fff', fontSize: 24 }} />
                  </Box>
                  <style>
                    {`
                      @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                        100% { transform: translateY(0px); }
                      }
                    `}
                  </style>
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ===== FEATURES SECTION ===== */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Fade in timeout={800}>
          <Box>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 700,
                color: '#0f172a',
                mb: 1,
                fontSize: { xs: '1.8rem', md: '2.5rem' },
              }}
            >
              Kenapa Memilih Mode Guest?
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{ color: '#64748b', maxWidth: 600, mx: 'auto', mb: 5 }}
            >
              Nikmati kemudahan berbelanja tanpa ribet, dengan berbagai keunggulan berikut.
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: '20px',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
                      },
                      p: 3,
                      textAlign: 'center',
                      border: `1px solid ${alpha('#0f172a', 0.05)}`,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: alpha('#4F46E5', 0.1),
                        color: '#4F46E5',
                        width: 72,
                        height: 72,
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a', mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                      {feature.desc}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Container>

      {/* ===== HOW IT WORKS ===== */}
      <Box sx={{ bgcolor: '#f1f5f9', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <Fade in timeout={800}>
            <Box>
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontWeight: 700,
                  color: '#0f172a',
                  mb: 1,
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                }}
              >
                Cara Belanja dalam 3 Langkah
              </Typography>
              <Typography
                variant="body1"
                align="center"
                sx={{ color: '#64748b', maxWidth: 600, mx: 'auto', mb: 5 }}
              >
                Proses sederhana untuk memudahkan Anda mendapatkan bahan bangunan.
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {steps.map((step, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        textAlign: 'center',
                        borderRadius: '20px',
                        bgcolor: '#fff',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          bgcolor: '#4F46E5',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Avatar
                        sx={{
                          bgcolor: alpha('#4F46E5', 0.1),
                          color: '#4F46E5',
                          width: 64,
                          height: 64,
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        {step.icon}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a', mb: 1 }}>
                        {step.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        {step.desc}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Box>
      {/* ===== END OF CONTENT (no Partners & no Footer) ===== */}
    </Box>
  );
};

export default PelangganGuest;