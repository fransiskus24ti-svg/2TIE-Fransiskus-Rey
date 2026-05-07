// assets (Tambahkan icon jika perlu)
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'; // Icon tambahan

const dashboard = {
  id: 'dashboard',
  title: 'Toko Bangunan',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: HomeOutlinedIcon
    },
    {
      id: 'inv',
      title: 'Stok Barang',
      type: 'item',
      url: '/admin/inventaris',
      icon: NavigationOutlinedIcon // Gunakan icon yang sudah di-import
    },
    {
      id: 'trx',
      title: 'Catat Transaksi',
      type: 'item',
      url: '/admin/transaksi',
      icon: PersonOutlinedIcon // Gunakan icon yang sudah di-import
    }
  ]
};
export default dashboard;