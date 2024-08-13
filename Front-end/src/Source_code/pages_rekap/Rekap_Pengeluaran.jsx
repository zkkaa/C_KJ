import "../CSS/pages_rekap/rekap_pengeluaran.css";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import { Printer, Trash, Note } from "@phosphor-icons/react";
import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { MultiPrintPengeluaran } from "../component/print/tampilan_rekap/MultiPengeluaran";
import PagePrintPengeluaran from "../component/print/page_print-pengeluaran";
import { HapusTransaksiPengeluaran } from "../component/PopUp/hapus";
import { HapusTransaksiPengeluaranSatuan } from "../component/PopUp/hapus";

export default function Rekap_pengeluaran() {
  const [dataPengeluaran, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [DataTransaksi, setDataTransaksi] = useState([]);
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
    const tes = window.localStorage.getItem("Authorization")
    axios
      .post(`${import.meta.env.VITE_API_URL}/Rekap/Rekap_pengeluaran`,{tes})
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

  const [halo, setHal] = useState([])
  const [prevFilter, setPrevFilter] = useState(filter);
const [prevFilterTahun, setPrevFilterTahun] = useState(filterTahun);

  useEffect(() => {
    if(prevFilter !== filter || prevFilterTahun !== filterTahun){
      setHal([])
      setPrevFilter(filter)
      setPrevFilterTahun(filterTahun)
    } else{
      const filteredData = dataPengeluaran.filter((item) => 
        item.Tanggal_Pengeluaran.includes(filter) && 
      item.Tanggal_Pengeluaran.includes(filterTahun)
    );
    
    const newData = filteredData.filter((fdItem) => 
      !halo.some((haloItem) => haloItem.id_pengeluaran === fdItem.id_pengeluaran)
  );
  
  if (newData.length > 0) {
    setHal((currentHalo) => [...currentHalo, ...newData]);
  }
    }
  }, [filter, filterTahun, halo]);

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
      x += y.Nominal_Bayar_Pengeluaran;
    }
    setharga(x);
  });

  const [hapusData, setHapus] = useState(false);

  function hapus() {
    setHapus(true);
  }
  console.log(halo)

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
        <MultiPrintPengeluaran
          ref={componentRef}
          Total={total}
          DataTransaksi={halo}
        />
      </div>
      {hapusData && <HapusTransaksiPengeluaran Pengeluaran_Data={halo} setHapusMulti={setHapus}/>}
      {showDelete && <HapusTransaksiPengeluaranSatuan Pengeluaran_Data={DataTransaksi} setShowDelete={setShowDelete} setDataTransaksi={setDataTransaksi}/>}
      {show && <PagePrintPengeluaran DataTransaksi={DataTransaksi} setShow={setShow} setDataTransaksi={setDataTransaksi}/>}
      <Sidebar />
      <Navbar />
      <div
        className={`contain ${hapusData || showDelete ? "blur" : ""}`}
        style={hapusData || showDelete ? { overflow: "hidden" } : {}}
      >
        <div class="cont_rekap_pengeluaran">
          <div class="menu_rekap_pengeluaran">
            <div class="rekap_pemasukan_div">
              <ul>
                <li>
                  <Link to={"/Rekap/Rekap_pemasukan"} class="pemasukan_t">
                    <span>Pemasukan</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div class="rekap_pengeluaran_div">
              <ul>
                <li>
                  <Link
                    to={"/Rekap/Rekap_pengeluaran"}
                    class="pengeluaran_t"
                    id="active11"
                  >
                    <span>Pengeluaran</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div class="dropdown_cari_r-pengeluaran">
            <div class="dropdown_r-pengeluaran">
              <div class="div_droptahun_r-pengeluaran">
                <select
                  name="tahun"
                  class="tahun"
                  onChange={(e) => OnChangeTahun(e.target.value)}
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
              <div class="div_dropbulan_r-pengeluaran">
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
            <div class="hapus_print_r-pengeluaran">
              <button class="btn_print_r-pengeluaran" onClick={ShowPrint}>
                <Printer size={32} className="icon_peng_print" />
                <span>Print</span>
              </button>
              <button class="btn_hapus_r-pengeluaran" onClick={hapus}>
                <Trash size={32} className="incon_peng" />
                <span>Hapus</span>
              </button>
            </div>
          </div>

          <div class="tbl_data_r_pengeluaran">
            <div class="list_r-pengeluaran">
              <table class="rekap_pengeluaran_tabel">
                <tr class="tj_r-pengeluaran">
                  <th class="tanggal_rekap_pengeluaran">tanggal</th>
                  <th class="nama_rekap_pengeluaran">Nama</th>
                  <th class="barangjasa_rekap_pengeluaran">Barang/Jasa</th>
                  <th class="kuantitas_rekap_pengeluaran">Qty</th>
                  <th class="uraian_rekap_pengeluaran">Satuan</th>
                  <th class="harga_rekap_pengeluaran">Total Harga</th>
                  <th class="detail_rekap_pengeluaran">Aksi</th>
                </tr>
                {dataPengeluaran
                  .filter(
                    (item) =>
                      item.Tanggal_Pengeluaran.includes(filter) &&
                      item.Tanggal_Pengeluaran.includes(filterTahun)
                  )
                  .map((item) => (
                    <tr
                      key={item.Id_Pengeluaran}
                    >
                      <td>{item.Tanggal_Pengeluaran}</td>
                      <td>{item.Nama}</td>
                      <td>{item.Barang}</td>
                      <td>{item.Kuantitas}</td>
                      <td>{item.Uraian}</td>
                      <td>
                        <span>{formatRupiah(item.Nominal_Bayar_Pengeluaran)}</span>
                      </td>
                      <td className="btn_aksi_rekap_peng">
                        <button
                          className="btn-detail-pengeluaran"
                          onClick={() => handlePrint(item)}
                        >
                          <Note size={32} className="icon_detaihapus_repeng" />
                        </button>
                        <button className="btn_hapus_tblpengeluaran"  onClick={() => handleDelete(item)}>
                          <Trash size={32} className="icon_detaihapus_repeng" />
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
