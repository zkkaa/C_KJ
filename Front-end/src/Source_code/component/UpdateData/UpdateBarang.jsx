import "../../CSS/input_data/input_barang.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataTersimpan } from "../PopUp/data-tersimpan";
import CurrencyInput from "react-currency-input-field";

export default function UpdateBarang({ DataBarang, setDataBarang, setShowUp }) {
  const [Data, setData] = useState({
    Id_Barang: DataBarang[0].Id_Barang,
    Nama_Barang: DataBarang[0].Nama_Barang,
    Harga_Barang: DataBarang[0].Harga_Barang,
    Stok_Barang: DataBarang[0].Stok_Barang,
    Poto_Barang: DataBarang[0].Poto_Barang,
    Kode_Barang: DataBarang[0].Kode_Barang,
    Satuan: DataBarang[0].Satuan,
  });
  const [Show, setShow] = useState(false);
  function refreshData() {
    setDataBarang([])
    setShowUp(false)
  }

  console.log(Data);
  function Handle_inputBarang(event) {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/Update_data_barang`, Data)
      .then((res) => {
        console.log(res);
      });
    setShow(true);
  }

  function handleHarga(e) {
    const halo = e.target.value;
    const Ed = halo.slice(4).split('.').join('');
    setData({ ...Data, Harga_Barang: Ed })
  }
  

  return (
    <>
      {Show && <DataTersimpan />}
      <div
        className={`contain ${Show ? "blur" : ""}`}
        style={Show ? { overflow: "hidden" } : {}}
      >
        <form onSubmit={Handle_inputBarang}>
          <div className="contain-updatebarang">
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
                          onChange={(e) =>
                            setData({ ...Data, Kode_Barang: e.target.value })
                          }
                          value={Data.Kode_Barang}
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
                          onChange={(e) =>
                            setData({ ...Data, Nama_Barang: e.target.value })
                          }
                          value={Data.Nama_Barang}
                          required
                        />
                      </div>
                    </div>
                    <div className="div_kb">
                        <span className="span_input_b">Satuan Barang</span>
                        <div>
                          <input type="text" className="input_Bkode" onChange={(e) =>
                            setData({ ...Data, Satuan: e.target.value })
                          }
                          value={Data.Satuan}
                          required/>
                        </div>
                      </div>
                    <div className="div_nb">
                      <span className="span_input_b">Stok Barang</span>
                      <div>
                        <input
                          type="number"
                          className="input_Bstok"
                          onChange={(e) =>
                            setData({ ...Data, Stok_Barang: e.target.value })
                          }
                          value={Data.Stok_Barang}
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
                            placeholder="Please enter a number"
                            defaultValue={Data.Harga_Barang}
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
                      <img
                        src={`${import.meta.env.VITE_API_URL}/public/${
                          Data.Poto_Barang
                        }`}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="btn_simpanhapus">
                  <div className="btn_hapus-barang_i">
                    <input
                      type="reset"
                      className="hapus-barang_i"
                      value={"Batal"}
                      onClick={refreshData}
                    />
                  </div>
                  <div className="btn_simpan-barang">
                    <button className="simpan-barang">Simpan</button>
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
