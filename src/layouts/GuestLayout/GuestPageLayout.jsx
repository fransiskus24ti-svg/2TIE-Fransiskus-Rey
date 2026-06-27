import React from 'react';
import { Box, Container, Stack, Typography, alpha } from '@mui/material';

export default function GuestPageLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 6 },
        background: (theme) =>
          `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(
            theme.palette.background.default,
            0.98
          )} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Box sx={{ textAlign: 'center' }}>
            {title && (
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  letterSpacing: -0.02,
                  background: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 720, mx: 'auto', lineHeight: 1.7 }}>
                {subtitle}
              </Typography>
            )}
          </Box>

          {children}
        </Stack>
      </Container>
    </Box>
  );
}

