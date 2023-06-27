import React from 'react';
import { FaUserAlt, FaLock, FaMailBulk } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SocialLogin from '../../components/SocialLogin';

const Register = () => {
    return (
        <div className='bg-gradient-to-b from-[#4169e1] to-indigo-100 h-screen flex items-center justify-center'>
            <div className='box-content h-fit w-96 p-10 bg-[#4169e1] bg-opacity-60 rounded-3xl shadow-slate-900 shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
                {/* Avatar Icon */}
                <div className='bg-[#4169e1] rounded-full h-32 w-32 flex items-center justify-center -mt-24 mx-auto shadow-2xl shadow-black'>
                    <FaUserAlt className='text-white shadow-2xl p-3 hover:-translate-y-6 shadow-black rounded-full ' size="5rem" />
                </div>
                {/* user Input Field */}
                <div className='mt-16 flex flex-col justify-center items-center gap-10'>
                    {/* User Name field */}
                    <div className='flex gap-3'>
                        <div className='bg-white w-12 flex items-center justify-center rounded-lg shadow-2xl shadow-black'>
                            <FaUserAlt size="1.7rem" className='text-[#4169e1] shadow-lg shadow-slate-600 rounded-full' />
                        </div>
                        <input type="text" name="userName" id="" className='bg-[#4169e1] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='User Name' />
                    </div>
                    {/* User email field */}
                    <div className='flex gap-3'>
                        <div className='bg-white w-12 flex items-center justify-center rounded-lg shadow-2xl shadow-black'>
                            <FaMailBulk size="1.7rem" className='text-[#4169e1] p-1 shadow-lg shadow-slate-600 rounded-full' />
                        </div>
                        <input type="email" name="userEmail" id="" className='bg-[#4169e1] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='User Email' />
                    </div>
                    {/* password field */}
                    <div className='flex gap-3'>
                        <div className='bg-white w-12 flex items-center justify-center rounded-lg shadow-2xl shadow-black'>
                            <FaLock size="1.7rem" className='text-[#4169e1] shadow-lg shadow-slate-600' />
                        </div>
                        <input type="password" name="userPass" id="" className='bg-[#4169e1] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='Password' />
                    </div>
                    <button className='bg-white px-6 py-2 rounded-2xl text-[#4169e1] font-bold text-3xl shadow-2xl shadow-black hover:bg-[#4169e1] hover:text-white transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-110 duration-300'>Sign-up</button>
                </div>
                <p className='text-center text-white mt-10'>Already have an Account? Please <Link to='/login'><span className='font-bold text-blue-700'>Sign-In</span></Link></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;