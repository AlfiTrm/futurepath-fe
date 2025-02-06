import React from 'react'
import Instagram from '../images/ig1.svg'

const Footer = () => {
    return (
        <div className='w-full mt-28'>
            <div className='shadow-3xl rounded-t-3xl text-white bg-blue-500'>
                <div className='p-10'>
                    <div className='flex justify-center mb-10'>
                        <div className='mx-5'>
                            <h1 className='font-bold text-2xl border-r-2'>FUTUREPATH</h1>
                        </div>
                        <div className='w-[200px] font-light text-sm mx-5'>
                            <h2>Tempat mencari sekolah untuk masa depanmu.</h2>
                        </div>

                    </div>
                    <div className='flex justify-evenly'>
                        <div>
                            <div className='text-sm leading-10 '>
                                <h3>
                                    <h3>
                                        Muhammad Alfi Tsani Ramadhan - FrontEnd
                                    </h3>
                                    Azmi Al Ghifari Rahman - BackEnd
                                </h3>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-center mb-5 font-semibold'>
                                <h2>
                                    Tentang Developer
                                </h2>
                            </div>
                            <div className='text-sm '>
                                <div className='flex align-middle'>
                                    <img src={Instagram} alt="" className='w-10' />
                                    <a href="https://www.instagram.com/zmi.alghifari/">
                                        <h3 className='p-2'>
                                            zmi.alghifari
                                        </h3>
                                    </a>
                                </div>
                                <div className='flex align-middle'>
                                    <img src={Instagram} alt="" className='w-10' />
                                    <a href="https://www.instagram.com/alfi_tsan/">
                                        <h3 className='p-2'>
                                            alfi_tsan
                                        </h3>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='flex justify-between mb-20'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
