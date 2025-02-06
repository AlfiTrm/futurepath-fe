import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaTrash, FaPencilAlt } from 'react-icons/fa';
import '../index.css';
import PopUp from '../layout/PopUp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken, getRoleId } from '../../../api/services/auth';

const FAQ = () => {
    const navigate = useNavigate();
    const [faqs, setFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [faqToDelete, setFaqToDelete] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [faqToEdit, setFaqToEdit] = useState(null);
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
    const [userRole, setUserRole] = useState(null);
    const [token, setToken] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchFAQs = async () => {
        const token = getToken();
        const role = getRoleId();
        setToken(token);
        setUserRole(role);
        if (!token || !role) {
            navigate('/signin');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/future-path/user/faq?page=${currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const fetchedFaqs = response.data.data || [];
            setFaqs(fetchedFaqs);
            localStorage.setItem('faqs', JSON.stringify(fetchedFaqs));
            setTotalPages(1);
            localStorage.setItem('faqs', JSON.stringify(fetchedFaqs));
            setTotalPages(1);
        } catch (error) {
            console.error("Error fetching FAQs:", error);
            const localFaqs = localStorage.getItem('faqs');
            if (localFaqs) {
                setFaqs(JSON.parse(localFaqs));
            }
        }
    };


    const confirmDelete = async () => {
        if (faqToDelete) {
            try {
                const token = getToken();
                const response = await axios.delete(`http://localhost:8080/future-path/admin/delete-faq/${faqToDelete.id_faq}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("Delete response:", response);
                setFaqs(faqs.filter((faq) => faq.id_faq !== faqToDelete.id_faq));
                localStorage.setItem('faqs', JSON.stringify(faqs.filter((faq) => faq.id_faq !== faqToDelete.id_faq)));
            } catch (error) {
                console.error("Error deleting FAQ:", error);
            }
        }
        closeDeletePopup();
    };

    const confirmEdit = async (question, answer) => {
        if (faqToEdit) {
            try {
                const token = getToken();
                await axios.patch(`http://localhost:8080/future-path/admin/update-faq/${faqToEdit.id_faq}`,
                    { judul_faq: question, isi_faq: answer }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const updatedFaqs = faqs.map((faq) =>
                    faq.id_faq === faqToEdit.id_faq ? { ...faq, judul_faq: question, isi_faq: answer } : faq
                );
                setFaqs(updatedFaqs);
                localStorage.setItem('faqs', JSON.stringify(updatedFaqs));
            } catch (error) {
                console.error("Error updating FAQ:", error);
            }
        }
        closeEditPopup();
    };

    const confirmCreate = async (question, answer) => {
        try {
            const token = getToken();
            const response = await axios.post(`http://localhost:8080/future-path/admin/create-faq`, {
                judul_faq: question,
                isi_faq: answer
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const newFaqData = { ...response.data.data, id_faq: response.data.data.id_faq };
            const updatedFaqs = [...faqs, newFaqData];
            console.log(newFaqData)
            console.log(response.data.data.id_faq)
            setFaqs(updatedFaqs);
            localStorage.setItem('faqs', JSON.stringify(updatedFaqs));
        } catch (error) {
            console.error("Error creating FAQ:", error);
        }
        closeCreatePopup();
    };

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const openDeletePopup = (faq) => {
        setFaqToDelete(faq);
        setShowDeletePopup(true);
    };

    const closeDeletePopup = () => {
        setShowDeletePopup(false);
        setFaqToDelete(null);
    };

    const openEditPopup = (faq) => {
        setFaqToEdit(faq);
        setShowEditPopup(true);
    };

    const closeEditPopup = () => {
        setShowEditPopup(false);
        setFaqToEdit(null);
    };

    const openCreatePopup = () => {
        setNewFaq({ question: '', answer: '' });
        setShowCreatePopup(true);
    };

    const closeCreatePopup = () => {
        setShowCreatePopup(false);
    };

    useEffect(() => {
        const localFaqs = localStorage.getItem('faqs');
        if (localFaqs) {
            setFaqs(JSON.parse(localFaqs));
        }
        fetchFAQs();
    }, []);


    return (
        <div id="add-btn" className="max-w-3xl mx-auto mt-20 p-5">
            <div className="mb-20 text-center">
                <h1 className="text-5xl font-bold text-black ">Frequently Asked Questions</h1>
                {userRole == 1 && (
                    <button onClick={openCreatePopup} className="mt-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-sky-700">
                        Tambah FAQ
                    </button>
                )}
            </div>

            {faqs.length === 0 ? (
                <div className='flex justify-center text-lg border p-5 rounded-md'>
                    <p>Data FAQ belum ada.</p>
                </div>
            ) : (
                faqs.map((faq, index) => (
                    <div key={faq.id_faq} className="bg-white shadow-md rounded mb-2">
                        <div
                            className="flex justify-between items-center p-4 cursor-pointer"
                            onClick={() => toggleAnswer(index)}
                        >
                            <h2 className="text-lg font-semibold ">{faq.judul_faq}</h2>
                            <FaChevronDown className={`transform transition-transform duration-500 text-blue-500 ${activeIndex === index ? 'rotate-180' : ''}`} />
                        </div>

                        {activeIndex === index && (
                            <div className="p-4 border-t border-gray-200 ">
                                <p>{faq.isi_faq}</p>
                                <div className="flex justify-end mt-2">
                                    {userRole == 1 && (
                                        <button onClick={() => openDeletePopup(faq)} className="bg-gray-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-400">
                                            <FaTrash />
                                        </button>
                                    )}
                                    {userRole == 1 && (
                                        <button onClick={() => openEditPopup(faq)} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-yellow-400">
                                            <FaPencilAlt />
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )))}

            {showDeletePopup && (
                <PopUp
                    openPopUp={showDeletePopup}
                    closePopUp={closeDeletePopup}
                    title="Confirm Deletion"
                    message={`Are you sure you want to delete FAQ: "${faqToDelete.judul_faq}"?`}
                    onConfirm={confirmDelete}
                    styleType="delete"
                />
            )}
            {showEditPopup && (
                <PopUp
                    openPopUp={showEditPopup}
                    closePopUp={closeEditPopup}
                    title="Update FAQ"
                    message={`Update the details for FAQ: "${faqToEdit.judul_faq}"`}
                    onConfirm={confirmEdit}
                    initialQuestion={faqToEdit.judul_faq}
                    initialAnswer={faqToEdit.isi_faq}
                    styleType="update"
                />
            )}
            {showCreatePopup && (
                <PopUp
                    openPopUp={showCreatePopup}
                    closePopUp={closeCreatePopup}
                    title="Create New FAQ"
                    message="Fill in the details for the new FAQ."
                    onConfirm={confirmCreate}
                    initialQuestion={newFaq.question}
                    initialAnswer={newFaq.answer}
                    styleType="create"
                />
            )}
        </div>
    );
};

export default FAQ;

