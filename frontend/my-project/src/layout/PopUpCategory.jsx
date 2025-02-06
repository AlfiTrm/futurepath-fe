import React, { useState, useRef, useEffect } from 'react';

const PopUpCategory = () => {
    const [isOpen, setIsOpen] = useState(false);
    const PopUpSearchRef = useRef(null);

    const togglePopUpSearch = () => {
        setIsOpen(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (PopUpSearchRef.current && !PopUpSearchRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (

        <div className="relative inline-block text-left" ref={PopUpSearchRef}>
            <form>
                <div class="flex">
                    <button
                        onClick={togglePopUpSearch}
                        id="dropdown-button" data-dropdown-toggle="dropdown" class="p-2 flex-shrink-0 z-10 inline-flex items-center px-5 text-sm font-medium text-center text-white bg-gray-400 rounded-lg hover:bg-sky-800 focus:outline-none focus:ring-sky-700" 
                        type="button">
                            Kategori 
                            <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg></button>
                </div>
            </form>

            {isOpen && (
                <div className="z-10 absolute right-34 w-36 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                    <ul className="py-2 text-sm text-gray-700">
                        <li>
                            <a href="/negeri" className="block px-4 py-2 hover:bg-sky-700 hover:text-white">Negeri</a>
                        </li>
                        <li>
                            <a href="/swasta" className="block px-4 py-2 hover:bg-sky-700 hover:text-white">Swasta</a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PopUpCategory;