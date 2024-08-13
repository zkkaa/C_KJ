import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import "../Source_code/CSS/transaksi.css";
import { Link } from "react-router-dom";

export default function Transaksi() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="bungkus">
        <div className="cont_transaksi_utama">
          <div className="transaksi_menu_utama">
            <div className="div_pemasukan_t">
              <ul>
                <li>
                  <Link to={"/transaksi/barang"} className="pemasukan_t">
                    <span>Pemasukan</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="div_pengeluaran_t">
              <ul>
                <li>
                  <Link to={"/transaksi/pengeluaran"} className="pengeluaran_t">
                    <span>Pengeluaran</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="tbl_data_barang"></div>
        </div>
      </div>
    </div>
  );
}
