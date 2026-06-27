import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Jika sudah login (token ada), langsung redirect ke dashboard
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('🔐 Token ditemukan, redirect ke dashboard');
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Email dan password wajib diisi');
      setLoading(false);
      return;
    }

    try {
      // Contoh login hardcoded
      if (email === 'admin@materiality.com' && password === 'admin123') {
        console.log('✅ Login sukses, menyimpan token...');
        localStorage.setItem('token', 'dummy-token');
        console.log('✅ Token tersimpan, redirect ke dashboard');
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError('Email atau password salah');
      }
    } catch (err) {
      setError('Terjadi kesalahan, silakan coba lagi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #3b5bfd, #6f86ff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Card
        sx={{
          width: 400,
          borderRadius: 4,
          boxShadow: 10,
          backgroundColor: '#ffffff',
          color: '#0f172a'
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Typography variant="h3" fontWeight="bold" mb={1}>
            Welcome Back 👋
          </Typography>
          <Typography color="text.secondary" mb={4}>
            Login Owner / Karyawan
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </form>

          <Typography textAlign="center" mt={3}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
          <Typography textAlign="center" mt={1}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}