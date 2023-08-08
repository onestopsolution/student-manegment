import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaUsers, FaClipboardList, FaHospitalUser, FaBars } from "react-icons/fa";
import { AiTwotoneNotification } from "react-icons/ai";
import { TbCalendarDue } from "react-icons/tb";

const AdminLayout = () => {

    const navItems = <>
        <li><Link to='/adminDashboard/adminHome'><FaHome />Home</Link></li>
        <li><Link to='/adminDashboard/manageUsers'><FaUsers />Manage Users</Link></li>
        <li><Link to='/adminDashboard/manageCourses'><FaClipboardList />Manage Courses</Link></li>
        <li><Link to='/adminDashboard/noticeSend'><AiTwotoneNotification />Send Notice</Link></li>
        <li><Link to='/adminDashboard/pendingDue'><TbCalendarDue />Pending Due</Link></li>
        <li><Link to='/'><FaHospitalUser />User Home</Link></li>
    </>

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet></Outlet>

                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden fixed bottom-0 left-0 mb-5 ml-5"><FaBars /></label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    <div className='my-10 bg-indigo-500 text-white py-3 rounded-full'>
                        <h1 className='text-center text-3xl font-bold'>Admin</h1>
                    </div>
                    {/* Sidebar content here */}
                    {navItems}
                </ul>

            </div>
        </div>
    );
};

export default AdminLayout;