import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';

const dashboard = {
  id: 'grup-toko-bangunan',
  title: 'NAVIGASI UTAMA',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: DashboardOutlinedIcon,
      breadcrumbs: false
    },

    {
      id: 'sub-master',
      title: 'MASTER DATA',
      type: 'collapse',
      icon: Inventory2OutlinedIcon,
      children: [
        {
          id: 'inv',
          title: 'Stok Barang',
          type: 'item',
          url: '/admin/inventaris'
        },
        {
          id: 'pelanggan',
          title: 'Data Pelanggan / Supplier',
          type: 'item',
          url: '/admin/pelanggan'
        },
        {
          id: 'retur',
          title: 'Retur Barang',
          type: 'item',
          url: '/admin/retur-barang'
        }
      ]
    },

    {
      id: 'sub-transaksi',
      title: 'TRANSAKSI',
      type: 'collapse',
      icon: ReceiptLongOutlinedIcon,
      children: [
        {
          id: 'trx',
          title: 'Catat Transaksi',
          type: 'item',
          url: '/admin/transaksi'
        },
        {
          id: 'riwayat-transaksi',
          title: 'Riwayat Transaksi',
          type: 'item',
          url: '/admin/riwayat-transaksi'
        }
      ]
    },

    {
      id: 'sub-laporan',
      title: 'LAPORAN',
      type: 'collapse',
      icon: AssessmentOutlinedIcon,
      children: [
        {
          id: 'laporan-keuangan',
          title: 'Laporan Keuntungan / Grafik',
          type: 'item',
          url: '/admin/laporan-keuangan'
        }
      ]
    },

    {
      id: 'sub-pengaturan',
      title: 'PENGATURAN',
      type: 'collapse',
      icon: ManageAccountsOutlinedIcon,
      children: [
        {
          id: 'user-management',
          title: 'Manajemen User',
          type: 'item',
          url: '/admin/manajemen-user'
        }
      ]
    }
  ]
};

export default dashboard;