import React, { useState } from 'react';
import GoogleLogo from '../assets/Googlelogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { BiHide, BiShowAlt } from "react-icons/bi";
import { register } from '../api';

const SignUp = () => {
    const navigate = useNavigate();
    const [nama_user, setUsername] = useState('');
    const [email_user, setEmail] = useState('');
    const [password_user, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password_user !== confirmPassword) {
            setError('Password tidak sesuai');
            return;
        } else if (password_user.length < 8) {
            setError('Password minimal 8 karakter');
        } 

        try {
            await register(nama_user, email_user, password_user);
            navigate('/signin');

        } catch (err) {
            console.error(err);
            if (err.response) {
                if (password_user !== confirmPassword) {
                    setError('Password tidak sesuai');
                } else if (password_user.length < 8) {
                    setError('Password minimal 8 karakter');
                }
            }
            else {
                setError('Login failed: Network error');
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row max-h-screen">
            <div className='hidden md:flex w-8/12 min-h-screen flex-col items-center justify-center relative bg-blue-600'>
                <div className='mt-20 mr-5'>
                    <h1 className="text-white text-7xl font-bold w-[400px]">
                        HALO FUTUREPATH!
                    </h1>
                    <h1 className="text-white font-thin w-[400px] my-10">
                        "Carilah jalanmu, temukan pilihan terbaikmu, dan wujudkan masa depanmu bersama FuturePath!"
                    </h1>
                </div>
                <div className="pb-">
                    <h3 className='text-white mt-40 items-end font-extralight text-sm'>
                        Created by Alfi Tsani
                    </h3>
                </div>
            </div>

            <div className='w-full md:w-1/2 flex flex-col p-5 md:p-10'>
                <h1 className="text-blue-600 text-2xl text-center mt-20 mb-10 font-bold">FUTUREPATH</h1>
                <div className="bg-white border p-7 rounded-xl w-full max-w-md mx-auto">
                    <h2 className="text-black text-xl text-center font-medium">Register</h2>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-500" htmlFor="nama_user"></label>
                            <input
                                type="text"
                                id="nama_user"
                                value={nama_user}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                                className="border rounded-lg w-full p-2 focus:outline-none focus:transition-none"
                            />
                        </div>
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
                        <div className="mb-4 relative">
                            <label className="block text-gray-500" htmlFor="confirmPassword"></label>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                required
                                className="border rounded-lg w-full p-2 focus:outline-none focus:transition-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-2 text-gray-500"
                            >
                                {showConfirmPassword ? <BiHide size={25} /> : <BiShowAlt size={25} />}
                            </button>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 active:translate-y-2">
                            Register
                        </button>
                        {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}

                        <p className="mt-4 text-center">
                            Sudah punya akun? <a className="text-blue-600 hover:underline" href="/signin">Login</a>
                        </p>

                        <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-5 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:before:border-gray-300 dark:after:border-gray-300">atau</div>
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

export default SignUp;
