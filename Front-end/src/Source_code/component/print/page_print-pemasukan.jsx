import { PrintPemasukan } from "../print/tampilan_rekap/print_pemasukan";
import { Link } from "react-router-dom";
import "../component-css/print/page_print_pemasukan.css";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import Logo_Upj from "../.../../../../asset/logo_upj.png";

export default function PagePrintPemasukan({ DataTransaksi, setShow, setDataTransaksi }) {
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

  console.log(DataTransaksi);
  return (
    <>
      <div>
        <div className="divcontents" style={{ display: "none" }}>
          <PrintPemasukan ref={componentRef} DataTransaksi={DataTransaksi} />
        </div>
        <div className="print_page">
          {DataTransaksi.map((item) => (
            <div class="tampilan_print_pem" key={item.id_pemasukan}>
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
                    <span>LAPORAN PEMASUKAN </span>
                  </div>
                  <div class="tanggal_print">
                    <span class="tanggal_print_pem">
                      {item.Tanggal_Pemasukan}
                    </span>
                  </div>
                </div>
                <div class="keterangan_print">
                  <div class="nama_pelanggan_print">
                    <span className="pelanggan_print_pem">
                      {item.Nama_Pelanggan}
                    </span>
                  </div>
                  <div class="barangjasa_print">
                    <span>- </span>
                    <span className="barangjasa_print_pem">{item.Barang}</span>
                  </div>
                  <div class="div_harga_print">
                    <div class="jumlah_barangjasa">
                      <div class="tagihan_print">
                        <span class="harga_print_pem">{formatRupiah(item.Harga_Satuan)}</span>
                      </div>
                      <div class="jumlah_barangjasa_print">
                        <span>x</span>
                        <span class="kuantitas_print_pem">
                          {item.kuantitas}
                        </span>
                      </div>
                    </div>
                    <div class="total_tagihan_print">
                      <span class="total_harga_print_pem">
                        {formatRupiah(item.Harga_Satuan * item.kuantitas)}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="total_bayar_print">
                  <div class="span_total_tagihan">
                    <div class="left">
                      <span>Total Tagihan</span>
                    </div>
                    <div class="right">
                      <span className="total_harga_print_pem">
                        {formatRupiah(item.Total_Pemasukan)}
                      </span>
                    </div>
                  </div>
                  <div class="span_diskon">
                    <div class="left">
                      <span>Diskon</span>
                    </div>
                    <div class="right">
                      <span className="diskon_print_pem">{formatRupiah(item.Diskon)}</span>
                    </div>
                  </div>
                  <div class="span_pajak">
                    <div class="left">
                      <span>Pajak</span>
                    </div>
                    <div class="right">
                      <span className="pajak_print_pem">{formatRupiah(item.Pajak)}</span>
                    </div>
                  </div>
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
