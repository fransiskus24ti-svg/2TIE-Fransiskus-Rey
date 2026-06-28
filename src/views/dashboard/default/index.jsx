// src/views/pages/dashboard/index.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function DashboardPremium() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Dashboard Premium</Typography>
      <Typography>Selamat datang di dashboard admin. Konten dashboard akan ditampilkan di sini.</Typography>
    </Box>
  );
}