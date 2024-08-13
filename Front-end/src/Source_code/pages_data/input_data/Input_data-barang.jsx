import Sidebar from "../../component/Sidebar";
import Navbar from "../../component/Navbar";
import "../../CSS/input_data/input_barang.css";
import { useState } from "react";
import axios from "axios";
import { DataTersimpan } from "../../component/PopUp/data-tersimpan";
import { DataTelahTerdaftar } from "../../component/PopUp/data-telah-terdaftar";
import { Link } from "react-router-dom";
import Camera from "../../../asset/camera-thin.png";
import CurrencyInput from "react-currency-input-field"

export default function Input_Barang() {
  const [StatusBarang, setStatusBarang] = useState("");
  function Handle_inputBarang(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", GambarBarang[0]);
    formData.append("KodeBarang", KodeBarang);
    formData.append("NamaBarang", NamaBarang);
    formData.append("HargaBarang", HargaBarang);
    formData.append("StokBarang", StokBarang);
    formData.append("Satuan", Satuan);
    formData.append("IdUser", window.localStorage.getItem("Authorization"));
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/Data/data_barang/Input_data_barang`,
        formData
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == "Input Data Barang Berhasil") {
          setStatusBarang("Berhasil");
        } else if (res.data.status == "Data Barang Sudah Ada") {
          setStatusBarang("Gagal");
        }
        console.log(formData);
      });
  }

  function handleFile(e) {
    setGambar(e.target.files);
  }

  function handleKode(e) {
    setKode(e.target.value);
  }

  function handleNama(e) {
    setNamaBarang(e.target.value);
  }

  function handleStok(e) {
    setStokBarang(e.target.value);
  }

  const [KodeBarang, setKode] = useState("");
  const [NamaBarang, setNamaBarang] = useState("");
  const [HargaBarang, setHargaBarang] = useState(0);
  const [StokBarang, setStokBarang] = useState("");
  const [GambarBarang, setGambar] = useState("");
  const [Satuan, setSatuan] = useState("");

  function handleSatuan(e) {
    setSatuan(e.target.value);
  }
  function handleHarga(e) {
    const halo = e.target.value;
    const Ed = halo.slice(4).split('.').join('');
    setHargaBarang(Ed);
  }

  return (
    <>
      {StatusBarang === "Berhasil" && <DataTersimpan />}
      {StatusBarang === "Gagal" && <DataTelahTerdaftar />}
      <div
        className={`container_1 ${StatusBarang ? "blur" : ""}`}
        style={StatusBarang ? { overflow: "hidden" } : {}}
      >
        <Sidebar />
        <Navbar />
        <form onSubmit={Handle_inputBarang} encType="multipart/form-data">
          <div className="bungkus">
            <div className="contain-inputbarang">
              <div className="tbl_data-barang">
                <div className="tambah_data-barang">
                  <div className="div_ttb">
                    <span className="ttb">Tabel Tambah Barang</span>
                  </div>
                  <div className="gambar_keterangan">
                    <div className="kolom_input_b1">
                      <div className="div_kb">
                        <span className="span_input_b">Kode Barang</span>
                        <div>
                          <input
                            type="text"
                            className="input_Bkode"
                            onChange={handleKode}
                            required
                          />
                        </div>
                      </div>
                      <div className="div_nb">
                        <span className="span_input_b">Nama Barang</span>
                        <div>
                          <input
                            type="text"
                            className="input_Bnama"
                            onChange={handleNama}
                            required
                          />
                        </div>
                      </div>
                      <div className="div_kb">
                        <span className="span_input_b">Satuan Barang</span>
                        <div>
                          <input type="text" className="input_Bkode" onChange={handleSatuan}
                            required/>
                        </div>
                      </div>
                      <div className="div_nb">
                        <span className="span_input_b">Stok Barang</span>
                        <div>
                          <input
                            type="number"
                            className="input_Bstok"
                            onChange={handleStok}
                            required
                          />
                        </div>
                      </div>
                      <div className="div_kb">
                        <span className="span_input_b">Harga Barang</span>
                        <div>
                          <CurrencyInput
                            id="input-example"
                            className="input_Bharga"
                            prefix="Rp. "
                            name="input-name"
                            defaultValue={0}
                            decimalsLimit={2}
                            onChange={handleHarga}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="kolom_gambar">
                      <div>
                        <span className="span_input_b">Gambar Barang</span>
                      </div>
                      <div className="input_gambar">
                        <input
                          type="file"
                          accept="image/jpg"
                          onChange={handleFile}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="btn_simpanhapus">
                    <div className="btn_hapus-barang_i">
                      <Link to={"/Data/data_barang"}>
                        <button className="hapus-barang_i">Batal</button>
                      </Link>
                    </div>
                    <div className="btn_simpan-barang">
                      <button className="simpan-barang">Simpan</button>
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
