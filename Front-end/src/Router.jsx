import Log_in from './Source_code/Login'
import Beranda from './Source_code/Beranda'
import DataBarang from './Source_code/pages_data/Page_data_barang'
import DataLayanan from './Source_code/pages_data/Page_data_layanan'
import DataPelanggan from './Source_code/pages_data/Page_data_pelanggan'
import Data from './Source_code/Data'
import Input_Barang from './Source_code/pages_data/input_data/Input_data-barang'
import Input_Layanan from './Source_code/pages_data/input_data/input_data-layanan'
import Input_Pelanggan from './Source_code/pages_data/input_data/input_data-pelanggan'
import Transaksi from './Source_code/Transaksi'
import TransaksiBarang from './Source_code/Pages_transaksi/TransaksiPemasukan/TransaksiBarang'
import TransaksiLayanan from './Source_code/Pages_transaksi/TransaksiPemasukan/TransaksiLayanan'
import Transaksi_pengeluaran from './Source_code/Pages_transaksi/Transaksi_pengeluaran' 
import { createBrowserRouter } from 'react-router-dom'
import Rekap from './Source_code/Rekap'
import Rekap_pemasukan from './Source_code/pages_rekap/Rekap_pemasukan'
import Rekap_pengeluaran from './Source_code/pages_rekap/Rekap_Pengeluaran'
// import PrintPemasukan from "./Source_code/component/print/tampilan_rekap/print_pemasukan"
// import PrintPengeluaran from "./Source_code/component/print/tampilan_rekap/print_pengeluaran"
// import PagePrintPemasukan from "./Source_code/component/print/page_print-pemasukan"
// import PagePrintPengeluaran from "./Source_code/component/print/page_print-pengeluaran"
// import PrintBulanan from "./Source_code/component/print/tampilan_rekap/print_bulanan"
// import PagePrintBulanan from "./Source_code/component/print/page_print-bulanan"
// import PagePrintBulanan_p from "./Source_code/component/print/page_print-bulanan_p"
// import InputTransaksi_pemasukan from './Source_code/Pages_transaksi/InputTransksi/input_transaksi'

export const route = createBrowserRouter([
    {
      path: "/",
      element: <Log_in/>,
    },
  
    {
      path: "/Beranda",
      element: <Beranda/>,
    },  
  
    {
      path: "/Data",
      element: <Data/>,
    },
  
    {
      path: "/Data/data_barang",
      element: <DataBarang />,
    },
  
    {
      path: "/Data/data_layanan",
      element: <DataLayanan />,
    },
  
    {
      path: "/Data/data_pelanggan",
      element: <DataPelanggan />,
    },
  
    {
      path: "/Data/data_barang/Input_data_barang",
      element: <Input_Barang />,
    },
  
    {
      path: "/Data/data_layanan/Input_data_layanan",
      element: <Input_Layanan/>,
    },
  
    {
      path: "/Data/data_pelanggan/Input_data_pelanggan",
      element: <Input_Pelanggan/>,
    },
  
    {
      path: "/Transaksi",
      element: <Transaksi/>,
    },

  
    {
      path: "/Transaksi/barang",
      element: <TransaksiBarang/>,
    },

    {
      path: "/Transaksi/layanan",
      element: <TransaksiLayanan/>,
    },
  
    {
      path: "/Transaksi/pengeluaran",
      element: <Transaksi_pengeluaran/>,
    },

    {
      path: "/Rekap",
      element: <Rekap/>,
    },

    {
      path: "/Rekap/Rekap_pemasukan",
      element: <Rekap_pemasukan/>,
    },

    {
      path: "/Rekap/Rekap_pengeluaran",
      element: <Rekap_pengeluaran/>,
    },

    // {
    //   path: "/Rekap/Rekap_pengeluaran/print_pemasukan",
    //   element: <PrintPemasukan/>,
    // },

    // {
    //   path: "/Rekap/Rekap_pengeluaran/print_pengeluaran",
    //   element: <PrintPengeluaran/>,
    // },

    // {
    //   path: "/Rekap/Rekap_pengeluaran/Page_Print_Pemasukan",
    //   element: <PagePrintPemasukan/>,
    // },

    // {
    //   path: "/Rekap/Rekap_pengeluaran/Page_Print_Pengeluaran",
    //   element: <PagePrintPengeluaran/>,
    // },

    // {
    //   path: "/Rekap/Rekap_pengeluaran/print_bulanan",
    //   element: <PrintBulanan/>,
    // },

    // {
    //   path: "/Rekap/Rekap_pengeluaran/Page_Print_Bulanan",
    //   element: <PagePrintBulanan/>,
    // },

    // {
    //   path: "/Rekap/Rekap_pengeluaran/Page_Print_Bulanan_p",
    //   element: <PagePrintBulanan_p/>,
    // },
  
  ]);