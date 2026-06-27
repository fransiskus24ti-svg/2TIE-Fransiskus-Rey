import React from 'react';
import {
  Box, Typography, Stack, Paper, Grid, Card, Button, TextField, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SaveIcon from '@mui/icons-material/Save';
import SpeedIcon from '@mui/icons-material/Speed';

const HomeGuest = () => {
  return (
    <Box sx={{ width: '100%', minHeight: '80vh', bgcolor: '#f5f7fa', pb: 4 }}>
      {/* ===== HERO / GUEST MODE ===== */}
      <Box sx={{ px: { xs: 2, sm: 4 }, pt: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #ede7f6 0%, #f3e5f5 100%)',
            border: '1px solid #d1c4e9',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
            Beli Bahan Bangunan Tanpa Ribet
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569', maxWidth: 600, mb: 3 }}>
            Mode Guest untuk koper dan rakyat transaksi – cepat, aman, dan tanpa perilaguna.
            Terjamin otomatis di perangkat Anda
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  textAlign: 'center',
                }}
              >
                <LockOpenIcon sx={{ fontSize: 40, color: '#9c27b0' }} />
                <Typography variant="subtitle1" fontWeight={700}>
                  Tanpa login
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  textAlign: 'center',
                }}
              >
                <SaveIcon sx={{ fontSize: 40, color: '#9c27b0' }} />
                <Typography variant="subtitle1" fontWeight={700}>
                  Terjamin otomatis
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  textAlign: 'center',
                }}
              >
                <SpeedIcon sx={{ fontSize: 40, color: '#9c27b0' }} />
                <Typography variant="subtitle1" fontWeight={700}>
                  Alesan Cepat
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* ===== TRANSAKSI TERAKHIR ===== */}
      <Box sx={{ px: { xs: 2, sm: 4 }, mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 2 }}>
          Transaksi Terakhir
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', display: 'block', mb: 2 }}>
          <Box component="span" sx={{ fontWeight: 600 }}>
            Semen
          </Box>{' '}
          |{' '}
          <Box component="span" sx={{ fontWeight: 600 }}>
            Batu Bata
          </Box>{' '}
          |{' '}
          <Box component="span" sx={{ fontWeight: 600 }}>
            Cat
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeGuest;


