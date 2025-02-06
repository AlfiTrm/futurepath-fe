import React, { useState } from 'react';

const PopUpList = ({ openPopUpList, closePopUpList, onConfirm, initialNama, initialAlamat, initialDeskripsi, initialId }) => {
  const [namaSekolah, setNamaSekolah] = useState(initialNama);
  const [alamatSekolah, setAlamatSekolah] = useState(initialAlamat);
  const [deskripsiSekolah, setDeskripsiSekolah] = useState(initialDeskripsi);
  const [idKepemilikan, setIdKepemilikan] = useState(initialId);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!namaSekolah || !alamatSekolah || !deskripsiSekolah || !idKepemilikan) {
      alert("Semua field harus diisi!");
      return;
    }

    console.log("Data yang akan dikirim:", {
      nama_sekolah: namaSekolah,
      alamat_sekolah: alamatSekolah,
      deskripsi_sekolah: deskripsiSekolah,
      id_kepemilikan: parseInt(idKepemilikan, 10), 
    });

    onConfirm(namaSekolah, alamatSekolah, deskripsiSekolah, parseInt(idKepemilikan, 10));
  };

  return (
    openPopUpList ? (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Tambah Sekolah</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nama Sekolah</label>
              <input
                type="text"
                value={namaSekolah}
                onChange={(e) => setNamaSekolah(e.target.value)}
                
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label>Alamat Sekolah</label>
              <input
                type="text"
                value={alamatSekolah}
                onChange={(e) => setAlamatSekolah(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label>Deskripsi Sekolah</label>
              <textarea
                value={deskripsiSekolah}
                onChange={(e) => setDeskripsiSekolah(e.target.value)}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label>ID Kepemilikan</label>
              <select
                value={idKepemilikan}
                onChange={(e) => setIdKepemilikan(e.target.value)} 
                required
                className="border p-2 w-full"
              >
                <option value="">Pilih Kategori</option>
                <option value="1">Negeri</option>
                <option value="2">Swasta</option>
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button type="button" onClick={closePopUpList} className="mr-2 border p-2 rounded">Batal</button>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">Tambah</button>
            </div>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default PopUpList;