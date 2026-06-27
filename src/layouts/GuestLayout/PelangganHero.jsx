import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  alpha,
  Paper,
  Fade,
  Grow,
  Zoom
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  ShoppingCart,
  History,
  Build,
  Speed,
  Security,
  Star,
  ArrowForward,
  TrendingUp,
  Receipt,
  Storefront,
  CheckCircle,
  Bolt,
  Devices,
  Backup
} from '@mui/icons-material';
import { useRef, useEffect, useState } from 'react';

export default function GuestHero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const floatingIcons = [
    { icon: <Build />, delay: 0, top: '12%', left: '3%', color: theme.palette.warning.main },
    { icon: <Bolt />, delay: 0.3, top: '75%', left: '88%', color: theme.palette.secondary.main },
    { icon: <Security />, delay: 0.6, top: '82%', left: '8%', color: theme.palette.success.main },
    { icon: <Devices />, delay: 0.9, top: '18%', left: '92%', color: theme.palette.info.main },
    { icon: <Backup />, delay: 1.2, top: '45%', left: '95%', color: theme.palette.primary.light }
  ];

  // Data transaksi terakhir yang lebih kaya
  const lastTransaction = {
    time: '2 menit yang lalu',
    items: 3,
    total: 'Rp 1.240.000',
    products: [
      { name: 'Semen', qty: '2 sak', price: 'Rp 120.000' },
      { name: 'Batu Bata', qty: '100 pcs', price: 'Rp 80.000' },
      { name: 'Cat', qty: '5 kg', price: 'Rp 250.000' }
    ],
    status: 'Selesai'
  };

  return (
    <Box
      ref={heroRef}
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 'auto', md: '92vh' },
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.background.default,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `
                        radial-gradient(circle at 10% 30%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%),
                        radial-gradient(circle at 90% 70%, ${alpha(theme.palette.secondary.main, 0.06)} 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, ${alpha(theme.palette.background.paper, 0.3)} 0%, transparent 100%)
                    `,
          pointerEvents: 'none'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `
                        repeating-linear-gradient(45deg, ${alpha(theme.palette.divider, 0.02)} 0px, ${alpha(theme.palette.divider, 0.02)} 2px, transparent 2px, transparent 10px)
                    `,
          pointerEvents: 'none'
        }
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', py: { xs: 6, md: 12 }, zIndex: 2 }}>
        <Grid container spacing={5} alignItems="center">
          {/* Kiri: Konten Utama dengan animasi */}
          <Grid item xs={12} md={6}>
            <Fade in={isVisible} timeout={800}>
              <Stack
                spacing={3}
                sx={{ transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'transform 0.6s ease-out' }}
              >
                <Chip
                  label="🚀 Mode Guest"
                  color="primary"
                  variant="outlined"
                  sx={{
                    width: 'fit-content',
                    borderRadius: 40,
                    fontWeight: 700,
                    backdropFilter: 'blur(8px)',
                    bgcolor: alpha(theme.palette.background.paper, 0.7),
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    '& .MuiChip-label': { px: 2 },
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '2.8rem', sm: '4rem', md: '4.8rem' },
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05,
                    background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 60%, ${theme.palette.secondary.main} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    textShadow: 'none'
                  }}
                >
                  Beli Bahan Bangunan
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      color: theme.palette.primary.main,
                      background: 'none',
                      backgroundClip: 'unset',
                      WebkitBackgroundClip: 'unset',
                      color: theme.palette.primary.main
                    }}
                  >
                    Tanpa Ribet
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.secondary,
                    maxWidth: 550,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}
                >
                  Mode Guest untuk kasir dan riwayat transaksi—cepat, aman, dan tanpa perlu login. Tersimpan otomatis di perangkat Anda.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                  <Button
                    component={RouterLink}
                    to="/guest/transaksi"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      borderRadius: 60,
                      px: 4.5,
                      py: 1.4,
                      fontWeight: 800,
                      textTransform: 'none',
                      fontSize: '1rem',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-4px) scale(1.02)',
                        boxShadow: `0 16px 40px ${alpha(theme.palette.primary.main, 0.45)}`
                      },
                      '&:active': {
                        transform: 'scale(0.98)'
                      }
                    }}
                  >
                    Mulai Transaksi
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/guest/riwayat-transaksi"
                    variant="outlined"
                    size="large"
                    startIcon={<History />}
                    sx={{
                      borderRadius: 60,
                      px: 4,
                      py: 1.4,
                      fontWeight: 700,
                      textTransform: 'none',
                      borderWidth: 2,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderWidth: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                        boxShadow: `0 8px 20px ${alpha(theme.palette.common.black, 0.06)}`
                      }
                    }}
                  >
                    Lihat Riwayat
                  </Button>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 3 }} sx={{ mt: 3, pt: 2 }} useFlexGap>
                  {[
                    { icon: <CheckCircle sx={{ fontSize: 18 }} />, label: 'Tanpa Login' },
                    { icon: <Backup sx={{ fontSize: 18 }} />, label: 'Tersimpan Otomatis' },
                    { icon: <Bolt sx={{ fontSize: 18 }} />, label: 'Akses Cepat' }
                  ].map((item) => (
                    <Box
                      key={item.label}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        bgcolor: alpha(theme.palette.background.paper, 0.5),
                        backdropFilter: 'blur(4px)',
                        px: 2,
                        py: 0.8,
                        borderRadius: 40,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                      }}
                    >
                      <Box sx={{ color: theme.palette.primary.main }}>{item.icon}</Box>
                      <Typography variant="caption" fontWeight={600}>
                        {item.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Fade>
          </Grid>

          {/* Kanan: Card Premium dengan transaksi terakhir */}
          <Grid item xs={12} md={6}>
            <Grow in={isVisible} timeout={1000} style={{ transformOrigin: 'center bottom' }}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  perspective: '1000px'
                }}
              >
                <Card
                  sx={{
                    width: '100%',
                    maxWidth: 520,
                    borderRadius: 6,
                    overflow: 'hidden',
                    backdropFilter: 'blur(16px)',
                    bgcolor: alpha(theme.palette.background.paper, 0.75),
                    boxShadow: `0 30px 60px -20px ${alpha(theme.palette.common.black, 0.3)}, inset 0 1px 0 ${alpha(theme.palette.common.white, 0.5)}`,
                    border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease',
                    '&:hover': {
                      transform: 'translateY(-12px) rotateX(2deg) rotateY(-1deg)',
                      boxShadow: `0 40px 80px -20px ${alpha(theme.palette.common.black, 0.4)}`
                    }
                  }}
                >
                  {/* Background gradien di header card */}
                  <Box
                    sx={{
                      position: 'relative',
                      height: { xs: 160, md: 200 },
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(circle at 30% 40%, ${alpha(theme.palette.common.white, 0.15)} 0%, transparent 60%)`
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        zIndex: 1
                      }}
                    >
                      <ShoppingCart
                        sx={{
                          fontSize: 72,
                          color: 'white',
                          opacity: 0.9,
                          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
                          animation: 'float-cart 3s ease-in-out infinite',
                          '@keyframes float-cart': {
                            '0%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-12px)' },
                            '100%': { transform: 'translateY(0px)' }
                          }
                        }}
                      />
                      <Box>
                        <Typography variant="h4" fontWeight={800} color="white" sx={{ textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                          Guest Mode
                        </Typography>
                        <Typography variant="caption" sx={{ color: alpha('#fff', 0.8), fontWeight: 500 }}>
                          Belanja tanpa hambatan
                        </Typography>
                      </Box>
                    </Box>
                    {/* Ornamen dekoratif */}
                    <Box
                      sx={{
                        position: 'absolute',
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        bgcolor: alpha(theme.palette.common.white, 0.05),
                        top: -60,
                        right: -60
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        bgcolor: alpha(theme.palette.common.white, 0.05),
                        bottom: -40,
                        left: -40
                      }}
                    />
                  </Box>

                  <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
                      <Typography variant="h6" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Receipt sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                        Transaksi Terakhir
                      </Typography>
                      <Chip
                        label={lastTransaction.status}
                        size="small"
                        sx={{
                          bgcolor: alpha(theme.palette.success.main, 0.12),
                          color: theme.palette.success.main,
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          borderRadius: 20
                        }}
                      />
                    </Stack>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        mb: 2,
                        p: 1.5,
                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                        borderRadius: 3,
                        border: `1px solid ${alpha(theme.palette.divider, 0.06)}`
                      }}
                    >
                      <Stack direction="row" spacing={2} divider={<Box sx={{ width: 1, bgcolor: theme.palette.divider, opacity: 0.3 }} />}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 500 }}>
                            Waktu
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {lastTransaction.time}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 500 }}>
                            Item
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {lastTransaction.items} produk
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 500 }}>
                            Total
                          </Typography>
                          <Typography variant="body2" fontWeight={700} color="primary.main">
                            {lastTransaction.total}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    <Stack spacing={1} mb={2}>
                      {lastTransaction.products.map((product, idx) => (
                        <Paper
                          key={idx}
                          elevation={0}
                          sx={{
                            p: 1.2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            bgcolor: alpha(theme.palette.background.default, 0.5),
                            borderRadius: 2,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: alpha(theme.palette.primary.main, 0.04),
                              transform: 'translateX(4px)'
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Storefront sx={{ fontSize: 18, color: theme.palette.primary.main, opacity: 0.6 }} />
                            <Typography variant="body2" fontWeight={600}>
                              {product.name}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography variant="caption" color="text.secondary">
                              {product.qty}
                            </Typography>
                            <Typography variant="caption" fontWeight={600}>
                              {product.price}
                            </Typography>
                          </Box>
                        </Paper>
                      ))}
                    </Stack>

                    <Button
                      component={RouterLink}
                      to="/guest/riwayat-transaksi"
                      variant="text"
                      size="medium"
                      endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        textTransform: 'none',
                        borderRadius: 40,
                        px: 2,
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.06)
                        }
                      }}
                    >
                      Lihat Detail Transaksi
                    </Button>
                  </CardContent>
                </Card>

                {/* Floating icons dengan animasi yang lebih hidup */}
                {!isMobile &&
                  floatingIcons.map((item, idx) => (
                    <Zoom in={isVisible} key={idx} style={{ transitionDelay: `${idx * 100}ms` }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: item.top,
                          left: item.left,
                          transform: 'translate(-50%, -50%)',
                          bgcolor: alpha(theme.palette.background.paper, 0.85),
                          backdropFilter: 'blur(12px)',
                          borderRadius: '50%',
                          p: 1.2,
                          boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.12)}, 0 0 0 1px ${alpha(theme.palette.divider, 0.1)}`,
                          color: item.color || theme.palette.primary.main,
                          transition: 'all 0.3s ease',
                          animation: `float-icon ${3 + idx * 0.5}s ease-in-out infinite`,
                          animationDelay: `${idx * 0.4}s`,
                          '@keyframes float-icon': {
                            '0%': { transform: 'translate(-50%, -50%) translateY(0px) rotate(0deg)' },
                            '50%': { transform: 'translate(-50%, -50%) translateY(-14px) rotate(8deg)' },
                            '100%': { transform: 'translate(-50%, -50%) translateY(0px) rotate(0deg)' }
                          },
                          '&:hover': {
                            transform: 'translate(-50%, -50%) scale(1.2)',
                            bgcolor: theme.palette.background.paper,
                            boxShadow: `0 12px 32px ${alpha(theme.palette.common.black, 0.2)}`
                          }
                        }}
                      >
                        <IconButton size="small" sx={{ color: 'inherit', p: 0.5 }}>
                          {item.icon}
                        </IconButton>
                      </Box>
                    </Zoom>
                  ))}
              </Box>
            </Grow>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
