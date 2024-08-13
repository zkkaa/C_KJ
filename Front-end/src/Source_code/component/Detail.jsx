import { useState } from "react";
import "./component-css/Detail.css"
import { PembayaranBerhasil } from "./PopUp/pembayaran_berhasil";
import CurrentDate from "./fitur_tambahan/date";

export default function Detail({total, Diskon, Pajak, NominalBayar, Kembalian}) {
  const [Show, setShow] = useState(false)
  function Oke(){
    setShow(true)
  }
  return (
    <>
    {Show && <PembayaranBerhasil/>}
    <div
        className={`container_1 ${Show ? "blur" : ""}`}
        style={Show ? { overflow: "hidden" } : {}}
      >
      <div class="tbl_orderan_berhasil">
        <div class="orderan_berhasil">
          <div class="orderan">
            <span>Orderan Berhasil</span>
          </div>
          <div class="div-isi">
            <div class="ket-judul">
              <span>Waktu Pembayaran</span>
            </div>
            <div class="ket-keterangan">
              <span class="waktu_pembayaran"><CurrentDate/></span>
            </div>
          </div>
          <div class="div-isi">
            <div class="ket-judul">
              <span>Pajak</span>
            </div>
            <div class="ket-keterangan">
              <span>Rp. </span>
              <span class="pajak_bayar">{Pajak}</span>
            </div>
          </div>
          <div class="div-isi">
            <div class="ket-judul">
              <span>Diskon</span>
            </div>
            <div class="ket-keterangan">
              <span>Rp. </span>
              <span class="diskon_nayar">{Diskon}</span>
            </div>
          </div>
          <div class="div-isi">
            <div class="ket-judul">
              <span>Total Tagihan</span>
            </div>
            <div class="ket-keterangan">
              <span>Rp. </span>
              <span class="total_tagihan">{total}</span>
            </div>
          </div>
          <div class="div-isi">
            <div class="ket-judul">
              <span>Nominal Bayar</span>
            </div>
            <div class="ket-keterangan">
              <span>Rp. </span>
              <span class="nominal_bayar">{NominalBayar}</span>
            </div>
          </div>
          <div class="div-isi">
            <div class="ket-judul">
              <span>Kembalian</span>
            </div>
            <div class="ket-keterangan">
              <span>Rp. </span>
              <span class="kembalian">{Kembalian}</span>
            </div>
          </div>

          <div class="btn_printokedetail">
            <div class="btn_oke_detail">
              <button class="oke" onClick={Oke}>Oke</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
