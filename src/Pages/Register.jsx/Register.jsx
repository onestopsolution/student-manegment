import { updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useContext } from 'react';
import { FaUserAlt, FaLock, FaMailBulk, FaImage } from 'react-icons/fa';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin';
import { AuthContext } from '../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { createUser, update } = useContext(AuthContext);

        console.log("login page location", location);
        const from =  location.state?.from?.pathname || "/";
     console.log(from)
        

        const onSubmit = data => {
            console.log(data);
            createUser(data.email, data.password)
                .then(result => {
                    const loggedUser = result.user;
                    console.log(loggedUser);
                    
                    
                    update(data.name, data.photoURL)
                        .then(() =>{
                            const saveUser = { name: data.name, email: data.email }
                            fetch('https://intern-first-server-farjanaakterlaila.vercel.app/user', {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(saveUser)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.insertedId) {
                                        reset();
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'User created successfully.',
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        navigate(from, { replace: true });
                                    }
                                })
                        })
                        .catch(error => console.log(error));
                })
                .catch(error => {
                    console.log(error);
                    if (error.code === 'auth/email-already-in-use') {
                        setError('Email is already in use');
                    } else {
                        setError(error.message);
                    }
                });
        };

  

    return (
        <div className='min-h-screen min-w-full bg-gradient-to-b from-[#120E43] to-indigo-100 flex items-center justify-center'>
            <div className='h-fit w-fit px-8 py-10 bg-[#120E43] bg-opacity-60 rounded-3xl shadow-slate-900 shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 md:hover:scale-110 duration-300 mt-40 mb-10'>
                {/* Avatar Icon */}
                <div className='bg-[#120E43] rounded-full h-fit w-fit p-5 flex items-center justify-center -mt-24 mx-auto shadow-2xl shadow-black'>
                    <FaUserAlt className='text-white shadow-2xl p-3 hover:-translate-y-6 shadow-black rounded-full ' size="5rem" />
                </div>
                {/* user Input Field */}
                <form onSubmit={handleSubmit(onSubmit)} className='mt-16 flex flex-col justify-center items-center gap-10' >
                    {/* User Name field */}
                    <div className='flex gap-3'>
                        <div className='bg-white w-12 flex items-center justify-center rounded-lg shadow-2xl shadow-black'>
                            <FaUserAlt size="1.7rem" className='text-[#120E43] shadow-lg shadow-slate-600 rounded-full' />
                        </div>
                        {/* <input type="text" name="userName" id="" className='bg-[#120E43] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='User Name' /> */}
                        <input type="text"  {...register("name", { required: true })} name="name" className='bg-[#120E43] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='User Name' />
                    </div>
                    {/* User email field */}
                    <div className='flex gap-3'>
                        <div className='bg-white w-12 flex items-center justify-center rounded-lg shadow-2xl shadow-black'>
                            <FaMailBulk size="1.7rem" className='text-[#120E43] p-1 shadow-lg shadow-slate-600 rounded-full' />
                        </div>
                        {/* <input type="email" name="userEmail" id="" className='bg-[#120E43] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='User Email' /> */}
                        <input type="email"  {...register("email", { required: true })} name="email" className='bg-[#120E43] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='User Email' />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>
                    {/* User photo field */}
                    <div className='flex gap-3'>
                        <div className='bg-white w-12 flex items-center justify-center rounded-lg shadow-2xl shadow-black'>
                            <FaImage size="1.7rem" className='text-[#120E43] p-1 shadow-lg shadow-slate-600 rounded-full' />
                        </div>
                        {/* <input type="text" name="userPhoto" id="" className='bg-[#120E43] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='User Picture' /> */}
                        <input type="text"  {...register("photoURL", { required: true })} className='bg-[#120E43] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='User Picture' />
                        {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                    </div>
                    {/* password field */}
                    <div className='flex gap-3'>
                        <div className='bg-white w-12 flex items-center justify-center rounded-lg shadow-2xl shadow-black'>
                            <FaLock size="1.7rem" className='text-[#120E43] shadow-lg shadow-slate-600' />
                        </div>
                        {/* <input type="password" name="userPass" id="" className='bg-[#120E43] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='Password' /> */}
                        <input type="password"  {...register("password", {
                            required: true,
                        })} className='bg-[#120E43] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='Password' />
                    </div>
                    <button className='bg-white px-6 py-2 rounded-2xl text-[#120E43] font-bold text-3xl shadow-2xl shadow-black hover:bg-[#120E43] hover:text-white transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-110 duration-300'>Sign-up</button>
                </form>
                <p className='text-center text-white mt-10'>Already have an Account? Please <Link to='/login'><span className='font-bold text-blue-900'>Sign-In</span></Link></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;