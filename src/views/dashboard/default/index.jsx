// material-ui
import { Grid, Typography, Box, Stack, Card, Avatar } from '@mui/material';
import { GRID_SPACING } from 'config';

// assets (Icons)
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import WarningAmberTwoToneIcon from '@mui/icons-material/WarningAmberTwoTone';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// Ikon Tambahan untuk Status & Catatan
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

export default function Default() {
  
  const reportTokoData = [
    { title: 'Pendapatan', primary: 'Rp 15.2M', secondary: '+Rp 2.4M hari ini', iconPrimary: StorefrontTwoToneIcon, color: '#2196f3', lightColor: '#e3f2fd' },
    { title: 'Total Stok', primary: '1.240 Sak', secondary: 'Semen & Material', iconPrimary: InventoryTwoToneIcon, color: '#4caf50', lightColor: '#e8f5e9' },
    { title: 'Penjualan', primary: '45 Nota', secondary: 'Selesai diproses', iconPrimary: ShoppingCartTwoToneIcon, color: '#ffc107', lightColor: '#fff8e1' },
    { title: 'Kritis (Stok)', primary: '5 Item', secondary: 'Butuh cek gudang', iconPrimary: WarningAmberTwoToneIcon, color: '#f44336', lightColor: '#ffebee' }
  ];

  return (
    <Box sx={{ width: '100%', pb: 4 }}>
      
      {/* BARIS 1: 4 KARTU STATISTIK */}
      <Grid container spacing={GRID_SPACING} sx={{ mb: GRID_SPACING }}>
        {reportTokoData.map((data, index) => {
          const IconComponent = data.iconPrimary;
          return (
            <Grid key={index} item lg={3} md={6} sm={6} xs={12}>
              <Card sx={{ 
                p: 2.5, 
                borderRadius: '16px', 
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.04)', 
                border: '1px solid #eef2f6',
                bgcolor: '#fff'
              }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                      {data.title}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '1.6rem' }}>
                      {data.primary}
                    </Typography>
                  </Stack>
                  <Avatar sx={{ bgcolor: data.lightColor, color: data.color, width: 48, height: 48, borderRadius: '12px' }}>
                    <IconComponent sx={{ fontSize: '1.6rem' }} />
                  </Avatar>
                </Stack>
                
                <Stack direction="row" spacing={0.5} alignItems="center">
                  {index === 0 && <ArrowUpwardIcon sx={{ color: '#22c55e', fontSize: '14px' }} />}
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                    {data.secondary}
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* BARIS 2 & 3: TAMPILAN MELEBAR PENUH KE KANAN */}
      <Stack spacing={GRID_SPACING} sx={{ width: '100%' }}>
        
        {/* 1. AKTIVITAS PENJUALAN TERAKHIR */}
        <Box sx={{ 
          p: 3.5, 
          bgcolor: '#fff', 
          borderRadius: '16px', 
          boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.04)',
          border: '1px solid #eef2f6',
          width: '100%'
        }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#1e293b', fontSize: '1.25rem' }}>
            Aktivitas Penjualan Terakhir
          </Typography>

          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pb: 1.5, borderBottom: '1px solid #f1f5f9' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 36, height: 36, bgcolor: '#e8f5e9', color: '#4caf50' }}>
                  <CheckCircleIcon sx={{ fontSize: '1.3rem' }} />
                </Avatar>
                <Typography variant="body1" sx={{ color: '#334155', fontSize: '0.95rem' }}>
                  <b>Semen Padang</b> — Terjual 10 Sak
                </Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500, fontSize: '0.85rem' }}>Barusan</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pb: 1.5, borderBottom: '1px solid #f1f5f9' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 36, height: 36, bgcolor: '#e8f5e9', color: '#4caf50' }}>
                  <CheckCircleIcon sx={{ fontSize: '1.3rem' }} />
                </Avatar>
                <Typography variant="body1" sx={{ color: '#334155', fontSize: '0.95rem' }}>
                  <b>Cat Avian 5kg</b> — Terjual 2 Kaleng
                </Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500, fontSize: '0.85rem' }}>10 mnt lalu</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pb: 1.5, borderBottom: '1px solid #f1f5f9' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 36, height: 36, bgcolor: '#e8f5e9', color: '#4caf50' }}>
                  <CheckCircleIcon sx={{ fontSize: '1.3rem' }} />
                </Avatar>
                <Typography variant="body1" sx={{ color: '#334155', fontSize: '0.95rem' }}>
                  <b>Besi 8mm</b> — Terjual 20 Batang
                </Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500, fontSize: '0.85rem' }}>09:00 WIB</Typography>
            </Stack>

            <Box sx={{ 
              p: 2, 
              bgcolor: '#fff5f5', 
              borderRadius: '12px', 
              borderLeft: '4px solid #ef4444',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mt: 1
            }}>
              <WarningAmberRoundedIcon color="error" sx={{ fontSize: '1.4rem' }} />
              <Typography variant="body2" color="error" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                Paku Beton - Stok tinggal sedikit! Silahkan lakukan re-stock di gudang.
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* 2. CATATAN OPERASIONAL (DENGAN 3 TAMBAHAN DATA BARU) */}
        <Box sx={{ 
          p: 3.5, 
          bgcolor: '#1e293b', 
          color: '#fff', 
          borderRadius: '16px', 
          boxShadow: '0px 10px 30px rgba(30, 41, 59, 0.15)',
          width: '100%'
        }}>
          <Typography variant="h4" color="inherit" sx={{ mb: 3, fontWeight: 700, fontSize: '1.25rem' }}>
            Catatan Operasional
          </Typography>
          
          <Stack spacing={2.5}>
            {/* Catatan 1 */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ pb: 1.5, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <AssignmentOutlinedIcon sx={{ color: '#38bdf8', fontSize: '1.3rem' }} />
              <Typography variant="body1" sx={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                Pengiriman <span style={{ color: '#fff', fontWeight: 600 }}>pasir Merapi</span> tiba jam 14:00.
              </Typography>
            </Stack>

            {/* Catatan 2 */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ pb: 1.5, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <AssignmentOutlinedIcon sx={{ color: '#38bdf8', fontSize: '1.3rem' }} />
              <Typography variant="body1" sx={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                Cek kembali nota supplier <span style={{ color: '#fff', fontWeight: 600 }}>Semen Gresik</span>.
              </Typography>
            </Stack>

            {/* Catatan 3 */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ pb: 1.5, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <AssignmentOutlinedIcon sx={{ color: '#38bdf8', fontSize: '1.3rem' }} />
              <Typography variant="body1" sx={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                Servis berkala <span style={{ color: '#fff', fontWeight: 600 }}>armada pick-up</span> hari Sabtu.
              </Typography>
            </Stack>

            {/* Catatan 4 (BARU - Keramik) */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ pb: 1.5, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <AssignmentOutlinedIcon sx={{ color: '#38bdf8', fontSize: '1.3rem' }} />
              <Typography variant="body1" sx={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                Pengecekan stok <span style={{ color: '#fff', fontWeight: 600 }}>keramik warna putih</span> tersedia sebanyak 20 dus.
              </Typography>
            </Stack>

            {/* Catatan 5 (BARU - Sika Tepung) */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ pb: 1.5, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <AssignmentOutlinedIcon sx={{ color: '#38bdf8', fontSize: '1.3rem' }} />
              <Typography variant="body1" sx={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                Selesaikan administrasi order <span style={{ color: '#fff', fontWeight: 600 }}>sika tepung warna putih</span>.
              </Typography>
            </Stack>

            {/* Catatan 6 (BARU - Pasir Pasang) */}
            <Stack direction="row" spacing={2} alignItems="center">
              <AssignmentOutlinedIcon sx={{ color: '#38bdf8', fontSize: '1.3rem' }} />
              <Typography variant="body1" sx={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                Konfirmasi bongkar muatan <span style={{ color: '#fff', fontWeight: 600 }}>pasir pasang 1 mobil</span> di area proyek belakang.
              </Typography>
            </Stack>
          </Stack>
        </Box>

      </Stack>
    </Box>
  );
}