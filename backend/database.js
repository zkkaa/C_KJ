import mysql from "mysql2"

export const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project_ckj",
  });

  
export const getData = {
    user: "SELECT * FROM user_account  WHERE username = ? AND password = ?",
    getUser: "SELECT * FROM user_account  WHERE id_user = ?",
    inputDataBarang:
      "INSERT INTO data_barang ( Nama_Barang, Harga_Barang, Stok_Barang, Poto_Barang, Kode_Barang, UserBarang, Satuan ) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
    inputDataLayanan:
      "INSERT INTO data_layanan ( Nama_Layanan, Harga_Layanan, Stok_Layanan, Poto_Layanan, Kode_Layanan, UserLayanan, Satuan ) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
    inputDataPelanggan:
      "INSERT INTO data_pelanggan ( Nama_Pelanggan, Nomer_Telepon, Alamat_Pelanggan, UserPelanggan ) VALUES ( ?, ?, ?, ?)",
    data_barang: "SELECT * FROM data_barang WHERE UserBarang = ? ORDER BY Id_Barang DESC",
    data_layanan : "SELECT * FROM data_layanan WHERE UserLayanan = ? ORDER BY Id_Layanan DESC",
    data_pelanggan : "SELECT * FROM data_pelanggan WHERE UserPelanggan = ? ORDER BY Id_Pelanggan DESC",
    transaksiPemasukan : "INSERT INTO pemasukan ( Nominal_Bayar, Uang_Kembalian, Nama_Pelanggan, Barang, Tanggal_Pemasukan, Total_Pemasukan,Diskon, Pajak,  kuantitas, Harga_Satuan, Satuan, user ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    transaksiPengeluaran : "INSERT INTO pengeluaran ( Nominal_Bayar_Pengeluaran, Barang, Tanggal_Pengeluaran, Uraian, Kuantitas, Nama, user) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
    rekap_pemasukan :  'SELECT * FROM pemasukan WHERE user = ? ORDER BY id_pemasukan DESC',
    rekap_pengeluaran : "SELECT * FROM pengeluaran WHERE user = ? ORDER BY id_pengeluaran DESC",
    Dompet : " SELECT * FROM user_account LEFT JOIN dana ON user_account.dana = dana.id_dana WHERE id_user = ?",
    DanaPemasukan : "UPDATE user_account LEFT JOIN dana ON user_account.dana = dana.id_dana SET Pemasukan = ?, Saldo = ? WHERE id_user = ?",
    DanaPengeluaran : "UPDATE user_account LEFT JOIN dana ON user_account.dana = dana.id_dana SET Pengeluaran = ?, Saldo = ? WHERE id_user = ?",
    UpdateDataBarang:
      "UPDATE data_barang SET Nama_Barang = ?, Harga_Barang = ?, Stok_Barang = ?, Kode_Barang = ?, Satuan = ? WHERE Id_Barang = ?",
      DeleteProduk : "DELETE FROM data_barang WHERE Id_Barang = ?",
      UpdateDataLayanan:
      "UPDATE data_layanan SET Nama_Layanan = ?, Harga_Layanan = ?, Stok_Layanan = ?, Kode_Layanan = ?, Satuan = ? WHERE Id_Layanan = ?",
      DeleteLayanan : "DELETE FROM data_layanan WHERE Id_Layanan = ?",
      UpdateDataPelanggan:
      "UPDATE data_pelanggan SET Nama_Pelanggan = ?, Nomer_Telepon = ?, Alamat_Pelanggan = ? WHERE Id_Pelanggan = ?",
      DeletePelanggan : "DELETE FROM data_pelanggan WHERE Id_Pelanggan = ?",
      DeletePemasukan : "DELETE FROM pemasukan WHERE id_pemasukan = ?",
      DeletePengeluaran : "DELETE FROM pengeluaran WHERE Id_Pengeluaran = ?",
  };