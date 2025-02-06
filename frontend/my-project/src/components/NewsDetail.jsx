import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../../api/services/auth';

const NewsDetail = () => {
  const { id_berita } = useParams();
  const [NewsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);


  useEffect(() => {
    const token = getToken();
    setToken(token);
    if (!token) {
      navigate('/signin');
      return;
    }
    const fetchSchoolDetail = async () => {
      const token = getToken();
      console.log("Fetched ID:", id_berita);
      try {
        const response = await axios.get(`http://localhost:8080/future-path/user/full-news?id_berita=${id_berita}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.status.isSuccess) {
          setNewsDetail(response.data.data);
        } else {
          setError("Failed to retrieve News detail");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching News detail:", err);
        setError("Error fetching News detail");
        setLoading(false);
      }
    };

    fetchSchoolDetail();
  }, [id_berita]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="m-[30px] mx-20 mt-10 ">
      <div className='mx-40'>
      <h1 className=" text-5xl font-semibold  text-gray-1000 mb-[45px]">
        {NewsDetail.judul_berita}</h1>
        <div className='border-t-2 border-gray-400 mb-6 mt-6 '></div>
        <p className='text-justify indent-14 mb-8'>{NewsDetail.isi_berita}</p>
      </div>
      <div className='mt-[400px]'>
        <div className='border-t-2 border-gray-700 mb-6 mt-6 '></div>
        <Link to="/news" className="flex items-center text-sky-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l9-9m-9 9l9 9" />
          </svg>
          <span>Kembali ke halaman Berita</span>
        </Link>
      </div>
    </div>
  );
};

export default NewsDetail;