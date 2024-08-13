import "../../component-css/print/tampilan_rekap/print_pengeluaran.css";
import Logo_Upj from "../../../../asset/logo_upj.png";
import React from "react";
import CurrentDate from "../../fitur_tambahan/date";

export const PrintPengeluaran = React.forwardRef((props, ref) => {
  const { DataTransaksi } = props;
  function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka);
  }
  return (
    <div class="tampilan_print_pem" ref={ref}>
      {DataTransaksi.map((item) => (
        <div class="tampilan_print_pem">
          <div class="page_print_pem">
            <div class="judul1_print_pem">
              <div class="logo_print_pem">
                <img src={Logo_Upj} alt="" />
              </div>
              <div class="judul_print_pem">
                <div class="judul_print_smk">
                  <span>SMK NEGERI 2 TASIKMALAYA</span>
                </div>
                <div className="judul_print_bidang">
                  <span>BIDANG KEAHLIAN TEKNOLOGI INFORMASI</span>
                </div>
                <div class="judul_print_upj">
                  <span>UNIT PRODUKSI & JASA</span>
                </div>
                <div class="judul_print_alamat">
                  <div className="jalan">
                    <span>
                      Jl. Noenoeng Tisnasaputra HP: 089657891005 Kel. Kahuripan
                      Kec. Tawang
                    </span>
                  </div>
                  <div className="ins">
                    <span>
                      Instagram: technonet_solution - Email:
                      up-ti@smkn2kotatasik.sch.id
                    </span>
                  </div>
                  <div className="tasik">
                    <span>TASIKMALAYA 46115</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="judul2_print">
              <div class="judul2_print_left">
                <div>
                  <span>Kepada</span>
                </div>
                <div>
                  <span>SMK Negeri 2 Tasikmalaya</span>
                </div>
                <div>
                  <span>di</span>
                </div>
                <div>
                  <span>Tempat</span>
                </div>
              </div>
              <div class="judul2_print_right">
                <div className="tgl_tasik">
                  <span>Tasikmalaya, </span>
                </div>
                <div className="tgl_tgl">
                  <span><CurrentDate/></span>
                </div>
              </div>
            </div>
            <div className="detail_pemasukan_ckj">
              <div class="tabel_print_pengeluaran">
                <table className="tbl_print_peng">
                  <tr className="judul_tbl_print_peng">
                    <th>Tanggal</th>
                    <th>Nama Barang / Jasa</th>
                    <th>Kuantitas</th>
                    <th>Satuan</th>
                    <th>Total Harga</th>
                  </tr>
                  <tr className="detail_tbl_print_peng">
                    <td>{item.Tanggal_Pengeluaran}</td>
                    <td>{item.Barang}</td>
                    <td>{item.Kuantitas}</td>
                    <td>{item.Uraian}</td>
                    <td>{formatRupiah(item.Nominal_Bayar_Pengeluaran)}</td>
                  </tr>
                  <tr className="total_tbl_print_peng">
                    <th colSpan={4}>Total</th>
                    <td>{formatRupiah(item.Nominal_Bayar_Pengeluaran)}</td>
                  </tr>
                </table>
              </div>
              <div className="ttd_print_pamsukan">
                <div className="ttd_pemasukan_left">
                  <div className="span_pemasukan">
                    <span>Penerima</span>
                  </div>
                  <div className="garis_bawah"></div>
                </div>
                <div className="ttd_pemasukan_right">
                  <div className="span_pemasukan_upj">
                    <div>
                      <span>HORMAT KAMI</span>
                    </div>
                    <div>
                      <span>Unit Produksi & Jasa TI</span>
                    </div>
                  </div>
                  <div className="garis_bawah"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
