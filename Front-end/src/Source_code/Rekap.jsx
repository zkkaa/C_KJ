import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import "./CSS/Rekap.css";
import { Link } from "react-router-dom";

export default function Rekap() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="bungkus">
        <div class="cont_rekap_pelanggan_pertama">
          <div class="menu_rekap_pelanggan_pertama">
            <div class="rekap_pemasukan_div">
              <ul>
                <li>
                  <Link to={"/Rekap/Rekap_pemasukan"} class="pemasukan_t">
                    <span>Pemasukan</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div class="rekap_pengeluaran_div">
              <ul>
                <li>
                  <Link to={"/Rekap/Rekap_pengeluaran"} class="pengeluaran_t">
                    <span>Pengeluaran</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="tbl_data_rekap"></div>
        </div>
      </div>
    </>
  );
}
