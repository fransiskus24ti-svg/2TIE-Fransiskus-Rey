import { Box, Typography, Avatar, Stack, Badge, Divider, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DRAWER_WIDTH } from 'config';
import menuKaryawan from 'menu-items/karyawan';
import NavGroup from 'layouts/MainLayout/Drawer/DrawerContent/Navigation/NavGroup';

// Import semua ikon MUI yang diperlukan
import * as Icons from '@mui/icons-material';

// ==============================|| STYLED COMPONENTS ||============================== //

const SidebarWrapper = styled(Box)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  height: '100vh',
  overflowY: 'auto',
  background: `linear-gradient(180deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.common.white,
  borderRight: 'none',
  boxShadow: '4px 0 20px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: alpha(theme.palette.common.white, 0.3),
    borderRadius: '10px',
  },
  // Override NavGroup styles
  '& .MuiListItem-root': {
    color: alpha(theme.palette.common.white, 0.8),
    borderRadius: '8px',
    marginBottom: '2px',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.12),
      color: '#ffffff',
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.common.white, 0.18),
      color: '#ffffff',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '20%',
        height: '60%',
        width: '3px',
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '0 4px 4px 0',
      },
    },
  },
  '& .MuiListItemIcon-root': {
    color: alpha(theme.palette.common.white, 0.6),
    minWidth: 36,
  },
  '& .Mui-selected .MuiListItemIcon-root': {
    color: '#ffffff',
  },
  '& .MuiTypography-root': {
    fontWeight: 500,
    fontSize: '0.9rem',
  },
  // Group header (caption)
  '& .MuiListSubheader-root': {
    color: alpha(theme.palette.common.white, 0.5),
    fontWeight: 700,
    fontSize: '0.7rem',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    padding: '8px 16px',
  },
  // Badge styling
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    fontSize: '0.6rem',
    fontWeight: 700,
    minWidth: 18,
    height: 18,
  },
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  padding: '24px 20px 16px',
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  backgroundColor: alpha(theme.palette.common.white, 0.2),
  color: '#fff',
  fontWeight: 700,
  fontSize: '1.2rem',
  border: `2px solid ${alpha(theme.palette.common.white, 0.3)}`,
}));

const ProfileInfo = styled(Box)({
  flex: 1,
  overflow: 'hidden',
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#0b0b0b',
    boxShadow: '0 0 0 2px #0d47a1',
    width: 12,
    height: 12,
    borderRadius: '50%',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 0.8,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const FooterVersion = styled(Typography)(({ theme }) => ({
  marginTop: 'auto',
  padding: '16px 20px',
  borderTop: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
  color: alpha(theme.palette.common.white, 0.4),
  fontSize: '0.7rem',
  textAlign: 'center',
  letterSpacing: '0.3px',
}));

// ==============================|| HELPER: TAMBAH IKON KE MENU ||============================== //

// Mapping ikon berdasarkan label (sesuaikan dengan menu karyawan Anda)
const iconMap = {
  Dashboard: <Icons.Dashboard />,
  Inventaris: <Icons.Inventory />,
  'Data Karyawan': <Icons.People />,
  Transaksi: <Icons.Receipt />,
  Laporan: <Icons.BarChart />,
  Pengaturan: <Icons.Settings />,
  Bantuan: <Icons.Help />,
  Logout: <Icons.Logout />,
  'Kelola Barang': <Icons.Category />,
  'Kategori': <Icons.Label />,
  'Stok': <Icons.Warehouse />,
  'Supplier': <Icons.Business />,
  'Pelanggan': <Icons.Person />,
  'Pesanan': <Icons.ShoppingCart />,
  'Retur': <Icons.AssignmentReturn />,
  'Keuangan': <Icons.Money />,
  'Profil': <Icons.PersonOutline />,
  // tambahkan sesuai kebutuhan
};

// Fungsi rekursif untuk menambahkan icon ke setiap item
const addIconsToMenu = (item) => {
  if (!item) return item;

  // Clone item agar tidak mengubah original
  const newItem = { ...item };

  // Jika item memiliki children (submenu), proses rekursif
  if (newItem.children && Array.isArray(newItem.children)) {
    newItem.children = newItem.children.map((child) => addIconsToMenu(child));
  }

  // Jika item memiliki items (beberapa struktur menggunakan 'items')
  if (newItem.items && Array.isArray(newItem.items)) {
    newItem.items = newItem.items.map((child) => addIconsToMenu(child));
  }

  // Tambahkan icon jika belum ada dan ada di mapping
  if (!newItem.icon && newItem.title) {
    const matchedIcon = iconMap[newItem.title];
    if (matchedIcon) {
      newItem.icon = matchedIcon;
    } else {
      // Icon default (bullet)
      newItem.icon = <Icons.Circle sx={{ fontSize: 8 }} />;
    }
  }

  return newItem;
};

// ==============================|| SIDEBAR KARYAWAN ||============================== //

export default function SidebarKaryawan() {
  // Data karyawan (bisa dari context/auth)
  const user = {
    name: 'Ahmad Karyawan',
    role: 'Staff Gudang',
    avatar: 'AK',
    online: true,
  };

  // Tambahkan icon ke menuKaryawan
  const menuWithIcons = addIconsToMenu(menuKaryawan);

  return (
    <SidebarWrapper>
      {/* ===== HEADER PROFIL ===== */}
      <ProfileHeader>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          invisible={!user.online}
        >
          <ProfileAvatar>{user.avatar}</ProfileAvatar>
        </StyledBadge>
        <ProfileInfo>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
            {user.name}
          </Typography>
          <Typography variant="caption" sx={{ color: alpha('#fff', 0.6), fontWeight: 500 }}>
            {user.role}
          </Typography>
        </ProfileInfo>
      </ProfileHeader>

      {/* ===== MENU UTAMA (dengan ikon) ===== */}
      <Box sx={{ px: 1.5, py: 2, flex: 1 }}>
        <NavGroup item={menuWithIcons} />
      </Box>

      {/* ===== FOOTER ===== */}
      <FooterVersion variant="caption">v2.1.0 • Karyawan Panel</FooterVersion>
    </SidebarWrapper>
  );
}