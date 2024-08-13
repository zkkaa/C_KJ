import Sidebar from "../../component/Sidebar";
import Navbar from "../../component/Navbar";
import "../../CSS/input_data/input_layanan.css";
import { useState } from "react";
import axios from "axios";
import { DataTersimpan } from "../../component/PopUp/data-tersimpan";
import { DataTelahTerdaftar } from "../../component/PopUp/data-telah-terdaftar";
import { Link } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";

export default function Input_Layanan() {
  const [StatusLayanan, setStatusLayanan] = useState("");
  function Handle_inputLayanan(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", GambarLayanan[0]);
    formData.append("KodeLayanan", KodeLayanan);
    formData.append("NamaLayanan", NamaLayanan);
    formData.append("HargaLayanan", HargaLayanan);
    formData.append("StokLayanan", StokLayanan);
    formData.append("IdUser", window.localStorage.getItem("Authorization"));
    formData.append("Satuan", Satuan);
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/Data/data_layanan/Input_data_layanan`,
        formData
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == "Input Data Layanan Berhasil") {
          setStatusLayanan("Berhasil");
        } else if (res.data.status == "Data Layanan Sudah Ada") {
          setStatusLayanan("Gagal");
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
    setNamaLayanan(e.target.value);
  }

  function handleStok(e) {
    setStokLayanan(e.target.value);
  }
  function handleHarga(e) {
    const halo = e.target.value;
    const Ed = halo.slice(4).split('.').join('');
    setHargaLayanan(Ed);
  }
  
  function handleSatuan(e) {
    setSatuan(e.target.value);
  }
  
  const [Satuan, setSatuan] = useState("");
  const [KodeLayanan, setKode] = useState("");
  const [NamaLayanan, setNamaLayanan] = useState("");
  const [HargaLayanan, setHargaLayanan] = useState("");
  const [StokLayanan, setStokLayanan] = useState("");
  const [GambarLayanan, setGambar] = useState("");
  
  console.log(HargaLayanan)
  return (
    <>
      {StatusLayanan === "Berhasil" && <DataTersimpan />}
      {StatusLayanan === "Gagal" && <DataTelahTerdaftar />}
      <div
        className={`container_1 ${StatusLayanan ? "blur" : ""}`}
        style={StatusLayanan ? { overflow: "hidden" } : {}}
      >
        <Sidebar />
        <Navbar />
        <form onSubmit={Handle_inputLayanan}>
          <div className="bungkus">
            <div className="contain-inputlayanan">
              <div className="tbl_layanan">
                <div className="tambah_data_layanan">
                  <div className="div_ttl">
                    <span className="ttl">Tabel Tambah Layanan</span>
                  </div>
                  <div className="gambar_keterangan_lay">
                    <div className="kolom_input_l1">
                      <div className="div_kl">
                        <span className="span_input_l">Kode Layanan</span>
                        <div>
                          <input
                            type="text"
                            className="input_Bkode_l"
                            onChange={handleKode}
                            required
                          />
                        </div>
                      </div>
                      <div className="div_np">
                        <span className="span_input_l">Nama Layanan</span>
                        <div>
                          <input
                            type="text"
                            className="input_Bnama_l"
                            onChange={handleNama}
                            required
                          />
                        </div>
                      </div>
                      <div className="div_np">
                        <span className="span_input_l">Satuan Layanan</span>
                        <div>
                          <input
                            type="text"
                            className="input_Bnama_l"
                            onChange={handleSatuan}
                            required
                          />
                        </div>
                      </div>
                      <div className="div_np">
                        <span className="span_input_l">Stok Bahan</span>
                        <div>
                          <input
                            type="number"
                            className="input_Bstok_l"
                            onChange={handleStok}
                            required
                          />
                        </div>
                      </div>
                      <div className="div_kl">
                        <span className="span_input_l">Harga Layanan</span>
                        <div>
                        <CurrencyInput
                            id="input-example"
                            className="input_Bharga_l"
                            prefix="Rp. "
                            name="input-name"
                            placeholder="Please enter a number"
                            defaultValue={0}
                            decimalsLimit={2}
                            onChange={handleHarga}
                            disableAbbreviations={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="kolom_gambar_l">
                      <div>
                        <span className="span_input_l">Gambar Layanan</span>
                      </div>
                      <div className="input_gambar_l">
                        <input type="file" onChange={handleFile} required />
                      </div>
                    </div>
                  </div>
                  <div className="btn_hapussimpan-l">
                    <div className="btn_hapus-layanan">
                      <Link to={"/Data/data_layanan"}>
                        <button className="hapus-layanan_l">Batal</button>
                      </Link>
                    </div>
                    <div className="btn_simpan-layanan">
                      <button className="simpan-layanan_l">Simpan</button>
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
