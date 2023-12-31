import React from 'react';
import { useContext } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin';
import { AuthContext } from '../../Providers/AuthProvider';

const Login = () => {

    const {signIn} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.userEmail.value;
        const password = form.userPass.value;
        // console.log(email, password);

        signIn(email, password)
        .then(result => {
            const loggedUser = result.user;
            Swal.fire({
                title: 'User Sign-In Successfully',
                icon: 'success',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            console.log(loggedUser);
            form.reset();
            navigate('/');
        })
    }

    return (
        <div className='bg-gradient-to-b from-[#120E43] to-indigo-100 h-screen flex items-center justify-center'>
            <div className='h-fit w-fit py-5 px-8 bg-[#120E43] bg-opacity-60 rounded-3xl shadow-slate-900 shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 md:hover:scale-110 duration-300 mt-10'>
                {/* Avatar Icon */}
                <div className='bg-[#120E43] rounded-full p-3 h-fit w-fit flex items-center justify-center -mt-20 mx-auto shadow-2xl shadow-black'>
                    <FaUserAlt className='text-white shadow-2xl p-3 hover:-translate-y-6 shadow-black rounded-full ' size="5rem" />
                </div>
                {/* user Input Field */}
                <form className='mt-10 flex flex-col justify-center items-center gap-10' onSubmit={handleLogin}>
                    {/* User email field */}
                    <div className='flex gap-3'>
                        <div className='bg-white w-12 flex items-center justify-center rounded-lg shadow-2xl shadow-black'>
                            <FaUserAlt size="1.7rem" className='text-[#120E43] shadow-lg shadow-slate-600 rounded-full' />
                        </div>
                        <input type="email" name="userEmail" id="" className='bg-[#120E43] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='User Email' />
                    </div>
                    {/* password field */}
                    <div className='flex gap-3'>
                        <div className='bg-white w-12 flex items-center justify-center rounded-lg shadow-2xl shadow-black'>
                            <FaLock size="1.7rem" className='text-[#120E43] shadow-lg shadow-slate-600' />
                        </div>
                        <input type="password" name="userPass" id="" className='bg-[#120E43] text-white placeholder-white px-5 py-3 rounded-lg shadow-2xl shadow-black' placeholder='Password' />
                    </div>
                    <button className='bg-white px-6 py-2 rounded-2xl text-[#120E43] font-bold text-3xl shadow-2xl shadow-black hover:bg-[#120E43] hover:text-white  transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-110 duration-300'>Sign-in</button>
                </form>
                <p className='text-center text-white mt-10'>First time in this site? Please <Link to='/register'><span className='font-bold text-blue-900'>Sign-up</span></Link></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;