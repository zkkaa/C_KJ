import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import "../CSS/Pages_Data/Data_barang.css";
import axios from "axios";
import { useState, useEffect } from "react";
import UpdateBarang from "../component/UpdateData/UpdateBarang";
import { HapusProduk } from "../component/PopUp/hapus";

export default function DataBarang() {
  const [search, setSearch] = useState("");
  const [ShowUp, setShowUp] = useState(false);
  const [DataBarang, setDataBarang] = useState([]);
  const [ShowHapus, setShowHapus] = useState(false);

  return (
    <div>
      {ShowHapus && <HapusProduk DataBarang={DataBarang} setDataBarang={setDataBarang} setShowHapus={setShowHapus} />}
      {ShowUp && <UpdateBarang DataBarang={DataBarang} setShowUp={setShowUp} setDataBarang={setDataBarang}/>}
      <Sidebar />
      <Navbar />
      <div
        className={`contain ${ShowHapus ? "blur" : ""} && `}
        style={ShowHapus ? { overflow: "hidden" } : {}}
      >
        <div
          className={`contain ${ShowUp ? "blur" : ""}`}
          style={ShowUp ? { overflow: "hidden" } : {}}
        >
          <div className="bungkus">
            <div className="cont_data-page-barang">
              <div className="menu">
                <div className="menu_barang">
                  <ul>
                    <li>
                      <Link
                        to={"/Data/data_barang"}
                        id="barang"
                        className="active1"
                      >
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
              <div className="btn_tambah_barang">
                <div className="btn_tambah">
                  <Link to={"/Data/data_barang/input_data_barang"}>
                    <span>+ Tambah Barang</span>
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
                    placeholder="Masukan nama barang.."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="div_box_barang-pb">
                <Tampilan_Data
                  search={search}
                  setShowUp={setShowUp}
                  setDataBarang={setDataBarang}
                  setShowHapus={setShowHapus}
                  DataBarang={DataBarang}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Tampilan_Data({
  search,
  setShowUp,
  setDataBarang,
  DataBarang,
  setShowHapus,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const tes = window.localStorage.getItem("Authorization")
    axios
      .post(`${import.meta.env.VITE_API_URL}/Data/data_barang`, {tes})
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handle = async (item) => {
    let findData = await DataBarang.find((i) => {
      return i.Id_Barang === item.Id_Barang;
    });
    if (findData) {
      setDataBarang([]);
    } else {
      let addProduct = {
        ...item,
      };
      setDataBarang([...DataBarang, addProduct]);
      setShowUp(true);
    }
  };

  const hapus = async (item) => {
    let findData = await DataBarang.find((i) => {
      return i.Id_Barang === item.Id_Barang;
    });
    if (findData) {
      setDataBarang([]);
    } else {
      let addProduct = {
        ...item,
      };
      setDataBarang([...DataBarang, addProduct]);
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
        .filter((item) => item.Nama_Barang.toLowerCase().includes(search))
        .map((item) => (
          <ul class="produk-terdaftar-p-barang">
            <li class="li-produk-p-barang" key={item.Id_Barang}>
              <div class="box_barang">
                <div class="gambar_terdaftar-box">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/public/${
                      item.Poto_Barang
                    }`}
                    alt=""
                  />
                </div>
                <div class="keterangan_terdaftar-box-b">
                  <div class="div-top-box-b">
                    <div class="nama_terdaftar-box">
                      <div class="produk-box-b">
                        <span>{item.Nama_Barang}</span>
                      </div>
                      <div>
                        <span class="harga_terdaftar-box-b">
                          {formatRupiah(item.Harga_Barang)}
                        </span>
                      </div>
                    </div>
                    <div class="btn_box-b">
                      <div class="btn-edit-box-b">
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
                      <div class="btn-hapus-box-b">
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
                  <div class="div-bottom-box-b">
                    <div class="stok-box-b">
                      <span>Stok :</span>
                    </div>
                    <div class="kurangtambah-box-b">
                      <span>{item.Stok_Barang}</span>
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
