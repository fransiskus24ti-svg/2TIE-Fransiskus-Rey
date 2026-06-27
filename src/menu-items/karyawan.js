import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

const karyawan = {

  id: 'grup-karyawan',
  title: 'MENGGUNAKAN KARYAWAN', // sesuai gambar
  type: 'group',
  children: [
    {
      id: 'karyawan-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/karyawan/dashboard',
      icon: DashboardOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'karyawan-kasir',
      title: 'Kasir / Penjualan',
      type: 'item',
      url: '/karyawan/kasir',
      icon: ReceiptLongOutlinedIcon
    },
    {
      id: 'karyawan-pengiriman',
      title: 'Pengiriman',
      type: 'item',
      url: '/karyawan/pengiriman',
      icon: LocalShippingOutlinedIcon
    },
    {
      id: 'karyawan-manajemen-stock',
      title: 'Manajemen Stok',
      type: 'item',
      url: '/karyawan/manajemen',
      icon: Inventory2OutlinedIcon
    },
    {
      id: 'karyawan-laporan-laba-rugi',
      title: 'Laporan Laba-Rugi', // sesuai gambar
      type: 'item',
      url: '/karyawan/laporan-laba-rugi',
      icon: AssessmentOutlinedIcon
    },
    {
      id: 'karyawan-laporan-barang',
      title: 'Laporan Barang', // diganti dari Laporan Stok
      type: 'item',
      url: '/karyawan/laporan-barang',
      icon: AssessmentOutlinedIcon
    },
    {
      id: 'karyawan-retur-barang',
      title: 'Retur Barang',
      type: 'item',
      url: '/karyawan/retur-barang',
      icon: SwapHorizOutlinedIcon
    },
    {
      id: 'karyawan-monajemen-piutang',
      title: 'Monajemen Piutang (Bon)', // sesuai gambar
      type: 'item',
      url: '/karyawan/monajemen-piutang',
      icon: NoteAltOutlinedIcon
    }
  ]
};

export default karyawan;