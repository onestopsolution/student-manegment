import React from 'react';
import { Link } from 'react-router-dom';
import { FaIdBadge, FaHistory, FaBookOpen, FaEdit, FaExpeditedssl } from "react-icons/fa";
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const Sidebar = () => {

    const { user } = useContext(AuthContext);

    const sideBarItems = <>
        <li><Link className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white px-5 py-3 rounded-lg'> <FaIdBadge className='h-8 w-8' /> <span className='text-xl font-medium'>My Profile</span></Link></li>
        <li><Link className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white px-5 py-3 rounded-lg'> <FaBookOpen className='h-8 w-8' /> <span className='text-xl font-medium'>Enrolled Course</span></Link></li>
        <li><Link className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white px-5 py-3 rounded-lg'> <FaHistory className='h-8 w-8' /> <span className='text-xl font-medium'>Order History</span></Link></li>
    </>

    return (
        <div className='min-h-screen bg-indigo-100 px-10 py-10 rounded-xl text-start'>
            <div className='flex flex-col items-center'>
                <div className='text-3xl w-fit h-fit font-bold bg-indigo-500 text-white rounded-lg text-center border-x-8 border-black'>
                    <a className="btn btn-ghost text-xs md:text-xl text-center lg:text-xl">Welcome<span className='font-bold text-xs md:text-xl lg:text-xl text-blue-900'>{user ? user.displayName : 'Guest'}</span></a>
                </div>
                <div className='mt-10'>
                    <ul className='text-xl flex flex-col gap-5'>
                        {sideBarItems}
                    </ul>
                </div>
            </div>
            <hr className='h-1 bg-black my-10' />
            <div className='mt-5'>
                <h1 className='text-2xl font-bold bg-indigo-500 text-white rounded-full py-3 text-center border-b-4 border-black'>Account Settings</h1>
                <div className='mt-8'>
                    <ul className='text-xl flex flex-col gap-5'>
                        <li><Link className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white py-3 px-5 rounded-lg'> <FaEdit className='h-8 w-8' /> <span className='text-xl font-medium'>Edit Profile</span></Link></li>
                        <li><Link className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white py-3 px-5 rounded-lg'> <FaExpeditedssl className='h-8 w-8' /> <span className='text-xl font-medium'>Change Password</span></Link></li>
                        <li><Link to='/adminDashboard/adminHome' className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white py-3 px-5 rounded-lg'><span className='text-xl font-medium'>Admin Panel</span></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;