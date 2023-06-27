import React from 'react';
import { FaGoogle, FaFacebook } from "react-icons/fa";

const SocialLogin = () => {
    return (
        <div className='mt-5'>
           <div className='flex items-center gap-3'>
                <hr className='w-1/2' />
                <p className='text-white'>Or</p>
                <hr className='w-1/2' />
           </div>
           <h1 className='text-center text-white mt-3'>Sign-In with</h1>
           <div className='flex justify-center gap-5 mt-3'>
                <button className='bg-[#4169e1] p-5 rounded-full text-white text-xl shadow-inner shadow-white hover:bg-white hover:text-[#4169e1] transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-110 duration-300'><FaGoogle/></button>
                <button className='bg-[#4169e1] p-5 rounded-full text-white text-xl shadow-inner shadow-white hover:bg-white hover:text-[#4169e1]  transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-110 duration-300'><FaFacebook/></button>
                <button className='bg-[#4169e1] p-5 rounded-full text-white text-xl shadow-inner shadow-white hover:bg-white hover:text-[#4169e1]  transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-110 duration-300'><FaFacebook/></button>
           </div>
        </div>
    );
};

export default SocialLogin;