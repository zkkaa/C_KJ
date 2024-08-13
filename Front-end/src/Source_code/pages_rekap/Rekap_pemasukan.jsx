import "../CSS/pages_rekap/rekap_pemasukan.css";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import { Blueprint, Printer, Trash, Note } from "@phosphor-icons/react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useState, useEffect, useRef } from "react";
import PagePrintPemasukan from "../component/print/page_print-pemasukan";
import { MultiPrint } from "../component/print/tampilan_rekap/MultiPrint";
import { HapusTransaksiPemasukan } from "../component/PopUp/hapus";
import { HapusTransaksiPemasukanSatu } from "../component/PopUp/hapus";

export default function Rekap_pemasukan() {
  const [dataPemasukan, setData] = useState([]);
  const [DataTransaksi, setDataTransaksi] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handlePrint = async (item) => {
    let findProduct = await DataTransaksi.find((i) => {
      return i.id_transaksi === item.id_transaksi;
    });
    if (findProduct) {
      setDataTransaksi([...DataTransaksi]);
    } else {
      let addProduct = {
        ...item,
      };
      setDataTransaksi([...DataTransaksi, addProduct]);
      setShow(true);
    }
  };

  const handleDelete = async (item) => {
    let findProduct = await DataTransaksi.find((i) => {
      return i.id_transaksi === item.id_transaksi;
    });
    if (findProduct) {
      setDataTransaksi([...DataTransaksi]);
    } else {
      let addProduct = {
        ...item,
      };
      setDataTransaksi([...DataTransaksi, addProduct]);
      setShowDelete(true);
    }
  };

  useEffect(() => {
    const tes = window.localStorage.getItem("Authorization");
    axios
      .post(`${import.meta.env.VITE_API_URL}/Rekap/Rekap_pemasukan`, { tes })
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [filter, setFilter] = useState("");
  const [filterTahun, setFilterTahun] = useState("");

  function OnChangeTahun(value) {
    setFilterTahun(value);
  }

  function OnChange(value) {
    setFilter(value);
  }

  const [halo, setHal] = useState([]);
  const [prevFilter, setPrevFilter] = useState(filter);
  const [prevFilterTahun, setPrevFilterTahun] = useState(filterTahun);

  useEffect(() => {
    if (prevFilter !== filter || prevFilterTahun !== filterTahun) {
      setHal([]);
      setPrevFilter(filter);
      setPrevFilterTahun(filterTahun);
    } else {
      const filteredData = dataPemasukan.filter(
        (item) =>
          item.Tanggal_Pemasukan.includes(filter) &&
          item.Tanggal_Pemasukan.includes(filterTahun)
      );

      const newData = filteredData.filter(
        (fdItem) =>
          !halo.some(
            (haloItem) => haloItem.id_pemasukan === fdItem.id_pemasukan
          )
      );

      if (newData.length > 0) {
        setHal((currentHalo) => [...currentHalo, ...newData]);
      }
    }
  }, [filter, filterTahun, halo]);

  console.log(halo);

  function ShowPrint() {
    ReactHandlePrint();
  }

  const componentRef = useRef();
  const ReactHandlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [total, setharga] = useState([]);

  useEffect(() => {
    let x = 0;
    for (let y of halo) {
      x += y.Total_Pemasukan;
    }
    setharga(x);
  });

  const [hapusData, setHapus] = useState(false);

  function hapus() {
    setHapus(true);
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
    <>
      <div className="divcontents" style={{ display: "none" }}>
        <MultiPrint ref={componentRef} Total={total} DataTransaksi={halo} />
      </div>
      {hapusData && (
        <HapusTransaksiPemasukan
          Pemasukan_Data={halo}
          setHapusMulti={setHapus}
        />
      )}
      {showDelete && (
        <HapusTransaksiPemasukanSatu
          Pemasukan_Data={DataTransaksi}
          setShowDelete={setShowDelete}
          setDataTransaksi={setDataTransaksi}
        />
      )}
      {show && <PagePrintPemasukan DataTransaksi={DataTransaksi} setShow={setShow} setDataTransaksi={setDataTransaksi}/>}
      <Sidebar />
      <Navbar />
      <div
        className={`contain ${hapusData || showDelete ? "blur" : ""}`}
        style={hapusData || showDelete ? { overflow: "hidden" } : {}}
      >
        <div class="cont_rekap_pemasukan">
          <div class="menu_rekap_pemasukan">
            <div class="rekap_pemasukan_div">
              <ul>
                <li>
                  <Link
                    to={"/Rekap/Rekap_pemasukan"}
                    class="pemasukan_t"
                    id="active10"
                  >
                    <span>Pemasukan</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div class="rekap_pengeluaran_div">
              <ul>
                <li>
                  <Link to={"/Rekap/Rekap_pengeluaran"} class="pengeluaran_t">
                    <span>Pengeluaran</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div class="dropdown_cari_r-pemasukan">
            <div class="dropdown_r">
              <div class="div_droptahun_r-pemasukan">
                <select
                  name="tahun"
                  class="tahun"
                  onChange={(e) => OnChangeTahun(e.target.value)}
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  </select>
              </div>
              <div class="div_dropbulan_r-pemasukan">
                <select
                  name="bulan"
                  class="bulan"
                  onChange={(e) => OnChange(e.target.value)}
                >
                  <option value="Januari">Januari</option>
                  <option value="februari">Februari</option>
                  <option value="Maret">Maret</option>
                  <option value="April">April</option>
                  <option value="Mei">Mei</option>
                  <option value="Juni">Juni</option>
                  <option value="Juli">Juli</option>
                  <option value="Agustus">Agustus</option>
                  <option value="September">September</option>
                  <option value="October">Oktober</option>
                  <option value="November">November</option>
                  <option value="Desember">Desember</option>
                </select>
              </div>
            </div>
            <div class="hapus_print_r-pemasukan">
              <button class="btn_print_r-pemasukan" onClick={ShowPrint}>
                <Printer size={32} className="icon_pem_print" />
                <span>Print</span>
              </button>
              <button class="btn_hapus_r-pemasukan" onClick={hapus}>
                <Trash size={32} className="icon_rpem" />
                <span>Hapus</span>
              </button>
            </div>
          </div>

          <div class="tbl_data_r_pemasukan">
            <div class="list_r-pemasukan">
              <table class="rekap_pemasukan_tabel">
                <tr class="tj_r-pemasukan">
                  <th class="tanggal__rekap_pemasukan">Tanggal</th>
                  <th class="nama__rekap_pemasukan">Nama</th>
                  <th class="barangjasa__rekap_pemasukan">Barang/Jasa</th>
                  <th class="kuantitas__rekap_pemasukan">Qty</th>
                  <th class="satuan__rekap_pemasukan">Satuan</th>
                  <th class="diskon__rekap_pemasukan">Diskon</th>
                  <th class="pajak__rekap_pemasukan">Pajak</th>
                  <th class="harga_rekap_pemasukan">Total Harga</th>
                  <th class="detail__rekap_pemasukan">Aksi</th>
                </tr>
                {dataPemasukan
                  .filter(
                    (item) =>
                      item.Tanggal_Pemasukan.includes(filter) &&
                      item.Tanggal_Pemasukan.includes(filterTahun)
                  )
                  .map((item) => (
                    <tr
                      key={item.id_pemasukan}
                      onClick={() => AddTransaksiPrint(item)}
                    >
                      <td>{item.Tanggal_Pemasukan}</td>
                      <td>{item.Nama_Pelanggan}</td>
                      <td>{item.Barang}</td>
                      <td>{item.kuantitas}</td>
                      <td>{item.Satuan}</td>
                      <td>
                        <span>{formatRupiah(item.Diskon)}</span>
                      </td>
                      <td>
                        <span>{formatRupiah(item.Pajak)}</span>
                      </td>
                      <td>
                        <span>{formatRupiah(item.Total_Pemasukan)}</span>
                      </td>
                      <td className="aksi_rpemasukan">
                        <button
                          className="btn-detail-pemasukan"
                          onClick={() => handlePrint(item)}
                        >
                          <Note size={32} className="icon_detaihapus_repem" />
                        </button>
                        <button
                          className="btn_hapus_tblpemasukan"
                          onClick={() => handleDelete(item)}
                        >
                          <Trash size={32} className="icon_detaihapus_repem" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
