import React, { useEffect, useState } from 'react';
import '../index.css';
import PopUpNews from '../layout/PopUpNews';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken, getRoleId } from '../../../api/services/auth';
import banner from '../images/campus.jpg';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

const News = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [newsToEdit, setNewsToEdit] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newNews, setNewNews] = useState({ headline: '', content: '' });
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchedNews = async () => {
    const token = getToken();
    const role = getRoleId();
    setUserRole(role);
    setToken(token);
    if (!token || !role) {
      navigate('/signin');
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/future-path/user/berita?page=${currentPage}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      const fetchedNews = response.data.data.berita;
      setNews(fetchedNews);
      setTotalPages(Math.ceil(response.data.data.total_data / 10));
      localStorage.setItem('news', JSON.stringify(fetchedNews));
    } catch (error) {
      console.error("Error fetching news:", error);
      const localNews = localStorage.getItem('news');
      if (localNews) {
        setNews(JSON.parse(localNews));
      }
    }
  };

  useEffect(() => {
    fetchedNews();
  }, [currentPage]);

  const confirmDelete = async () => {
    if (newsToDelete) {
      try {
        const token = getToken();
        await axios.delete(`http://localhost:8080/future-path/admin/delete-berita/${newsToDelete.id_berita}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setNews(news.filter((item) => item.id_berita !== newsToDelete.id_berita));
        localStorage.setItem('news', JSON.stringify(news.filter((item) => item.id_berita !== newsToDelete.id_berita)));
      } catch (error) {
        console.error("Error deleting News:", error);
      }
    }
    closeDeletePopup();
  };

  const confirmEdit = async (headline, content) => {
    if (newsToEdit) {
      try {
        const token = getToken();
        await axios.patch(`http://localhost:8080/future-path/admin/update-berita/${newsToEdit.id_berita}`,
          {
            judul_berita: headline,
            isi_berita: content
          }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const updatedNews = news.map((item) =>
          item.id_berita === newsToEdit.id_berita ? { ...item, judul_berita: headline, isi_berita: content } : item
        );
        setNews(updatedNews);
        localStorage.setItem('news', JSON.stringify(updatedNews));
      } catch (error) {
        console.error("Error updating News:", error);
      }
    }
    closeEditPopup();
  };

  const confirmCreate = async (id_berita, headline, content) => {
    try {
      const token = getToken();
      const response = await axios.post(`http://localhost:8080/future-path/admin/create-berita`,
        { judul_berita: headline, isi_berita: content },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      const newNewsData = { ...response.data.data.berita, id_berita: response.data.data.berita.id_berita };
      const updatedNews = [...news, newNewsData];
      setNews(updatedNews);
      localStorage.setItem('news', JSON.stringify(updatedNews));
    } catch (error) {
      console.error("Error creating News:", error);
    }
    closeCreatePopup();
  };

  const openDeletePopup = (item) => {
    setNewsToDelete(item);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setNewsToDelete(null);
  };

  const openEditPopup = (item) => {
    setNewsToEdit(item);
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
    setNewsToEdit(null);
  };

  const openCreatePopup = () => {
    setNewNews({ headline: '', content: '' });
    setShowCreatePopup(true);
  };

  const closeCreatePopup = () => {
    setShowCreatePopup(false);
  };

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

  useEffect(() => {
    const localNews = localStorage.getItem('news');
    if (localNews) {
      setNews(JSON.parse(localNews));
    }
    fetchedNews();
  }, []);

  return (
    <div>
      <div className="w-full text-center text-white shadow-md top-0">
        <img alt="University campus with buildings and trees" src={banner} className="w-full h-[50vh] object-cover" />
        <div className="absolute -translate-y-28 ml-5  text-left">
          <h1 className="text-6xl">Berita</h1>
          <p className="text-xl">Explore the latest news, events, from top universities and schools.</p>
        </div>
      </div>

      {userRole == 1 && (
        <div className="flex items-center justify-center my-10 bg-gray-100 text-black max-w-2xl mx-auto p-4 rounded-lg border shadow-md hover:shadow-inner hover:shadow-gray-300 cursor-pointer transition-transform transform" onClick={openCreatePopup}>
          <div className='flex space-x-1'>
            <IoIosAddCircleOutline size={25} className='text-sky-700 ' />
            <h1>Tambah Berita</h1>
          </div>
        </div>
      )}
      <div className='flex justify-center'>
        <div className="relative flex-col mt-[40px] max-w-screen w-[90%] justify-center mx-2 p-4 border rounded-lg ">
          <div className='px-2 flex gap-2 mb-5 items-center '>
            <a className='font-bold text-sm'>Features</a>
            <div className='bg-blue-500 px-1 w-full rounded-x-lg h-2'></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.isArray(news) && news.length > 0 ? (
              news.map((item) => (
                <div key={item.id_berita} className="flex items-start mb-6 border-b p-4 shadow-sm hover:shadow-inner shadow-gray-300">
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold">{item.judul_berita}</h2>
                    <p className="text-gray-700">{item.isi_berita}</p>
                    <button className='border p-2 my-3 rounded-lg bg-blue-500 text-white text-sm'
                      onClick={() => navigate(`/full-news/${item.id_berita}`)}>
                      Lebih Lanjut
                    </button>
                  </div>
                  <div className="flex flex-col items-center ml-4 ">
                    {userRole == 1 && (
                      <div onClick={() => openEditPopup(item)} className="bg-gray-200 p-2 rounded-full mb-2 cursor-pointer hover:bg-yellow-200">
                        <FaPencilAlt />
                      </div>
                    )}
                    {userRole == 1 && (
                      <div onClick={() => openDeletePopup(item)} className="bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-red-300">
                        <FaTrash />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>Berita belum ada</div>
            )}
          </div>
        </div>

        {showDeletePopup && (
          <PopUpNews
            openPopUp={showDeletePopup}
            closePopUp={closeDeletePopup}
            title="Confirm Deletion"
            message={`Are you sure you want to delete News: "${newsToDelete.judul_berita}"?`}
            onConfirm={confirmDelete}
            styleType="delete"
          />
        )}
        {showEditPopup && (
          <PopUpNews
            openPopUp={showEditPopup}
            closePopUp={closeEditPopup}
            title="Update News"
            message={`Update the details for News: "${newsToEdit.judul_berita}"`}
            onConfirm={confirmEdit}
            initialHeadline={newsToEdit.judul_berita}
            initialContent={newsToEdit.isi_berita}
            styleType="update"
          />
        )}
        {showCreatePopup && (
          <PopUpNews
            openPopUp={showCreatePopup}
            closePopUp={closeCreatePopup}
            title="Create New News"
            message="Fill in the details for the new News."
            onConfirm={confirmCreate}
            initialHeadline={newNews.headline}
            initialContent={newNews.content}
            styleType="create"
          />
        )}
      </div>
      <div className='flex justify-center mt-5'>
        {currentPage > 1 && (
          <button
            onClick={handlePreviousPage}
            className=' '
            disabled={currentPage <= 1}
          >
            <MdNavigateBefore size={30} />
          </button>
        )}
        {currentPage < totalPages && (
          <button
            onClick={handleNextPage}
            className=''
            disabled={currentPage >= totalPages}
          >
            <MdNavigateNext size={30} />
          </button>
        )}
      </div>
    </div>
  );
};

export default News;
