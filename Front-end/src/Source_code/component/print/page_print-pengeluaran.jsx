import { PrintPengeluaran } from "../print/tampilan_rekap/print_pengeluaran";
import { Link } from "react-router-dom";
import "../component-css/print/page_print_pemasukan.css";
import Logo_Upj from "../../../asset/logo_upj.png";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function PagePrintPengeluaran({ DataTransaksi, setShow, setDataTransaksi }) {
  const componentRef = useRef();
  const ReactHandlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  function print() {
    ReactHandlePrint();
  }

  function Batal(){
    setDataTransaksi([])
    setShow(false)
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
      <div>
        <div className="divcontents" style={{ display: "none" }}>
          <PrintPengeluaran ref={componentRef} DataTransaksi={DataTransaksi} />
        </div>
        <div className="print_page">
          {DataTransaksi.map((item) => (
            <div class="tampilan_print_pem" key={item.Id_Pengeluaran}>
              <div class="page_print_pem">
                <div class="judul1_print_pem">
                  <div class="logo_print_pem">
                    <img src={Logo_Upj} alt="" />
                  </div>
                  <div class="judul_print_pem">
                    <div class="judul_print_unit">
                      <span>Unit Produksi dan Jasa</span>
                    </div>
                    <div class="judul_print_upj">
                      <span>UPJ TECHNOLOGI INFORMASI</span>
                    </div>
                    <div class="judul_print_alamat">
                      <span>jl. Noenoeng Tisnasaputra Kec. Tawang</span>
                    </div>
                  </div>
                </div>
                <div class="judul2_print">
                  <div class="jenis_laporan_print">
                    <span>LAPORAN PEMASUKAN</span>
                  </div>
                  <div class="tanggal_print">
                    <span class="tanggal_print_pem">
                      {item.Tanggal_Pengeluaran}
                    </span>
                  </div>
                </div>
                <div class="keterangan_print">
                  <div class="nama_pelanggan_print">
                    <span className="pelanggan_print_pem">{item.Nama}</span>
                  </div>
                  <div class="barangjasa_print">
                    <span>- </span>
                    <span className="barangjasa_print_pem">{item.Barang}</span>
                  </div>
                  <div class="div_harga_print">
                    <div class="jumlah_barangjasa">
                      <div class="tagihan_print">
                        <span>Uraian</span>
                        <span class="harga_print_pem">{item.Uraian}</span>
                      </div>
                      <div class="jumlah_barangjasa_print">
                        <span>x</span>
                        <span class="kuantitas_print_pem">
                          {item.Kuantitas}
                        </span>
                      </div>
                    </div>
                    <div class="total_tagihan_print">
                      <span class="total_harga_print_pem">
                        {formatRupiah(item.Nominal_Bayar_Pengeluaran)}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="total_bayar_print">
                  {/* <div class="span_total_tagihan">
            <div class="left">
              <span>Total Tagihan</span>
            </div>
            <div class="right">
              <span>Rp. </span>
              <span className="total_harga_print_pem">{item.Total_Pemasukan}</span>
            </div>
          </div> */}
                </div>
              </div>
            </div>
          ))}
          <div className="btn-detail-print">
            <button className="kembali" onClick={Batal}>Batal</button>
            <button onClick={print} id="print">
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
