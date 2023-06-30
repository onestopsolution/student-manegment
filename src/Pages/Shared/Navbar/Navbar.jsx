import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);

    const navItems = <>
        < li > <a>Item 1</a></li>
        <li>

        </li>
        <li><a>Item 3</a></li>
    </>

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

    return (
        <div className="navbar bg-indigo-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-indigo-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xs md:text-xl lg:text-xl"><span className='font-bold text-xs md:text-xl lg:text-xl text-blue-600'>Welcome</span>{user ? user.displayName : 'Guest'}</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <button className='btn btn-error text-white' onClick={handleLogout}><span>Sign-Out</span><FaSignOutAlt /></button>
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