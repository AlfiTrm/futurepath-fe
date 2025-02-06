import { Link, useNavigate } from 'react-router-dom';
import PopUpList from '../layout/PopUpList';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken, getRoleId } from '../../../api/services/auth';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import banner from '../images/campus.jpg';
import { IoLocationSharp } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";


const List = () => {
  const [isPopUpListOpen, setIsPopUpListOpen] = useState(false);
  const [allSekolah, setAllSekolah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [idSek, setIdSek] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [newSchool, setNewSchool] = useState({ namaSekolah: '', alamatSekolah: '', deskripsiSekolah: '', idKepemilikan: 1 });


  const fetchSchools = async () => {
    const token = getToken();
    const role = getRoleId();
    setToken(token);
    setUserRole(role);
    if (!token || !role) {
      navigate('/signin');
      return;
    }

    try {
      let url;
      if (selectedCategory == "1") {
        url = `http://localhost:8080/future-path/user/cari-sekolah/negeri?sekolah`;
      } else if (selectedCategory == "2") {
        url = `http://localhost:8080/future-path/user/cari-sekolah/swasta?Sekolah`;
      } else {
        url = `http://localhost:8080/future-path/user/list-sekolah?page=${currentPage}`;
      }

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      let sekolahArray = [];
      if (selectedCategory == "1" || selectedCategory == "2") {
        sekolahArray = response.data.data || [];
        setTotalData(response.data.data.total_data); 
      } else {
        sekolahArray = response.data.data.sekolah || [];
        setTotalData(response.data.data.total_data); 
      }

      setAllSekolah(sekolahArray);
      const allIds = sekolahArray.map(sekolah => sekolah.id_sekolah);
      setIdSek(allIds);

      console.log("Semua ID Sekolah:", allIds);
      console.log("Fetch Data:", response.data.data.total_data);
      console.log(sekolahArray);
      console.log("FetchID Pertama:", sekolahArray[0]?.id_sekolah); 
      setTotalPages(Math.ceil(response.data.data.total_data / 10));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const confirmCreate = async (namaSekolah, alamatSekolah, deskripsiSekolah, idKepemilikan) => {
    try {
      const token = getToken();
      const response = await axios.post(`http://localhost:8080/future-path/admin/add-sekolah`, {
        nama_sekolah: namaSekolah,
        alamat_sekolah: alamatSekolah,
        deskripsi_sekolah: deskripsiSekolah,
        id_kepemilikan: idKepemilikan
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response);
      const newSchoolData = { ...response.data.data.sekolah, id: response.data.data };
      setAllSekolah(prevSekolah => [...prevSekolah, newSchoolData]);
      setIsPopUpListOpen(false);
      fetchSchools();
    } catch (err) {
      setError(err);
      console.error("Error adding school:", err.response?.data || err.message);
    }
  }

  useEffect(() => {
    fetchSchools();
  }, [currentPage, selectedCategory]);


  const filteredSekolah = allSekolah.filter(sekolah =>
    sekolah.nama_sekolah && sekolah.nama_sekolah.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="relative text-center text-white shadow-md ">
        <img alt="University campus with buildings and trees" src={banner} className="w-full h-[450px] object-cover" />        <div className="absolute ml-5 transform bottom-10 text-left">
          <h1 className="text-6xl">Pilihan</h1>
          <p className="text-xl">Temukan sekolah atau universitas favoritmu, dan temukan informasi lengkapnya!</p>

        </div>
      </div>

      {userRole == 1 && (
        <button onClick={() => setIsPopUpListOpen(true)} className='flex items-center justify-center my-10 bg-gray-100 text-black  mx-auto p-4 px-60 rounded-lg border shadow-md hover:shadow-inner hover:shadow-gray-300  cursor-pointer transition-transform transform hover:translate-y-1'>
          <div className='flex space-x-1 '>
            <IoIosAddCircleOutline size={25} className='text-sky-700 ' />
            <h1>Tambah Sekolah</h1>
          </div>
          </button>
      )}


      <form onSubmit={(e) => { e.preventDefault(); }}>
        <div className='mt-5 flex justify-center'>
          <input
            type="search"
            className="p-2 w-1/2 rounded-l-xl border shadow-sm focus:outline-none hover:shadow-inner hover:shadow-gray-200 focus:shadow-inner active:transition-none"
            placeholder="Mau cari apa?"
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="p-2.5 h-full text-sm font-medium text-white bg-sky-700 rounded-r-lg border shadow-md border-sky-700 hover:bg-sky-800 focus:shadow-inner hover:shadow-gray-200 active:shadow-inner focus:duration-500">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </button>
        </div>
      </form>

      <div className='flex justify-end'>
        <div className='flex justify-end mt-10 mb-3 mr-9'>
          <div className="w-56 px-3">
            <label className="block uppercase tracking-wide text-gray-600 text-xs font-bold leading-5">
              Kategori
            </label>
            <select
              className="block appearance-none w-full border px-4 py-2 rounded-lg shadow-md leading-tight focus:outline-none active:transition-none active:transition-shadow focus:shadow-inner hover:shadow-inner hover:shadow-gray-200 "
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
                console.log(e.target.value)
              }}
            >
              <option className='shadow' value="">Semua</option>
              <option value="1">Negeri</option>
              <option value="2">Swasta</option>
            </select>
          </div>
        </div>
      </div>

      <ul className='grid grid-cols-1 sm:grid-cols-4'>
        {filteredSekolah.length == 0 ? (
          <div className='col-span-3 text-center text-red-500 mt-5'>
            Sekolah tidak ditemukan
          </div>
        ) : (
          filteredSekolah.map((sekolah) => (
            <li key={sekolah.id_sekolah} className='justify-center border w-[auto] h-[160px] m-3 px-3 rounded-xl shadow-md hover:shadow-inner hover:shadow-gray-200 cursor-pointer'>
              <h2 className='my-2 text-md font-semibold'>{sekolah.nama_sekolah}</h2>
              <div className='flex my-2 '>
                <IoLocationSharp className='text-sky-700 mr-1' />
                <p className=''>{sekolah.alamat_sekolah}</p>
              </div>
              <button className='absolute border p-1 my-9 rounded-xl bg-sky-700 text-white text-sm scale-100 hover:scale-105'>
                <Link to={`/List-Detail/${sekolah.id_sekolah}`} className='m-2'>Lebih Lanjut</Link>
              </button>
            </li>
          ))
        )}
      </ul>

      <PopUpList
        openPopUpList={isPopUpListOpen}
        closePopUpList={() => setIsPopUpListOpen(false)}
        onConfirm={confirmCreate}
        initialNama={newSchool.namaSekolah}
        initialAlamat={newSchool.alamatSekolah}
        initialDeskripsi={newSchool.deskripsiSekolah}
        initialId={newSchool.idKepemilikan}
      />

      <div className='flex justify-center mt-5'>
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className='absolute mr-5' disabled={currentPage <= 1}>
            <MdNavigateBefore size={30} />
          </button>
        )}
        {currentPage < totalPages && (
          <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
            <MdNavigateNext size={30} />
          </button>
        )}
      </div>
    </div>
  );
};

export default List;