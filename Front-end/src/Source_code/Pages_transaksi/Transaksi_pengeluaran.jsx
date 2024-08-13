import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import "../CSS/transaksi.css";
import "../CSS/Pages_transaksi/Transaksi_pengeluaran.css";
import { Link } from "react-router-dom";
import QuantitySelector from "../component/fitur_tambahan/tambahkurang_angka";
import { useState, useEffect } from "react";
import axios from "axios";
import { TransaksiPengeluaran } from "../component/PopUp/transaksipengeluaran";
import CurrencyInput from "react-currency-input-field";

export default function Transaksi_pengeluaran() {
  const [Nama, setNama] = useState("");
  const [Produk, setProduk] = useState("");
  const [uraian, setUraian] = useState("");
  const [kuantitas, setKuantitas] = useState(0);
  const [Harga, setHarga] = useState(0);
  const [dana, setDana] = useState([]);
  const [Pengeluaran, setPengeluaran] = useState(0);
  const [Saldo, setSaldo] = useState(0);
  const [UpPengeluaran, setUpPengeluaran] = useState(0);
  const [UpSaldo, setUpSaldo] = useState(0);
  const [Show, setShow] = useState(false);
  const [totalHarga, setTotal] = useState(0);

  function refreshData() {
    window.location.reload();
  }

  useEffect(() => {
    const tes = window.localStorage.getItem("Authorization");
    axios
      .post(`${import.meta.env.VITE_API_URL}/Info`, { tes })
      .then((res) => {
        const responseDana = res.data;
        setDana(responseDana);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    dana.map((item) => {
      const inp = item.Pengeluaran;
      const saldo = item.Saldo;
      setPengeluaran(inp);
      setSaldo(saldo);
    });
    const updateSaldo = parseInt(Saldo) - parseInt(totalHarga);
    const updatePengeluaran = parseInt(Pengeluaran) + parseInt(totalHarga);
    setUpSaldo(updateSaldo);
    setUpPengeluaran(updatePengeluaran);
  });

  function SubmitPengeluaran(e) {
    e.preventDefault();
    const tes = window.localStorage.getItem("Authorization");
    axios
      .post(`${import.meta.env.VITE_API_URL}/transaksi/pengeluaran`, {
        Nama,
        Produk,
        uraian,
        kuantitas,
        totalHarga,
        tes,
      })
      .then((res) => {
        console.log(res);
      });

    axios
      .post(`${import.meta.env.VITE_API_URL}/pengeluaran`, {
        UpPengeluaran,
        UpSaldo,
        tes,
      })
      .then((res) => {
        console.log(res);
      });
    setShow(true);
  }

  function Total(e){
    const halo = e.target.value;
    const Ed = halo.slice(4).replace(/./g, '');
    setTotal(Ed)
  }

  return (
    <div>
      {Show && <TransaksiPengeluaran />}
      <Navbar />
      <Sidebar />
      <form onSubmit={SubmitPengeluaran}>
        <div
          className={`contain ${Show ? "blur" : ""}`}
          style={Show ? { overflow: "hidden" } : {}}
        >
          <div className="bungkus">
            <div className="cont_transaksi_pengeluaran">
              <div className="transaksi_menu">
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
                      <Link
                        to={"/transaksi/pengeluaran"}
                        className="pengeluaran_t"
                        id="active6"
                      >
                        <span>Pengeluaran</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="tbl_transaksi_pengeluaran">
                <div className="tbl_tran_pengeluaran">
                  <div className="tambah_data_tran_peng">
                    <div className="div_judul_tran_peng">
                      <span className="judul_tran_peng">Transaksi Pengeluaran</span>
                    </div>
                    <div className="inp_tran_pengeluaran">
                      <div className="inp_nama_tran">
                        <div className="div_nama_tran_peng">
                          <span className="span_input_tran_peng">Nama</span>
                          <div>
                            <input
                              type="text"
                              className="input_Btran_peng"
                              placeholder="Masukan nama kamu.."
                              onChange={(e) => setNama(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="div_nb_peng">
                          <span className="span_input_tran_peng">Nama Barang</span>
                          <div>
                            <input
                              type="text"
                              className="input_nb_tran_peng"
                              placeholder="Masukan nama barang.."
                              onChange={(e) => setProduk(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="div_nama_tran_peng">
                          <span className="span_input_tran_peng">Qty</span>
                          <div>
                            <input
                              type="number"
                              className="input_Btran_peng"
                              placeholder="Masukan kuantitas.."
                              onChange={(e) => setKuantitas(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="div_nb_peng">
                          <span className="span_input_tran_peng">Satuan</span>
                          <div>
                            <input
                              type="text"
                              className="input_satuan_peng"
                              placeholder="Masukan satuan.."
                              onChange={(e) => setUraian(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="div_nama_tran_peng">
                          <span className="span_input_tran_peng">Total Harga</span>
                          <div>
                            {/* <input
                              type="text"
                              className="input_harga_peng"
                              id="rupiah"
                              placeholder="Masukan total harga.."
                              onChange={(e) => setTotal(e.target.value)}
                              required
                            /> */}
                             <CurrencyInput
                            id="input-example"
                            className="input_harga_peng"
                            prefix="Rp. "
                            name="input-name"
                            placeholder="Masukkan Diskon.."
                            decimalsLimit={2}
                            defaultValue={0}
                            onChange={Total}
                          />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="btn_simpanhapus_tran_peng">
                      <div className="btn_hapus_barang_peng">
                          <input type="reset" className="hapus-barang_peng" value={"Batal"}/>
                      </div>
                      <div className="btn_simpan-barang_peng">
                        <button className="simpan-barang_peng">Simpan</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*
              <div className="tbl_inp-pengeluaran">
                 <div className="inp-pengeluaran">
                  <table className="pengeluaran-tabel">
                    <tr className="tabel_judul-pengeluaran">
                      <th className="nama_transaksi_pengeluaran">Nama</th>
                      <th className="barangjasa_transaksi_pengeluaran">
                        Barang/Jasa
                      </th>
                      <th className="kuantitas_transaksi_pengeluaran">
                        Kuantitas
                      </th>
                      <th className="uraian_transaksi_pengeluaran">Satuan</th>
                      <th className="harga_transaksi_pengeluaran">Harga</th>
                    </tr>
                    <tr className="masukan-pengeluaran">
                      <td className="nama_pengeluaran">
                        <input
                          type="text"
                          className="nama_tp"
                          placeholder="Masukan nama.."
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </td>
                      <td className="barangjasa_pengeluaran">
                        <input
                          type="text"
                          className="barangjasa_tp"
                          placeholder="Nama barang/jasa.."
                          onChange={(e) => setProduk(e.target.value)}
                        />
                      </td>
                      <td className="kuantitas_pengeluaran">
                        <input
                          type="number"
                          name="qty"
                          id="qty"
                          className="kuantitas"
                          placeholder="masukan kuantitas.."
                          onChange={(e) => setKuantitas(e.target.value)}
                        />
                      </td>
                      <td className="uraian_pengeluaran">
                        <input
                          type="text"
                          className="uraian_tp"
                          placeholder="masukan uraian.."
                          onChange={(e) => setUraian(e.target.value)}
                        />
                      </td>
                      <td className="harga_pengeluaran">
                        <input
                          type="text"
                          className="harga_tp"
                          placeholder="masukan harga.."
                         onChange={(e) => setUraian(e.target.value)}
                        />
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="transaksi_pengeluaran">
                  <div className="div_jumlah-harga-pengeluaran">
                    <div className="div_span">
                      <span>Jumlah Harga :</span>
                    </div>
                    <div className="div_bayar-pengeluaran">
                      <span>Rp. {totalHarga}</span>
                    </div>
                  </div>
                  <div className="div_pesan-pengeluaran">
                    <div className="pengeluaran_batal">
                      <button>
                        <span>Batal</span>
                      </button>
                    </div>
                    <div className="pengeluaran_simpan">
                      <button>
                        <span>Simpan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
                 */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
