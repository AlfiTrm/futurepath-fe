import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { getToken, getRoleId } from '../../../api/services/auth';

const SchoolDetail = () => {
  const { id_sekolah } = useParams(); 
  const [SchoolDetail, setSchoolDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);


  useEffect(() => {
    const token = getToken();
    const role = getRoleId();
    setToken(token);
    setUserRole(role);
    if (!token || !role) {
      navigate('/signin');
      return;
    }
    const fetchSchoolDetail = async () => {
      const token = getToken();
      console.log("Fetched ID:", id_sekolah); 
      try {
        const response = await axios.get(`http://localhost:8080/future-path/user/sekolah?id_sekolah=${id_sekolah}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log("Response Data:", response.data); 
        console.log("Response School:", response);
        if (response.data.status.isSuccess) {
          setSchoolDetail(response.data.data); 
        } else {
          setError("Failed to retrieve School detail");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching School detail:", err); 
        setError("Error fetching School detail");
        setLoading(false);
      }
    };

    fetchSchoolDetail();
  }, [id_sekolah]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="m-[30px]">
      <Link to="/home" className="flex items-center text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l9-9m-9 9l9 9" />
        </svg>
        <span>Kembali ke halaman Pilihan</span>
      </Link>
      <div className='border-t-4 border-gray-700 mb-6 mt-6'></div>
      <h1 className=" text-5xl font-bold  text-gray-1000 mb-[45px]">
        {SchoolDetail.nama_sekolah}</h1>
      <p className='text-justify indent-14 mb-8'>{SchoolDetail.alamat_sekolah}</p>
      <p className='text-justify indent-14 '>{SchoolDetail.deskripsi_sekolah}</p>
    </div>
  );
};

export default SchoolDetail;