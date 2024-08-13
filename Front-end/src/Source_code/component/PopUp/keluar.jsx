import { useState } from "react";
import { LogOutBerhasil } from "./login-berhasil";
import "../component-css/PopUp_css/keluar.css";

export function LogOut({setKeluar}) {
  function refreshData() {
    setKeluar(false)
  }

  const [berhasil, setBerhasil] = useState(false);

  function Keluar() {
    localStorage.clear();
    setBerhasil(true);
  }

  return (
    <>
      {berhasil && <LogOutBerhasil />}
      <div
        className={`containerOut ${berhasil ? "blur" : ""} && `}
        style={berhasil ? { overflow: "hidden" } : {}}
      >
        <div class="Div_PopUp_Keluar_web">
          <div class="PopUp_Keluar_web">
            <div class="popup-judul">
              <span>Keluar?</span>
            </div>
            <div class="popup-des">
              <span>Anda yakin ingin keluar?</span>
            </div>
            <div class="btn_tidak-ya">
              <button class="btn-tidak" onClick={refreshData}>
                Tidak
              </button>
              <button class="btn-ya_Out" onClick={Keluar}>
                Ya
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
