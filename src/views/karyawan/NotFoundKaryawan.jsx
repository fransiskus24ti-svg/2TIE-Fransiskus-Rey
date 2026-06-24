import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import { useNavigate } from 'react-router-dom';

export default function NotFoundKaryawan() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          py: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 720,
            width: '100%',
            p: { xs: 2, md: 4 },
            borderRadius: 4,
            border: '1px solid rgba(25, 118, 210, 0.18)',
            background:
              'linear-gradient(180deg, rgba(25, 118, 210, 0.06) 0%, rgba(255,255,255,1) 70%)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 3,
                bgcolor: 'rgba(25, 118, 210, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(25, 118, 210, 0.18)',
                flexShrink: 0,
              }}
            >
              <ConstructionOutlinedIcon sx={{ color: '#1976d2', fontSize: 28 }} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                Halaman tidak ditemukan
              </Typography>
              <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.6 }}>
                URL yang kamu buka tidak tersedia untuk akses Karyawan.
                <br />
                Coba kembali ke menu Karyawan.
              </Typography>

              <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/karyawan/dashboard')}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: '0 10px 25px rgba(25,118,210,0.22)',
                  }}
                >
                  Kembali ke Dashboard Karyawan
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/karyawan/kasir')}
                  sx={{ textTransform: 'none', borderRadius: 2 }}
                >
                  Ke Halaman Kasir
                </Button>
              </Box>

              <Typography
                variant="caption"
                sx={{ mt: 2, display: 'block', color: 'text.secondary' }}
              >
                Tip: cek kembali penulisan URL atau pilih menu dari sidebar.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

