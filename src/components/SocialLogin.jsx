import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { FaGoogle, FaFacebook, FaPeopleArrows } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Providers/AuthProvider';

const SocialLogin = () => {

    const [error, setError] = useState('');

    const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
console.log(location);
console.log( from)
    const { signInWithGoogle, signInWithFacebook, signInWithGuest } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            // .then(result => {
            //     const user = result.user;
            //     Swal.fire({
            //         title: 'User Sign-In Successfully',
            //         icon: 'success',
            //         showClass: {
            //             popup: 'animate__animated animate__fadeInDown'
            //         },
            //         hideClass: {
            //             popup: 'animate__animated animate__fadeOutUp'
            //         }
            //     })
            //     console.log(user);
            //     setError('');
            //     navigate('/');
            // })
            // .catch(error => {
            //     console.log(error);
            //     setError(error.message);
            // })
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
                fetch(' https://asteriactg.com/user', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
    }

    const handleFacebookLogin = () => {
        signInWithFacebook()
            .then(result => {
                const user = result.user;
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
                console.log(user);
                setError('');
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
            })
    }

    const handleGuestLogin = () => {
        signInWithGuest()
        .then(result => {
            const user = result.user;
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
            console.log(user);
            navigate('/');
        })
        .catch(error => console.log(error))
    }

    return (
        <div className='mt-5'>
            <p className='text-center text-red-500'>{error}</p>
            <div className='flex items-center gap-3 mx-3'>
                <hr className='w-1/2' />
                <p className='text-white font-bold'>Or</p>
                <hr className='w-1/2' />
            </div>
            <h1 className='text-center text-white mt-5 font-semibold'>Sign-In with</h1>
            <div className='flex justify-center gap-5 mt-5'>
                <button className='bg-[#120E43] p-5 rounded-full text-white text-xl shadow-inner shadow-white hover:bg-white hover:text-[#120E43] transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-110 duration-300' onClick={handleGoogleSignIn}><FaGoogle /></button>
                <button className='bg-[#120E43] p-5 rounded-full text-white text-xl shadow-inner shadow-white hover:bg-white hover:text-[#120E43]  transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-110 duration-300' onClick={handleFacebookLogin}><FaFacebook /></button>
                <button className='bg-[#120E43] p-5 rounded-full text-white text-xl shadow-inner shadow-white hover:bg-white hover:text-[#120E43]  transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-110 duration-300' disabled onClick={handleGuestLogin}><FaPeopleArrows /></button>
            </div>
        </div>
    );
};

export default SocialLogin;