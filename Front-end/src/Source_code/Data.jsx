import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import "./CSS/Data.css";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function Data() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="bungkus">
        <div className="cont_data_pertama">
          <div className="menu_pertama">
            <div className="menu_barang">
              <ul>
                <li>
                  <Link to={"/Data/data_barang"} id="barang">
                    <span>Barang</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="menu_layanan">
              <ul>
                <li>
                  <Link to={"/Data/data_layanan"} id="layanan">
                    <span>Layanan</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="menu_pelanggan">
              <ul>
                <li>
                  <Link to={"/Data/data_pelanggan"}>
                    <span>Pelanggan</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="inp_cari">
            <div className="inp">
              <button>
                <i className="ph-magnifying-glass">
                  {" "}
                  <MagnifyingGlass />{" "}
                </i>
              </button>
              <input type="search" />
            </div>
          </div>
          <div className="tbl_data_barang">
            <div className="data_barang"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
