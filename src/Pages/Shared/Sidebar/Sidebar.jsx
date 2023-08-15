import React from 'react';
import { Link } from 'react-router-dom';
import { FaIdBadge, FaHistory, FaBookOpen, FaEdit, FaExpeditedssl, FaBook } from "react-icons/fa";
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { AiFillBell } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";

const Sidebar = () => {

    const { user } = useContext(AuthContext);

    const sideBarItems = <>
        <li><Link to='/profile' className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white px-5 py-2 rounded-lg'><FaIdBadge className='h-8 w-8' /> <span className='text-xl font-medium'>My Profile</span></Link></li>
        <li><Link className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white px-5 py-2 rounded-lg'><FaBookOpen className='h-8 w-8' /> <span className='text-xl font-medium'>Enrolled Course</span></Link></li>
        <li><Link className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white px-5 py-2 rounded-lg'><FaHistory className='h-8 w-8' /> <span className='text-xl font-medium'>Order History</span></Link></li>
        <li><Link to='/notice' className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white px-5 py-2 rounded-lg'> <AiFillBell className='h-8 w-8' /> <span className='text-xl font-medium'>Notice</span></Link></li>
        <li><Link className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white px-5 py-2 rounded-lg'><FaBook className='h-8 w-8' /> <span className='text-xl font-medium'>Resources</span></Link></li>
        <li><Link to='/classes' className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white px-5 py-2 rounded-lg'><SiGoogleclassroom className='h-8 w-8' /> <span className='text-xl font-medium'>Classes</span></Link></li>
        <li><Link to='/adminDashboard/adminHome' className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white py-1 px-5 rounded-lg'><span className='text-lg font-medium'>Admin Panel</span></Link></li>
    </>

    return (
        <div  data-aos="fade-right" data-aos-duration="3000" className='max-h-screen w-fit bg-indigo-100 px-5 py-10 lg:py-5 rounded-xl text-start mb-5 lg:mb-8'>
            <div className='flex flex-col items-center justify-center'>
                <div className='text-3xl w-fit h-fit font-bold bg-gradient-to-r from-indigo-500 to-purple-300 text-white rounded-lg text-center border-x-8 border-black mt-5'>
                    <a className="btn btn-ghost text-xs md:text-xl text-center lg:text-xl">Welcome<span className='font-bold text-xs md:text-xl lg:text-xl text-black'>{user ? user.displayName : 'Guest'}</span></a>
                </div>
                <div className='mt-8'>
                    <ul className='text-xl flex flex-col gap-5'>
                        {sideBarItems}
                    </ul>
                </div>
            </div>
            <hr className='h-3 bg-gradient-to-r from-indigo-300 to-purple-300 mt-5 w-full rounded-full' />
            {/* <div className='mt-5'>
                <h1 className='text-2xl font-bold bg-indigo-500 text-white rounded-full py-3 text-center border-b-4 border-black'>Account Settings</h1>
                <div className='mt-5'>
                    <ul className='text-xl flex flex-col gap-5'>
                        <li><Link className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white py-1 px-5 rounded-lg'> <FaEdit className='h-6 w-6' /> <span className='text-lg font-medium'>Edit Profile</span></Link></li>
                        <li><Link className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white py-1 px-5 rounded-lg'> <FaExpeditedssl className='h-6 w-6' /> <span className='text-lg font-medium'>Change Password</span></Link></li>
                        <li><Link to='/adminDashboard/adminHome' className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white py-1 px-5 rounded-lg'><span className='text-lg font-medium'>Admin Panel</span></Link></li>
                    </ul>
                </div>
            </div> */}
        </div>
    );
};

export default Sidebar;