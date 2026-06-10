import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

const dashboard = {
  id: 'dashboard',
  title: 'TOKO BANGUNAN',
  type: 'group',

  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: DashboardOutlinedIcon
    },

    {
      id: 'inv',
      title: 'Stok Barang',
      type: 'item',
      url: '/admin/inventaris',
      icon: Inventory2OutlinedIcon
    },

    {
      id: 'trx',
      title: 'Catat Transaksi',
      type: 'item',
      url: '/admin/transaksi',
      icon: ReceiptLongOutlinedIcon
    }
  ]
};

export default dashboard;