import React, { useState } from 'react';
import { login } from '../api';
import GoogleLogo from '../assets/Googlelogo.png';
import { useNavigate } from 'react-router-dom';
import { BiHide, BiShowAlt } from "react-icons/bi";

const SignIn = () => {
    const navigate = useNavigate();
    const [email_user, setEmail] = useState('');
    const [password_user, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(email_user, password_user);
            navigate('/home');
        } catch (err) {
            console.error(err);
            if (err.response) {
                setError('Login failed: ' + (err.response.data.message || 'Unknown error'));
            } else {
                setError('Login failed: Network error');
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row max-h-screen">
            <div className='hidden md:flex w-8/12 min-h-screen flex-col items-center justify-center relative bg-blue-500'>
                <div className='mt-20 mr-5 flex-col'>
                    <h1 className="flex items-center text-white text-7xl font-bold w-[400px]">HALO FUTUREPATH!</h1>
                    <h1 className="text-white font-thin w-[450px] my-10">"Carilah jalanmu, temukan pilihan terbaikmu, dan wujudkan masa depanmu bersama FuturePath!"</h1>
                </div>
                <div className="pb-">
                    <h3 className='text-white mt-40 items-end font-extralight text-sm'>Created by Kelompok 7</h3>
                </div>
            </div>

            <div className='w-full md:w-1/2 flex flex-col p-5 md:p-10'>
                <h1 className="text-blue-600 text-2xl text-center mb-10 font-black">FUTUREPATH</h1>
                <div className="bg-white border p-7 rounded-xl w-full max-w-md mx-auto">
                    <h2 className="text-black text-xl text-center font-medium">Masuk</h2>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-500" htmlFor="email"></label>
                            <input
                                type="email"
                                id="email"
                                value={email_user}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="border rounded-lg w-full p-2 focus:outline-none focus:transition-none"
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-gray-500" htmlFor="password"></label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password_user}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="border rounded-lg w-full p-2 focus:outline-none focus:transition-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-2 text-gray-500">
                                {showPassword ? <BiHide size={25} /> : <BiShowAlt size={25} />}
                            </button>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 active:translate-y-2">
                            Masuk
                        </button>
                        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}

                        <p className="mt-4 text-center">
                            Belum punya akun? <a className="text-blue-600 hover:underline" href="/signup">Daftar</a>
                        </p>

                        <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-5 after:flex-1 after:border-t after:border-gray-200 after:ms-6">atau</div>
                        <p className="text-center">Masuk dengan</p>
                        <div className="flex justify-center mt-1">
                            <button className="flex items-center justify-center w-full bg-white rounded mt-1 -mb-1">
                                <img src={GoogleLogo} alt="Google Logo" className="h-7" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
