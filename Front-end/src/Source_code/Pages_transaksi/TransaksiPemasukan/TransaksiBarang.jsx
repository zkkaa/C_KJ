import Sidebar from "../../component/Sidebar.jsx";
import Navbar from "../../component/Navbar.jsx";
import "../../CSS/Pages_transaksi/Transaksi_pemasukan.css";
import { Link } from "react-router-dom";
import QuantitySelector from "../../component/fitur_tambahan/tambahkurang_angka.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { MagnifyingGlass } from "@phosphor-icons/react";
import InputTransaksi_pemasukan from "./InputTransksi/input_transaksi.jsx";

export default function TransaksiBarang() {
  const [showForm, setShowForm] = useState(false);
  const [Cart, setCart] = useState([]);

  function handleBayarClick() {
    setShowForm(true);
  }

  console.log(Cart);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let newTotal = 0;
    Cart.forEach((icart) => {
      newTotal = newTotal + parseInt(icart.total);
    });
    setTotal(newTotal);
  });

  const removeProduct = async (product) => {
    const newCart = Cart.filter(
      (CartItem) => CartItem.Id_Barang !== product.Id_Barang
    );
    setCart(newCart);
  };

  const AddCart = async (item) => {
    if(item.Stok_Barang == 0 ){
      console.log("STOK KOSONG")
    }else{
    let findProduct = await Cart.find((i) => {
      return i.Id_Barang === item.Id_Barang;
    });

    if (findProduct) {
      let newCart = [];
      let newItem;

      Cart.forEach((CartItem) => {
        if (CartItem.Id_Barang === item.Id_Barang) {
          if(CartItem.stokMin == 0){
            console.log("STOK HABIS")
            newCart.push(CartItem);
          }else{
            newItem = {
              ...CartItem,
              jumlah: CartItem.jumlah + 1,
              total: CartItem.Harga_Barang * (CartItem.jumlah + 1),
              newStok: item.Stok_Barang - 1 - CartItem.jumlah,
              stokMin: item.Stok_Barang - (CartItem.jumlah + 1) ,
            };
            newCart.push(newItem);
          }
        } else {
          newCart.push(CartItem);
        }
      });
      setCart(newCart);
    
    } else {
      let addProduct = {
        ...item,
        jumlah: 1,
        harga: item.Harga_Barang,
        total: item.Harga_Barang,
        newStok: item.Stok_Barang - 1,
      };
      setCart([...Cart, addProduct]);
    }
  };}

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
      {showForm && <InputTransaksi_pemasukan total={total} Cart={Cart} setShowForm={setShowForm}/>}
      <Navbar />
      <Sidebar />
      <div
        className={`contain ${showForm ? "blur" : ""}`}
        style={showForm ? { overflow: "hidden" } : {}}
      >
        <div className="bungkus">
          <div className="cont_transaksi_pemasukan">
            <div className="transaksi_menu">
              <div className="div_pemasukan_t">
                <ul>
                  <li>
                    <Link
                      to={"/transaksi/barang"}
                      className="pemasukan_t"
                      id="active5"
                    >
                      <span>Pemasukan</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="div_pengeluaran_t">
                <ul>
                  <li>
                    <Link
                      to={"/transaksi/pengeluaran"}
                      className="pengeluaran_t"
                    >
                      <span>Pengeluaran</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tbl_data_produk-transaksi">
              <div className="page-transaksi-left">
                <div className="transaksi-left-top">
                  <Link to={"/transaksi/barang"}>
                    <button className="btn-barang-transaksi" id="active8">
                      <span>Barang</span>
                    </button>
                  </Link>
                  <Link to={"/transaksi/layanan"}>
                    <button className="btn-layanan-transaksi">
                      <span>Layanan</span>
                    </button>
                  </Link>
                </div>
                <div className="transaksi-left-bottom-semua">
                  <ProductCartBarang AddCart={AddCart} />
                </div>
              </div>
              <div className="page-transaksi-right">
                <div className="div-pesanan-pt">
                  <span className="pesanan">Pesanan</span>
                </div>
                <div className="tbl_data_pesanan-pt">
                  <div className="list-pesanan-pt">
                    <table>
                      <thead>
                        <tr className="tabel_judul-pt">
                          <th className="produk_transaksi-pt">Produk</th>
                          <th className="kuantitas_transaksi-pt">Kuantitas</th>
                          <th className="harga_transaksi-pt">Harga</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Cart
                          ? Cart.map((CartProduct, key) => (
                              <tr key={key}>
                                <td>{CartProduct.Nama_Barang}</td>
                                <td>{CartProduct.jumlah}</td>
                                <td>{formatRupiah(CartProduct.harga)}</td>
                                <td>
                                  <button
                                    className="bt-hps-pesanan"
                                    onClick={() => removeProduct(CartProduct)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="1.5vw"
                                      height="3vh"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            ))
                          : "no item in cart"}
                      </tbody>
                    </table>
                  </div>
                  <div className="transaksi_pesan-pt">
                    <div className="div_jumlah-harga-pt">
                      <div className="div_total-pt">
                        <span>Total :</span>
                      </div>
                      <div className="div_bayar-pt">
                        <span>{formatRupiah(total)}</span>
                      </div>
                    </div>
                    <div className="div_btn_bayar">
                      <button onClick={handleBayarClick}>
                        <span>Bayar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const ProductCartBarang = ({ AddCart }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const tes = window.localStorage.getItem("Authorization")
    axios
      .post(`${import.meta.env.VITE_API_URL}/Data/data_barang`, {tes})
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
      {data.map((item) => (
        <ul class="produk-terdaftar-pt" onClick={() => AddCart(item)}>
          <li class="li-produk-pt" key={item.Id_Barang}>
            <div className="div_terdaftar-pt">
              <div className="gambar_terdaftar-pt">
                <img
                  src={`${import.meta.env.VITE_API_URL}/public/${
                    item.Poto_Barang
                  }`}
                  alt=""
                />
              </div>
              <div className="keterangan_terdaftar-pt">
                <div className="div-top-pt">
                  <div className="nama_terdaftar-pt">
                    <div className="produk-pt">
                      <span>{item.Nama_Barang}</span>
                    </div>
                    <div>
                      <span className="harga_terdaftar-pt">
                        {formatRupiah(item.Harga_Barang)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="div-bottom-pt">
                  <div className="div_stok_trans">
                    <div className="stok_trans">
                      <span>Stok :</span>
                    </div>
                    <div className="jmlh_stok_trans">
                      <span>{item.Stok_Barang}</span>
                    </div>
                  </div>
                  <div className="div-pesan-pt">
                    <button className="pesan-pt">
                      <span>Pesan</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      ))}
    </>
  );
};
