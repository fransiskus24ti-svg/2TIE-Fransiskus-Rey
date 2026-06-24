import React from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';

export default function LaporanLayout({ title, subtitle, children }) {
  return (
    <Box sx={{ p: 0 }}>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 4,
          px: { xs: 1.5, md: 3 },
          py: { xs: 1.25, md: 2 },
          mb: 3,
          mx: { xs: 0, md: 0 },
          backgroundColor: '#0f172a',
        }}
      >
        <Stack spacing={0.5}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#e2e8f0', wordBreak: 'break-word' }}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="body1" sx={{ color: '#94a3b8' }}>
              {subtitle}
            </Typography>
          ) : null}
        </Stack>
      </Paper>

      {children}
    </Box>
  );
}

