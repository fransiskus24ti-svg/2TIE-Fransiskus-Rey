// material-ui
import { Grid, Typography, Box, Stack } from '@mui/material';

// project imports
import ReportCard from 'components/cards/ReportCard';
import { GRID_SPACING } from 'config';

// assets (Icons)
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import WarningAmberTwoToneIcon from '@mui/icons-material/WarningAmberTwoTone';

export default function Default() {
  
  const reportTokoData = [
    { title: 'Pendapatan', primary: 'Rp 15.2M', secondary: 'Hari Ini', iconPrimary: StorefrontTwoToneIcon, color: '#2196f3' },
    { title: 'Stok', primary: '1.240 Sak', secondary: 'Material', iconPrimary: InventoryTwoToneIcon, color: '#4caf50' },
    { title: 'Penjualan', primary: '45 Nota', secondary: 'Selesai', iconPrimary: ShoppingCartTwoToneIcon, color: '#ffc107' },
    { title: 'Kritis', primary: '5 Item', secondary: 'Cek Gudang', iconPrimary: WarningAmberTwoToneIcon, color: '#f44336' }
  ];

  return (
    <Grid container spacing={GRID_SPACING}>
      {/* HEADER */}
      <Grid item xs={12}>
        <Typography variant="h3" sx={{ fontWeight: 600, mt: 1 }}>
         
        </Typography>
      </Grid>

      {/* 4 KARTU STATISTIK (SEJAJAR) */}
      {reportTokoData.map((data, index) => (
        <Grid key={index} item lg={3} md={6} sm={6} xs={12}>
          <ReportCard 
            primary={data.primary} 
            secondary={data.title} 
            iconPrimary={data.iconPrimary} 
            color={data.color} 
            footerContent={data.secondary} 
          />
        </Grid>
      ))}

      {/* AKTIVITAS & CATATAN (SAMA TINGGI) */}
      <Grid item xs={12} md={7} lg={8}>
        <Box sx={{ 
          p: 3, 
          bgcolor: '#fff', 
          borderRadius: '12px', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          height: '100%' 
        }}>
          <Typography variant="h4" sx={{ mb: 3 }}>Aktivitas Penjualan Terakhir</Typography>
          <Stack spacing={2.5}>
             <Typography variant="body1">✅ <b>Semen Padang</b> - Terjual 10 Sak <small style={{color: '#999', marginLeft: '8px'}}>(Barusan)</small></Typography>
             <Typography variant="body1">✅ <b>Cat Avian 5kg</b> - Terjual 2 Kaleng <small style={{color: '#999', marginLeft: '8px'}}>(10 mnt lalu)</small></Typography>
             <Typography variant="body1">✅ <b>Besi 8mm</b> - Terjual 20 Batang <small style={{color: '#999', marginLeft: '8px'}}>(09:00 WIB)</small></Typography>
             <Typography variant="body1" color="error" sx={{ fontWeight: 'bold' }}>⚠️ Paku Beton - Stok tinggal sedikit!</Typography>
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <Box sx={{ 
          p: 3, 
          bgcolor: '#3f51b5', 
          color: '#fff', 
          borderRadius: '12px',
          height: '100%',
          boxShadow: '0 2px 10px rgba(63, 81, 181, 0.3)'
        }}>
          <Typography variant="h4" color="inherit" sx={{ mb: 3 }}>Catatan Operasional</Typography>
          <Box component="ul" sx={{ pl: 2, '& li': { mb: 2, fontSize: '0.95rem' } }}>
            <li>Pengiriman pasir Merapi tiba jam 14:00.</li>
            <li>Cek kembali nota supplier Semen Gresik.</li>
            <li>Servis berkala armada pick-up hari Sabtu.</li>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}