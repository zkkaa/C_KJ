import '../../component/component-css/PopUp_css/pembayaran_berhasil.css'
import { Link } from "react-router-dom";

export function PembayaranBerhasil() {
  function refreshData(){
    window.location.reload();
}
  return (
    <div class="Div_PopUp_Pembayaran-Berhasil">
      <div class="PopUp_Pembayaran-Berhasil">
        <div class="popup-gambar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path
              fill="currentColor"
              d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01m204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0"
            />
          </svg>
        </div>
        <div class="popup-judul">
          <span>Berhasil!</span>
        </div>
        <div class="popup-des">
          <span>Lanjut ke halaman rekap?</span>
        </div>
        <div class="btn_pembayaran_berhasil">
          <button class="tidak_rekap" onClick={refreshData}>Tidak</button>
          <Link to={"/Rekap/Rekap_pemasukan"}>
          <button class="ya_rekap">Ya</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
