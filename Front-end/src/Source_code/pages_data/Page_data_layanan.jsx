import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { NavLink, Link } from "react-router-dom";
import "../CSS/Pages_Data/Data_layanan.css";
import { useState, useEffect } from "react";
import axios from "axios";
import UpdateLayanan from "../component/UpdateData/UpdateLayanan";
import { HapusLayanan } from "../component/PopUp/hapus";

export default function DataLayanan() {
  const [search, setSearch] = useState("");
  const [ShowUp, setShowUp] = useState(false);
  const [DataLayanan, setDataLayanan] = useState([]);
  const [ShowHapus, setShowHapus] = useState(false);
  return (
    <div>
      {ShowHapus && <HapusLayanan DataLayanan={DataLayanan} setShowHapus={setShowHapus} setDataLayanan={setDataLayanan}/>}
      {ShowUp && <UpdateLayanan DataLayanan={DataLayanan} setShowUp={setShowUp} setDataLayanan={setDataLayanan}/>}
      <Sidebar />
      <Navbar />
      <div
        className={`contain ${ShowUp ? "blur" : ""}`}
        style={ShowUp ? { overflow: "hidden" } : {}}
      >
        <div
          className={`contain ${ShowHapus ? "blur" : ""}`}
          style={ShowHapus ? { overflow: "hidden" } : {}}
        >
          <div className="bungkus">
            <div className="cont_data-page-layanan">
              <div className="menu_page_layanan">
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
                      <Link
                        to={"/Data/data_layanan"}
                        id="layanan"
                        className="active2"
                      >
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
              <div className="btn_tambah_barang">
                <div className="btn_tambah">
                  <Link to={"/Data/data_layanan/input_data_layanan"}>
                    <span>+ Tambah Layanan</span>
                  </Link>
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
                  <input
                    type="search"
                    placeholder="Masukan nama layanan.."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="tbl_data_page-layanan">
                <TampilanLayanan
                  search={search}
                  setShowUp={setShowUp}
                  setDataLayanan={setDataLayanan}
                  setShowHapus={setShowHapus}
                  DataLayanan={DataLayanan}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TampilanLayanan({
  search,
  setDataLayanan,
  setShowHapus,
  setShowUp,
  DataLayanan,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const tes = window.localStorage.getItem("Authorization")
    axios
      .post(`${import.meta.env.VITE_API_URL}/Data/data_layanan`, {tes})
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handle = async (item) => {
    let findData = await DataLayanan.find((i) => {
      return i.Id_Layanan === item.Id_Layanan;
    });
    if (findData) {
      setDataLayanan([]);
    } else {
      let addProduct = {
        ...item,
      };
      setDataLayanan([...DataLayanan, addProduct]);
      setShowUp(true);
    }
  };

  const hapus = async (item) => {
    let findData = await DataLayanan.find((i) => {
      return i.Id_Layanan === item.Id_Layanan;
    });
    if (findData) {
      setDataLayanan([]);
    } else {
      let addProduct = {
        ...item,
      };
      setDataLayanan([...DataLayanan, addProduct]);
      setShowHapus(true);
    }
  };

  function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka);
  }

  return (
    <>
      {data
        .filter((item) => item.Nama_Layanan.toLowerCase().includes(search))
        .map((item) => (
          <ul className="produk-terdaftar-page-layanan">
            <li className="li-produk-page-layanan" key={item.Id_Layanan}>
              <div className="div_terdaftar-page-layanan">
                <div className="gambar_terdaftar-page-layanan">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/public/${
                      item.Poto_Layanan
                    }`}
                    alt=""
                  />
                </div>
                <div className="keterangan_terdaftar-page-layanan">
                  <div className="div-top-page-layanan">
                    <div className="nama_terdaftar-page-layanan">
                      <div className="produk-pl">
                        <span>{item.Nama_Layanan}</span>
                      </div>
                      <div>
                        <span className="harga_terdaftar-pl">
                          {formatRupiah(item.Harga_Layanan)}
                        </span>
                      </div>
                    </div>
                    <div className="btn_terdaftar-pl">
                      <div className="btn-edit-pl">
                        <button onClick={() => handle(item)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5vw"
                            height="3vh"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="btn-hapus-pl">
                        <button onClick={() => hapus(item)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5vw"
                            height="3vh"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="div-bottom-pl">
                    <div className="stok-pl">
                      <span>Stok :</span>
                    </div>
                    <div className="kurangtambah-pl">
                      <span>{item.Stok_Layanan}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        ))}
    </>
  );
}
