import Sidebar from "../../../component/Sidebar";
import Navbar from "../../../component/Navbar";
import "../../../CSS/Pages_transaksi/InputTransaksi/input_transaksi.css";
import { Car, MagnifyingGlass } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Detail from "../../../component/Detail";
import CurrencyInput from "react-currency-input-field";

export default function InputTransaksi_pemasukan({ total, Cart, setShowForm }) {
  const [data, setData] = useState([]);
  const [totalHarga, setTotal] = useState(parseInt(total));
  const [Diskon, setDiskon] = useState(0);
  const [Pajak, setPajak] = useState(0);
  const [NominalBayar, setNominal] = useState(0);
  const [Kembalian, setKembalian] = useState(0);
  const [dana, setDana] = useState([]);
  const [pemasukan, setPemasukan] = useState(0);
  const [Saldo, setSaldo] = useState(0);
  const [upSaldo, setUpSaldo] = useState(0);
  const [upPemasukan, setUpPemasukan] = useState(0);
  const [filteredResults, setFilteredResults] = useState([{"Nama_Pelanggan" : "Default"}]);
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState(false);
  const [statusPelanggan, setStatusPelanggan] = useState(false);
  const [Show, setShow] = useState(false);

  
  useEffect(() => {
    console.log(filteredResults)
    const tes = window.localStorage.getItem("Authorization")
    axios
      .post(`${import.meta.env.VITE_API_URL}/Data/data_pelanggan`, {tes})
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const searchItems = (searchValue) => {
    setFilteredResults();
    setStatus(true);
    setStatusPelanggan(false);
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data);
    }
  };


  function InputDiskon(e) {
    const halo = e.target.value;
    const Ed = halo.slice(4).split('.').join('');
    setDiskon(parseInt(Ed));
  }

  function InputPajak(e) {
    const halo = e.target.value;
    const Ed = halo.slice(4).split('.').join('');
    setPajak(parseInt(Ed));
  }

  function InputNominal(e) {
    if (isNaN(e)) setNominal(0);
    const halo = e.target.value;
    const Ed = halo.slice(4).split('.').join('');
    setNominal(Ed);
  }
  useEffect(() => {
    if (isNaN(Pajak)) setPajak(0);
    if (isNaN(Diskon)) setDiskon(0);
    const tes = parseInt(total) + Pajak - Diskon;
    setTotal(tes);
    const balik = parseInt(NominalBayar) - parseInt(totalHarga);
    setKembalian(balik);
  }, [total, Pajak, Diskon, NominalBayar, totalHarga]);

  useEffect(() => {
    const tes = window.localStorage.getItem("Authorization")
    axios
      .post(`${import.meta.env.VITE_API_URL}/Info`, {tes})
      .then((res) => {
        const responseDana = res.data;
        setDana(responseDana);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    dana.map((e) => {
      const inp = e.Pemasukan;
      const saldo = e.Saldo;
      setPemasukan(inp);
      setSaldo(saldo);
    });

    console.log(Kembalian);

    const update = Saldo + totalHarga;
    const updatePemasukan = pemasukan + totalHarga;
    setUpSaldo(update);
    setUpPemasukan(updatePemasukan);
    console.log(upSaldo);
    console.log(upPemasukan);
  });

  function GetStatus() {
    setStatus(false);
    if (filteredResults.length > 1) {
      setStatusPelanggan(false);
    } else {
      setStatusPelanggan(true);
    }
  }

  console.log(filteredResults);

  function KirimData(e) {
    e.preventDefault();
    const tes = window.localStorage.getItem("Authorization")
    let newItem = [
      {
        TotalhargaBayar: totalHarga,
        Diskon: Diskon,
        Pajak: Pajak,
        NominalBayar: NominalBayar,
        Kembalian: Kembalian,
      },
    ];
    axios
      .post(`${import.meta.env.VITE_API_URL}/Transaksi/pemasukan`, {
        filteredResults,
        newItem,
        Cart,
        tes,
      })
      .then((res) => {
        console.log(res);
      });

    axios
      .post(`${import.meta.env.VITE_API_URL}/pemasukan`, {
        upPemasukan,
        upSaldo,
        tes,
      })
      .then((res) => {
        console.log(res);
      });

    axios
      .post(`${import.meta.env.VITE_API_URL}/dataStokBarang`, { Cart })
      .then((res) => {
        console.log(res);
      });

    setShow(true);
  }

  function Out(){
    setShowForm(false)
  }

  function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka);
  }


  return (
    <div>
      {Show && <Detail total={totalHarga} Diskon={Diskon} Pajak={Pajak} NominalBayar={NominalBayar} Kembalian={Kembalian}/>}
      <Navbar />
      <Sidebar />
      <form onSubmit={KirimData}>
        <div
          className={`contain ${Show ? "blur" : ""}`}
          style={Show ? { overflow: "hidden" } : {}}
        >
          <div className="cont_T-pelanggan_terdaftar">
            <div className="pelanggan_terdaftar">
              <div className="judul_T-pel_terdaftar">
                <span className="terdaftar_judul">Pelanggan</span>
              </div>
              <div className="terdaftar_cari">
                <div className="cari">
                  <button className="btn_cari">
                    <MagnifyingGlass size={32} className="icon_transaksi_pemasukan_inp" />
                  </button>
                  <input
                    type="search"
                    className="terdaftar_input-cari"
                    placeholder="Masukkan nama pelanggan.."
                    onChange={(e) => searchItems(e.target.value)}
                  />
                </div>
                {status && (
                  <div className="hasil">
                    {searchInput.length > 1
                      ? filteredResults.map((item) => {
                          return (
                            <div key={item.Id_Pelanggan}>
                              <button
                                onClick={GetStatus}
                                className="click_nama"
                              >
                                {item.Nama_Pelanggan}
                              </button>
                            </div>
                          );
                        })
                      : data.map((item) => {
                          return (
                            <div key={item.Id_Pelanggan}>
                              {item.Nama_Pelanggan}
                            </div>
                          );
                        })}
                  </div>
                )}
              </div>
              {statusPelanggan && (
                <div>
                  {filteredResults.map((item) => (
                    <div className="terdaftar_identitas">
                      <div className="divnama">
                        <div className="nama_p">
                          <span>Nama</span>
                        </div>
                        <div className="titik-dua">
                          <span>:</span>
                        </div>
                        <div className="input_T_nama">
                          <span>{item.Nama_Pelanggan}</span>
                        </div>
                      </div>
                      <div className="divnomer">
                        <div className="nomer-telepon_p">
                          <span>Nomer Telepon</span>
                        </div>
                        <div className="titik-dua">
                          <span>:</span>
                        </div>
                        <div className="input_T_nomer">
                          <span>{item.Nomer_Telepon}</span>
                        </div>
                      </div>
                      <div className="divalamat">
                        <div className="alamat_p">
                          <span>Alamat</span>
                        </div>
                        <div className="titik-dua">
                          <span>:</span>
                        </div>
                        <div className="input_T_alamat">
                          <span>{item.Alamat_Pelanggan}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="judul_T-pel_terdaftar">
                <span className="terdaftar_judul">Pembayaran</span>
              </div>
              <div className="terdaftar_pembayaran">
                <div className="div_total_harga-pt">
                  <span className="span_input_total">Total Tagihan</span>
                  <div>
                    <span className="input_total_tagihan">{formatRupiah(totalHarga)}</span>
                  </div>
                </div>
                <div className="div_diskon_pajak-pt">
                  <div className="div_diskon-pt">
                    <span className="span_input_t">Diskon</span>
                    <div>
                      {/* <input
                        type="text"
                        className="input_diskon-pt"
                        placeholder="Masukan diskon.."
                        onChange={(e) => InputDiskon(e.target.value)}
                      /> */}
                       <CurrencyInput
                            id="input-example"
                            className="input_diskon-pt"
                            prefix="Rp. "
                            name="input-name"
                            placeholder="Masukkan Diskon.."
                            decimalsLimit={2}
                            defaultValue={0}
                            onChange={InputDiskon}
                          />
                    </div>
                  </div>
                  <div className="div_pajak-pt">
                    <span className="span_input_t">Pajak</span>
                    <div>
                      {/* <input
                        type="text"
                        className="input_pajak-pt"
                        placeholder="Masukan pajak.."
                        onChange={(e) => InputPajak(e.target.value)}
                      /> */}
                       <CurrencyInput
                            id="input-example"
                            className="input_pajak-pt"
                            prefix="Rp. "
                            name="input-name"
                            placeholder="Masukkan Pajak.."
                            decimalsLimit={2}
                            defaultValue={0}
                            onChange={InputPajak}
                          />
                    </div>
                  </div>
                </div>
                <div className="div_nominal_bayar-pt">
                  <span className="span_input_t">Nominal Bayar</span>
                  <div>
                    {/* <input
                      type="text"
                      className="input_nominal-pt"
                      placeholder="Masukan nominal.."
                      onChange={(e) => InputNominal(e.target.value)}
                    /> */}
                     <CurrencyInput
                            id="input-example"
                            className="input_nominal-pt"
                            prefix="Rp. "
                            name="input-name"
                            placeholder="Please enter a number"
                            decimalsLimit={2}
                            defaultValue={0}
                            onChange={InputNominal}
                          />
                  </div>
                </div>
              </div>
              <div className="btn_simpan-pelanggan_t">
                <Link to={"/transaksi/barang"}>
                <input type="reset" className="batal-pelanggan_t" value={"Batal"} onClick={Out}/>
                </Link>
                <button className="simpan-pelanggan_t">Bayar</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
