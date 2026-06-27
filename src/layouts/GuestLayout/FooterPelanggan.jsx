import React from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    Link,
    IconButton,
    TextField,
    InputAdornment,
    Button,
    Divider,
    Stack,
    Paper,
} from '@mui/material';
import {
    LocationOn,
    Phone,
    Email,
    AccessTime,
    Facebook,
    Instagram,
    Twitter,
    YouTube,
    Pinterest,
    Send,
    Payment,
    Storefront,
    LocalShipping,
    Security,
    WhatsApp,
} from '@mui/icons-material';

const FooterPelanggan = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: 'Tentang Kami', href: '#' },
        { label: 'Karir', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Kebijakan Privasi', href: '#' },
        { label: 'Syarat & Ketentuan', href: '#' },
    ];

    const categoryLinks = [
        { label: 'Bahan Bangunan', href: '#' },
        { label: 'Cat & Pelapis', href: '#' },
        { label: 'Perkakas', href: '#' },
        { label: 'Elektrikal', href: '#' },
        { label: 'Plumbing', href: '#' },
    ];

    const socialIcons = [
        { Icon: Facebook, color: '#1877F2', label: 'Facebook' },
        { Icon: Instagram, color: '#E4405F', label: 'Instagram' },
        { Icon: Twitter, color: '#1DA1F2', label: 'Twitter' },
        { Icon: YouTube, color: '#FF0000', label: 'YouTube' },
        { Icon: Pinterest, color: '#BD081C', label: 'Pinterest' },
        { Icon: WhatsApp, color: '#25D366', label: 'WhatsApp' },
    ];

    const paymentMethods = [
        'Visa',
        'Mastercard',
        'BCA',
        'Mandiri',
        'BNI',
        'BRI',
        'Gopay',
        'OVO',
        'ShopeePay',
        'Dana',
    ];

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: '#1a1a2e',
                color: '#e0e0e0',
                mt: 6,
                borderTop: '4px solid',
                borderImage: 'linear-gradient(90deg, #6C63FF, #FF6B6B, #FFD93D, #6BCB77) 1',
            }}
        >
            {/* Main Footer Content */}
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Grid container spacing={4}>
                    {/* Brand & About */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                            <Box
                                sx={{
                                    bgcolor: '#6C63FF',
                                    borderRadius: '12px',
                                    p: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Storefront sx={{ fontSize: 28, color: '#fff' }} />
                            </Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    color: '#fff',
                                    letterSpacing: '-0.5px',
                                }}
                            >
                                Materially
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    bgcolor: '#6C63FF',
                                    color: '#fff',
                                    px: 1,
                                    py: 0.3,
                                    borderRadius: '4px',
                                    fontSize: '0.6rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.5px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Official
                            </Typography>
                        </Box>

                        <Typography
                            variant="body2"
                            sx={{
                                color: '#b0b0c8',
                                lineHeight: 1.8,
                                mb: 2.5,
                                maxWidth: 400,
                            }}
                        >
                            Toko bahan bangunan terpercaya sejak 2010.
                            Menyediakan produk berkualitas dengan harga
                            terbaik untuk semua kebutuhan konstruksi dan
                            renovasi Anda.
                        </Typography>

                        {/* Contact Info */}
                        <Stack spacing={1.5}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <LocationOn sx={{ fontSize: 18, color: '#6C63FF' }} />
                                <Typography variant="body2" sx={{ color: '#b0b0c8' }}>
                                    Jl. Raya Bangunan No. 123, Jakarta
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Phone sx={{ fontSize: 18, color: '#6C63FF' }} />
                                <Typography variant="body2" sx={{ color: '#b0b0c8' }}>
                                    (021) 1234-5678
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Email sx={{ fontSize: 18, color: '#6C63FF' }} />
                                <Typography variant="body2" sx={{ color: '#b0b0c8' }}>
                                    info@materially.co.id
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <AccessTime sx={{ fontSize: 18, color: '#6C63FF' }} />
                                <Typography variant="body2" sx={{ color: '#b0b0c8' }}>
                                    Senin - Sabtu: 08.00 - 20.00
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={6} md={2}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: '#fff',
                                fontWeight: 600,
                                mb: 2.5,
                                fontSize: '1rem',
                                letterSpacing: '0.3px',
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -8,
                                    left: 0,
                                    width: 30,
                                    height: 3,
                                    bgcolor: '#6C63FF',
                                    borderRadius: '4px',
                                },
                            }}
                        >
                            Perusahaan
                        </Typography>
                        <Stack spacing={1.8}>
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    underline="none"
                                    sx={{
                                        color: '#b0b0c8',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            color: '#6C63FF',
                                            transform: 'translateX(4px)',
                                        },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Categories */}
                    <Grid item xs={6} md={2}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: '#fff',
                                fontWeight: 600,
                                mb: 2.5,
                                fontSize: '1rem',
                                letterSpacing: '0.3px',
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -8,
                                    left: 0,
                                    width: 30,
                                    height: 3,
                                    bgcolor: '#6C63FF',
                                    borderRadius: '4px',
                                },
                            }}
                        >
                            Kategori
                        </Typography>
                        <Stack spacing={1.8}>
                            {categoryLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    underline="none"
                                    sx={{
                                        color: '#b0b0c8',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            color: '#6C63FF',
                                            transform: 'translateX(4px)',
                                        },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Newsletter & Social */}
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: '#fff',
                                fontWeight: 600,
                                mb: 1.5,
                                fontSize: '1rem',
                                letterSpacing: '0.3px',
                            }}
                        >
                            Berlangganan Newsletter
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: '#b0b0c8', mb: 2 }}
                        >
                            Dapatkan promo eksklusif dan info terbaru
                            langsung ke email Anda.
                        </Typography>

                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                gap: 1,
                                mb: 3,
                                flexDirection: { xs: 'column', sm: 'row' },
                            }}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <TextField
                                placeholder="Email Anda"
                                variant="outlined"
                                size="small"
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'rgba(255,255,255,0.05)',
                                        borderRadius: '8px',
                                        '& fieldset': {
                                            borderColor: 'rgba(255,255,255,0.1)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(108,99,255,0.4)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#6C63FF',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#e0e0e0',
                                        py: 1.2,
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#8888aa',
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                endIcon={<Send />}
                                sx={{
                                    bgcolor: '#6C63FF',
                                    borderRadius: '8px',
                                    px: 3,
                                    py: 1.2,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    whiteSpace: 'nowrap',
                                    '&:hover': {
                                        bgcolor: '#5a52d5',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(108,99,255,0.35)',
                                    },
                                    transition: 'all 0.25s ease',
                                }}
                            >
                                Subscribe
                            </Button>
                        </Box>

                        {/* Social Media */}
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#8888aa',
                                display: 'block',
                                mb: 1.5,
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '0.7rem',
                            }}
                        >
                            Ikuti Kami
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {socialIcons.map(({ Icon, color, label }) => (
                                <IconButton
                                    key={label}
                                    aria-label={label}
                                    sx={{
                                        bgcolor: 'rgba(255,255,255,0.05)',
                                        color: '#b0b0c8',
                                        borderRadius: '10px',
                                        p: 1.2,
                                        transition: 'all 0.25s ease',
                                        '&:hover': {
                                            bgcolor: color,
                                            color: '#fff',
                                            transform: 'translateY(-4px)',
                                            boxShadow: `0 8px 25px ${color}40`,
                                        },
                                    }}
                                >
                                    <Icon fontSize="small" />
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>
                </Grid>

                {/* Payment Methods */}
                <Box
                    sx={{
                        mt: 4,
                        pt: 3,
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 2,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Payment sx={{ color: '#8888aa', fontSize: 20 }} />
                            <Typography
                                variant="caption"
                                sx={{ color: '#8888aa', fontWeight: 500, letterSpacing: '0.5px' }}
                            >
                                Metode Pembayaran:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                {paymentMethods.map((method) => (
                                    <Typography
                                        key={method}
                                        variant="caption"
                                        sx={{
                                            color: '#b0b0c8',
                                            bgcolor: 'rgba(255,255,255,0.05)',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: '4px',
                                            fontSize: '0.65rem',
                                            fontWeight: 500,
                                            letterSpacing: '0.3px',
                                            border: '1px solid rgba(255,255,255,0.06)',
                                        }}
                                    >
                                        {method}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LocalShipping sx={{ fontSize: 16, color: '#6BCB77' }} />
                                <Typography variant="caption" sx={{ color: '#b0b0c8', fontSize: '0.7rem' }}>
                                    Gratis Ongkir*
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Security sx={{ fontSize: 16, color: '#FFD93D' }} />
                                <Typography variant="caption" sx={{ color: '#b0b0c8', fontSize: '0.7rem' }}>
                                    Aman & Terpercaya
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>

            {/* Bottom Bar */}
            <Box
                sx={{
                    bgcolor: 'rgba(0,0,0,0.3)',
                    py: 2.5,
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#8888aa',
                                fontSize: '0.8rem',
                            }}
                        >
                            &copy; {currentYear} Materially - Toko Bangunan.
                            All rights reserved.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Link
                                href="#"
                                underline="none"
                                sx={{
                                    color: '#8888aa',
                                    fontSize: '0.75rem',
                                    transition: 'color 0.2s ease',
                                    '&:hover': { color: '#6C63FF' },
                                }}
                            >
                                Kebijakan Privasi
                            </Link>
                            <Link
                                href="#"
                                underline="none"
                                sx={{
                                    color: '#8888aa',
                                    fontSize: '0.75rem',
                                    transition: 'color 0.2s ease',
                                    '&:hover': { color: '#6C63FF' },
                                }}
                            >
                                Syarat & Ketentuan
                            </Link>
                            <Link
                                href="#"
                                underline="none"
                                sx={{
                                    color: '#8888aa',
                                    fontSize: '0.75rem',
                                    transition: 'color 0.2s ease',
                                    '&:hover': { color: '#6C63FF' },
                                }}
                            >
                                Bantuan
                            </Link>
                            <Link
                                href="#"
                                underline="none"
                                sx={{
                                    color: '#8888aa',
                                    fontSize: '0.75rem',
                                    transition: 'color 0.2s ease',
                                    '&:hover': { color: '#6C63FF' },
                                }}
                            >
                                Hubungi Kami
                            </Link>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default FooterPelanggan;