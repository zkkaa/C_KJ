import Sidebar from "../../component/Sidebar";
import Navbar from "../../component/Navbar";
import "../../CSS/input_data/input_pelanggan.css";
import { useState } from "react";
import axios from "axios";
import { DataTersimpan } from "../../component/PopUp/data-tersimpan";
import { DataTelahTerdaftar } from "../../component/PopUp/data-telah-terdaftar";
import { Link } from "react-router-dom";

export default function Input_Pelanggan() {
  const [StatusPelanggan, setStatusPelanggan] = useState("");
  function Handle_inputPelanggan(event) {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/Data/data_pelanggan/Input_data_pelanggan`, {
        NamaPelanggan,
        NomerTeleponPelanggan,
        AlamatPelanggan,
        user
      })
      .then((res) => {
        if (res.data.status == "Input Data Pelanggan Berhasil") {
          setStatusPelanggan("Berhasil");
        } else if (res.data.status == "Data Pelanggan Sudah Ada") {
          setStatusPelanggan("Gagal");
        }
        console.log(res);
      });
  }

  const user = window.localStorage.getItem("Authorization");
  const [NamaPelanggan, setNamaPelanggan] = useState("");
  const [NomerTeleponPelanggan, setNomerTeleponPelanggan] = useState("");
  const [AlamatPelanggan, setAlamatPelanggan] = useState("");
  return (
    <>
      {StatusPelanggan === "Berhasil" && <DataTersimpan />}
      {StatusPelanggan === "Gagal" && <DataTelahTerdaftar />}
      <div
        className={`container_1 ${StatusPelanggan ? "blur" : ""}`}
        style={StatusPelanggan ? { overflow: "hidden" } : {}}
      >
        <Sidebar />
        <Navbar />
        <form onSubmit={Handle_inputPelanggan}>
          <div className="bungkus">
          <div className="contain-inputpelanggan">
            <div className="tbl_data_pelanggan">
              <div className="tambah_data_pelanggan">
                <div className="div_ttp">
                  <span className="ttp">Tabel Tambah Pelanggan</span>
                </div>
                <div className="kolom_input_p">
                  <div className="div_kp">
                    <span className="span_input_p">Nama</span>
                    <div>
                      <input
                        type="text"
                        className="input_Bnama_p"
                        onChange={(e) => setNamaPelanggan(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="div_np">
                    <span className="span_input_p">Nomer Telepon</span>
                    <div>
                      <input
                        type="text"
                        className="input_Bnomer_p"
                        onChange={(e) =>
                          setNomerTeleponPelanggan(e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="kolom_alamat">
                  <div>
                    <span className="span_input_p">Alamat</span>
                  </div>
                  <div className="input_alamat">
                    <textarea
                      name=""
                      id=""
                      rows="4"
                      onChange={(e) => setAlamatPelanggan(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="btn_simpanhapus_p">
                  <div className="btn_hapus-pelanggan">
                    <Link to={"/Data/data_pelanggan"}>
                      <button className="hapus-pelanggan">Batal</button>
                    </Link>
                  </div>
                  <div className="btn_simpan-pelanggan">
                    <button className="simpan-pelanggan">Simpan</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </form>
      </div>
    </>
  );
}





