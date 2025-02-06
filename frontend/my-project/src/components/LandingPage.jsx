import { React } from 'react';
import { Link } from 'react-router-dom';
import ManWithLamp from '../images/ManWithLamp.svg';
import { FaSchool } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LandingPage = () => {
    const timeline = gsap.timeline({
        repeat: -1, repeatDelay: 1, yoyo: true
    });

    useGSAP(() => {
        timeline.to('#blue-cards', {
            duration: 2,
            ease: 'back.inOut'
        });

        timeline.to('#blue-cards2', {
            duration: 2,
            ease: 'back.inOut'
        });

        timeline.to('#blue-cards3', {
            duration: 2,
            ease: 'back.inOut'
        });

        gsap.from('.heading', {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: 'power2.out'
        });

        gsap.from('button', {
            opacity: 0,
            duration: 1,
            ease: 'back.in',
        });

        gsap.from('img', {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: 'back.in',
        });
    }, []);

    return (
        <div>
            <div className='bg-blue-500 rounded-br-[30%]'>
                <div className='flex flex-col md:flex-row items-end p-5'>
                    <div className='space-y-10'>
                        <h1 className='heading text-5xl md:text-7xl text-white mt-20 cursor-grab font-black'>
                            CARI, PILIH, dan TEMUKAN SEKOLAHMU
                        </h1>
                        <div className='font-medium text-lg w-full md:w-[700px] text-white'>
                            <h1>"Bangun masa depan yang lebih cerah dan Rencanakan langkah pendidikanmu</h1>
                            <p>meraih impianmu Bersama FuturePath"</p>
                        </div>
                        <div>
                            <Link to="/signup">
                                <button className='flex items-center justify-center gap-1 py-3 w-full md:w-[40%] rounded-md border font-semibold text-blue-500 bg-white hover:bg-gray-200'>
                                    <FaSchool size={15} />
                                    Explores
                                </button>
                            </Link>
                        </div>
                    </div>
                    <img src={ManWithLamp} alt="ManWithBook" className='h-96 md:mr-36 w-full md:w-auto' />
                </div>
            </div>
            <div className='h-auto relative'>
                <div className='flex justify-center mt-10'>
                    <h1 className='p-2 font-black text-xl text-blue-600'>
                        Fitur
                    </h1>
                </div>
                <div className='flex flex-wrap justify-center mt-10 space-x-5'>
                    <div id="blue-cards" className='border p-2 shadow-md hover:bg-blue-500 hover:scale-105 w-full sm:w-[250px] text-blue-500 hover:text-white rounded-[10%] mb-4'>
                        <div className='flex-col m-10 ml-5 space-y-5 items-center'>
                            <IoNewspaper className='border-2 rounded-full p-2' size={40} />
                            <h1 className='flex font-bold'>News</h1>
                            <p className='text-sm'>Fitur ini memiliki fungsi untuk menyediakan berita dari sekolah-sekolah.</p>
                        </div>
                    </div>
                    <div id='blue-cards2' className='bg-blue-500 w-full sm:w-[250px] h-[300px] text-white rounded-[10%] mb-4'>
                        <div className='flex-col m-10 ml-5 space-y-5 items-center'>
                            <IoNewspaper className='border-2 rounded-full p-2' size={40} />
                            <h1 className='flex font-bold'>News</h1>
                            <p className='text-sm'>Fitur ini memiliki fungsi untuk menyediakan berita dari sekolah-sekolah.</p>
                        </div>
                    </div>
                    <div id='blue-cards3' className='bg-blue-500 w-full sm:w-[250px] h-[300px] text-white rounded-[10%] mb-4'>
                        <div className='flex-col m-10 ml-5 space-y-5 items-center'>
                            <IoNewspaper className='border-2 rounded-full p-2' size={40} />
                            <h1 className='flex font-bold'>News</h1>
                            <p className='text-sm'>Fitur ini memiliki fungsi untuk menyediakan berita dari sekolah-sekolah.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
