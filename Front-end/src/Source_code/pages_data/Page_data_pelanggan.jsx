import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { NavLink, Link } from "react-router-dom";
import "../CSS/Pages_Data/Data_pelanggan.css";
import { useState, useEffect } from "react";
import axios from "axios";
import UpdatePelanggan from "../component/UpdateData/UpdatePelanggan";
import { HapusDataPelanggan } from "../component/PopUp/hapus";

export default function DataPelanggan() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [DataPelanggan, setDataPelanggan] = useState([]);
  const [ShowUp, setShowUp] = useState(false);
  const [hapus, sethapus] = useState(false);

  const hapusData = async (item) => {
    let findData = await DataPelanggan.find((i) => {
      return i.Id_Pelanggan === item.Id_Pelanggan;
    });
    if (findData) {
      setDataPelanggan([]);
    } else {
      let addProduct = {
        ...item,
      };
      setDataPelanggan([...DataPelanggan, addProduct]);
      sethapus(true);
    }
  };

  useEffect(() => {
    const tes = window.localStorage.getItem("Authorization")
    axios
      .post(`${import.meta.env.VITE_API_URL}/Data/data_pelanggan`, {tes})
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handle = async (item) => {
    let findData = await DataPelanggan.find((i) => {
      return i.Id_Pelanggan === item.Id_Pelanggan;
    });
    if (findData) {
      setDataPelanggan([]);
    } else {
      let addProduct = {
        ...item,
      };
      setDataPelanggan([...DataPelanggan, addProduct]);
      setShowUp(true);
    }
  };

  return (
    <div>
      {hapus && <HapusDataPelanggan DataPelanggan={DataPelanggan} sethapus={sethapus} setDataPelanggan={setDataPelanggan}/>}
      {ShowUp && <UpdatePelanggan DataPelanggan={DataPelanggan} setShowUp={setShowUp} setDataPelanggan={setDataPelanggan}/>}
      <Sidebar />
      <Navbar />
      <div
        className={`contain ${ShowUp ? "blur" : ""}`}
        style={ShowUp ? { overflow: "hidden" } : {}}
      >
        <div
          className={`contain ${hapus ? "blur" : ""}`}
          style={hapus ? { overflow: "hidden" } : {}}
        >
          <div className="bungkus">
            <div className="cont_data-page-pelanggan">
              <div className="menu">
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
                      <Link to={"/Data/data_pelanggan"} className="active3">
                        <span>Pelanggan</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="btn_tambah_barang">
                <div className="btn_tambah">
                  <Link to={"/Data/data_pelanggan/input_data_pelanggan"}>
                    <span>+ Tambah Pelanggan</span>
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
                    placeholder="Masukan nama pelanggan.."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="tbl_data_page-pelanggan">
                <div className="data_page-pelanggan">
                  <div className="list-page-pelanggan">
                    <table className="css-serial-page-pelanggan">
                      <tr className="tabel_judul-page-pelaggan">
                        <th className="no_pelanggan">No.</th>
                        <th className="nama_pelanggan">Nama</th>
                        <th className="nomer_pelanggan">Nomer Telepon</th>
                        <th className="alamat_pelanggan">Alamat</th>
                        <th className="aksi-pelanggan">Aksi</th>
                      </tr>
                      {data
                        .filter((item) =>
                          item.Nama_Pelanggan.toLowerCase().includes(search)
                        )
                        .map((e) => (
                          <tr key={e.Id_pelanggan}>
                            <td></td>
                            <td>{e.Nama_Pelanggan}</td>
                            <td>{e.Nomer_Telepon}</td>
                            <td>{e.Alamat_Pelanggan}</td>
                            <td className="aksi-edit-hapus">
                              <button
                                className="btn-edit-pelanggan"
                                onClick={() => handle(e)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
                                  />
                                </svg>
                              </button>
                              <button
                                className="btn-hapus-pelanggan"
                                onClick={() => hapusData(e)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
