import React from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';

const Login = () => {
    return (
        <div className='bg-gradient-to-b from-[#4169e1] to-indigo-100 h-screen flex items-center justify-center'>
            <div className='box-content h-96 w-96 p-5 bg-[#4169e1] bg-opacity-60 rounded-3xl shadow-2xl shadow-slate-500'>
                {/* Avatar Icon */}
                <div className='bg-[#4169e1] rounded-full h-32 w-32 flex items-center justify-center -mt-24 mx-auto shadow-2xl shadow-black'>
                    <FaUserAlt className='text-white shadow-lg shadow-slate-700 rounded-full ' size="5rem" />
                </div>
                {/* user Input Field */}
                <div className='mt-16 flex flex-col justify-center items-center gap-10'>
                    {/* User Name field */}
                    <div className='flex gap-3'>
                        <div className='bg-white w-12 flex items-center justify-center rounded-lg shadow-2xl shadow-black'>
                            <FaUserAlt size="1.7rem" className='text-[#4169e1] shadow-lg shadow-slate-600 rounded-full'/>
                        </div>
                        <input type="text" name="userName" id="" className='bg-[#4169e1] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='Username' />
                    </div>
                    {/* password field */}
                    <div className='flex gap-3'>
                        <div className='bg-white w-12 flex items-center justify-center rounded-lg shadow-2xl shadow-black'>
                            <FaLock size="1.7rem" className='text-[#4169e1] shadow-lg shadow-slate-600'/>
                        </div>
                        <input type="password" name="userPass" id="" className='bg-[#4169e1] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='Password' />
                    </div>
                    <button className='bg-white px-8 py-3 rounded-2xl text-[#4169e1] font-bold text-3xl shadow-2xl shadow-black hover:bg-[#4169e1] hover:text-white'>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;