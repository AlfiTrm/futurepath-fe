import React, { useState, useEffect, useRef } from "react";
import pradita from "../images/pradita.jpg";
import ugm from "../images/ugm.jpg";
import harvard from "../images/harvard.jpg";
import axios from 'axios';
import { getToken, getRoleId } from '../../../api/services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import Carousel from '../partial/Carousel';

const slides = [
  {
    title: "SMA Pradita Dirgantara",
    rank: "Top 3 Sekolah Indonesia",
    description:
      "SMA Pradita Dirgantara mengemban amanah untuk membawa anak didik memiliki pengetahuan yang luas, cerdas, berkarakter mulia, dan disiplin yang kuat.",
    image: pradita,
  },
  {
    title: "SMAN 3 Surakarta",
    rank: "Top 245 Sekolah Indonesia",
    description:
      "Sekolah Menengah Atas Negeri 3 Surakarta, dikenal dengan nama Smaga adalah Sekolah Menengah Atas yang terdapat di Kota Surakarta, provinsi Jawa Tengah.",
    image: ugm,
  },
  {
    title: "SMA 123 Amonali",
    rank: "Top 1 Sekolah Indonesia",
    description: "Deskripsi apapun itu lah intinya ini sekolah bisa swasta bisa negri tidak dikenal dengan nama apapun karena ya ga ada di dunia nyata kocak.",
    image: harvard,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [allSekolah, setAllSekolah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [idSek, setIdSek] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const fetchSchools = async () => {
    const token = getToken();
    const role = getRoleId();
    setToken(token);
    setUserRole(role);
    if (token ===  role === "") {
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

  useEffect(() => {
    fetchSchools();
  }, [currentPage, selectedCategory]);

  const filteredSekolah = allSekolah.filter(sekolah =>
    sekolah.nama_sekolah && sekolah.nama_sekolah.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center">
      <Carousel slides={slides} />
      <div className="flex justify-center items-center mt-14 w-full">
        <form onSubmit={(e) => { e.preventDefault(); }} className="w-full max-w-lg">
          <div className='flex justify-center'>
            <input
              type="search"
              className="p-2 w-full rounded-xl border focus:outline-none focus:shadow-inner active:transition-none"
              placeholder="Mau cari apa?"
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        <div className=''>
          <div className=''>
            <div className="w-56 px-3">
              <label className="block absolute uppercase tracking-wide text-gray-600 text-xs font-bold leading-5 -translate-y-5">
                Kategori
              </label>
              <select
                className="block appearance-auto w-full p-1 py-2 rounded-lg text-white bg-blue-500 leading-tight focus:outline-none"
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                  console.log(e.target.value)
                }}
              >
                <option className='bg-white text-blue-400' value="">Semua</option>
                <option className="bg-white text-blue-400" value="1">Negeri</option>
                <option className="bg-white text-blue-400" value="2">Swasta</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-[95%] mt-20'>
          {filteredSekolah.length == 0 ? (
            <p className='col-span-3 text-center text-red-500 mt-5'>
              Sekolah tidak ditemukan
            </p>
          ) : (
            filteredSekolah.map((sekolah) => (
              <li key={sekolah.id_sekolah} className='justify-center shadow-md w-[auto] h-[auto] m-3 px-3 rounded-xl cursor-pointer'>
                <h2 className='my-2 text-xl font-bold'>{sekolah.nama_sekolah}</h2>
                <div className='flex my-2 '>
                  <FaLocationDot size={15} className="text-blue-400" />
                  <p className='text-sm'>{sekolah.alamat_sekolah}</p>
                </div>
                <button className='border px-1 my-4 rounded-lg  bg-blue-500 border-blue-500 text-white text-sm scale-100 hover:bg-white hover:text-blue-500 inline-flex'>
                  <Link to={`/List-Detail/${sekolah.id_sekolah}`} className='m-2'>
                    Lebih Lanjut
                  </Link>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div >
  );
};

export default Home;
