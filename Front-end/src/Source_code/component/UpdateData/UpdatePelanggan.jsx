import '../../CSS/input_data/input_pelanggan.css'
import { useState } from 'react';
import axios from 'axios';
import { DataTersimpan } from '../PopUp/data-tersimpan';

export default  function UpdatePelanggan({DataPelanggan, setShowUp, setDataPelanggan}){
    console.log(DataPelanggan)
    const[Data, setData] = useState({
        Id_Pelanggan : DataPelanggan[0].Id_Pelanggan,
        Nama_Pelanggan : DataPelanggan[0].Nama_Pelanggan,
        Alamat_Pelanggan : DataPelanggan[0].Alamat_Pelanggan,
        Nomer_Telepon : DataPelanggan[0].Nomer_Telepon,
    });
    const[Show, setShow] = useState(false)
    
    function refreshData(){
      setDataPelanggan([])
      setShowUp(false)
  }

    console.log(Data)
    function Handle_inputPelanggan(event) {
      event.preventDefault();
      axios
      .post(
        `${import.meta.env.VITE_API_URL}/Update_data_pelanggan`,
        Data
        )
        .then((res) => {
          console.log(res);
          });
        setShow(true)
      }

    return(
        <>
        {Show && <DataTersimpan/>}
        <div
        className={`contain ${Show ? "blur" : ""}`}
        style={Show ? { overflow: "hidden" } : {}}
      >
        <form onSubmit={Handle_inputPelanggan}>
          <div className="contain-updatepelanggan">
            <div className="tbl_data_pelanggan">
              <div className="tambah_data_pelanggan">
                <div className="div_ttp">
                  <span className="ttp">Tabel Tambah Pelanggan</span>
                </div>
                <div className="kolom_input_p">
                  <div className="div_kp">
                    <span className="span_input_p">Nama</span>
                    <div>
                      <input
                        type="text"
                        className="input_Bnama_p"
                        onChange={e => setData({...Data, Nama_Pelanggan: e.target.value})}
                        value={Data.Nama_Pelanggan}
                        required
                      />
                    </div>
                  </div>
                  <div className="div_np">
                    <span className="span_input_p">Nomer Telepon</span>
                    <div>
                      <input
                        type="text"
                        className="input_Bnomer_p"
                        onChange={e => setData({...Data, Nomer_Telepon: e.target.value})
                        }
                        value={Data.Nomer_Telepon}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="kolom_alamat">
                  <div>
                    <span className="span_input_p">Alamat</span>
                  </div>
                  <div className="input_alamat">
                    <textarea
                      name=""
                      id=""
                      rows="4"
                      onChange={e => setData({...Data, Alamat_Pelanggan: e.target.value})}
                      value={Data.Alamat_Pelanggan}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="btn_simpanhapus_p">
                  <div className="btn_hapus-pelanggan" onClick={refreshData}>
                      <input type="reset" value={"Batal"} className="hapus-pelanggan" onClick={refreshData} />
                  </div>
                  <div className="btn_simpan-pelanggan">
                    <button className="simpan-pelanggan">Simpan</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        </div>
        </>
    )
}