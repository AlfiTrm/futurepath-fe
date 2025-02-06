import React, { useState } from 'react';

const PopUpNews = ({ openPopUp, closePopUp, title, message, onConfirm, initialHeadline = '', initialContent = '', styleType }) => {
  const [headline, setHeadline] = useState(initialHeadline);
  const [content, setContent] = useState(initialContent);

  const handleClosePopUp = (e) => {
    if (e.target.id === 'modalContainer') {
      closePopUp();
    }
  };

  if (!openPopUp) return null;

  const styles = {
    default: 'bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-1/3',
    create: 'bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-1/3',
    update: 'bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-1/3',
    delete: 'bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-1/3',
  };

  return (
    <div
      id='modalContainer'
      onClick={handleClosePopUp}
      className='fixed inset-0 bg-black bg-opacity-50 flex backdrop-blur-sm justify-center items-center'
    >
      <div className={styles[styleType] || styles.default}>
        <h2 className='text-xl font-semibold text-center'>{title}</h2>
        <p className='mt-4 text-center'>{message}</p>
        <div className='mt-4'>
          {styleType !== 'delete' && (
            <>
              <input
                type='text'
                placeholder='Headline'
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className='border border-gray-300 rounded w-full p-2 mb-2'
              />
              <textarea
                placeholder='Content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className='border border-gray-300 rounded w-full p-2'
                rows='4'
              />
            </>
          )}
        </div>
        <div className='flex justify-end mt-4'>
          <button
            onClick={closePopUp}
            className='bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600'
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(headline, content)}
            className={`text-white px-4 py-2 rounded hover:bg-opacity-80 ${styleType === 'delete' ? 'bg-red-500' : 'bg-blue-500'}`}
          >
            {styleType === 'delete' ? 'Delete' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpNews;