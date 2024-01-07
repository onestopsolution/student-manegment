import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo/logo-removebg-preview (1).png'
import { AiFillBell } from "react-icons/ai";
import { FaHome, FaBook } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaIdBadge } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { RiLogoutCircleLine } from "react-icons/ri";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(result => {
                Swal.fire(
                    'Sign-Out!',
                    'User Logout Successfully!',
                    'success'
                )
            })
            .catch(error => console.log(error))
    }

    const navItems = <>
        <li><Link><FaHome className='text-xl'/><span className='font-semibold'>Home</span></Link></li>
        <li><Link to='/resources'><FaBook className='text-xl'/><span className='font-semibold'>Resources</span></Link></li>
        <li><Link to='/classes'><SiGoogleclassroom className='text-xl'/><span className='font-semibold'>Classes</span></Link></li>
        <li><Link to='/cardre'><BiSolidReport className='text-xl'/><span className='font-semibold'>Statistics</span></Link></li>
        <li className='flex lg:hidden'><Link to='/profile'><FaIdBadge className='text-xl'/><span className='font-semibold'>Profile</span></Link></li>
        <button onClick={handleLogout} className='bg-gradient-to-r from-[#B721FF] to-[#21D4FD] text-white py-2 px-1 rounded-full flex gap-1 items-center justify-center lg:hidden'><RiLogoutCircleLine className='text-lg'/><span className='font-semibold'>Logout</span></button>
    </>

    return (
        <div className="navbar bg-gradient-to-r from-[#8EC5FC] to-[#E0C3FC] bg-opacity-90">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] py-5 px-2 shadow bg-gradient-to-r from-[#8EC5FC] to-[#E0C3FC] rounded-box w-32 flex flex-col gap-3">
                        {navItems}
                    </ul>
                </div>
                <div className='flex items-center'>
                    <img src={logo} alt="" className='h-10' />
                    <h1 className='uppercase font-bold text-xl hidden lg:flex'><span className='text-slate-400'>one</span><span className='text-blue-900'>stop</span> -Solution</h1>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <Link to='/notice'>
                    <button className="btn-circle mr-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                        <AiFillBell className='h-8 w-8 text-indigo-700' />
                    </button>
                </Link>
                {
                    user ? <>
                        <div className='w-fit h-fit font-bold bg-gradient-to-r from-[#B721FF] to-[#21D4FD] text-white rounded-lg text-center border-x-4 border-black'>
                            <a className="btn btn-ghost text-xs md:text-md text-center lg:text-lg"><span className='hidden md:flex'>Welcome</span><span className='font-bold text-xs md:text-md lg:text-lg text-black'>{user ? user.displayName : 'Guest'}</span></a>
                        </div>
                    </> : <>
                        <Link to='/login'>
                            <button className='btn btn-outline border-black text-black hover:bg-base-100 hover:text-white'><span>Sign-In</span> <FaSignInAlt /></button>
                        </Link>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;