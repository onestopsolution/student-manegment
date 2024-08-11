import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaIdBadge, FaHistory, FaBookOpen, FaEdit, FaExpeditedssl, FaBook } from "react-icons/fa";
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { AiFillBell } from "react-icons/ai";
import { BiSolidReport } from "react-icons/bi";
import { RiLogoutCircleLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import { PiArrowFatLineDownFill } from "react-icons/pi";
import { useQuery } from '@tanstack/react-query';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isStudentUser, setIsStudentUser] = useState(true); // Default to student user
    const [isAdmin, setIsAdmin] = useState(false); // Check if user is admin

    // const { data: users = [], refetch } = useQuery(['user'], async () => {
    //     const res = await fetch(' https://intern-first-server-ashy.vercel.app/user')
    //     return res.json();
    //   })
    //   console.log(users);

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

    const sideBarItems = (
        <>
            {isStudentUser && (
                <>

                    <li><Link to='/profile' className='flex items-center gap-3 hover:text-white text-black px-5 py-0 lg:py-3 rounded-xl'><FaIdBadge className='h-8 w-8' /></Link></li>

                    <li><Link to='/notice' className='flex items-center gap-3  hover:text-white text-black px-5 py-0 lg:py-3 rounded-xl'> <AiFillBell className='h-8 w-8' /></Link></li>

                    <li><Link to='/resources' className='flex items-center gap-3  hover:text-white text-black px-5 py-0 lg:py-3 rounded-xl'><FaBook className='h-8 w-8' /></Link></li>

                    <li><Link to='/cardre' className='flex items-center gap-3  hover:text-white text-black px-5 py-0 lg:py-3 rounded-xl'><BiSolidReport  className='h-8 w-8' /></Link></li>
                    {/* <li><Link className='flex items
                    -center gap-3 hover:bg-indigo-500 hover:text-white px-5 py-2 rounded-lg'><FaBookOpen className='h-8 w-8' /> <span className='text-xl font-medium'>Enrolled Course</span></Link></li>
        <li><Link className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white px-5 py-2 rounded-lg'><FaHistory className='h-8 w-8' /> <span className='text-xl font-medium'>Order History</span></Link></li> */}


                    {/* <li><Link to='/classes' className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white px-5 py-3 rounded-lg'><SiGoogleclassroom className='h-8 w-8' /> <span className='text-xl font-medium'>Classes</span></Link></li> */}

                    <button onClick={handleLogout} className='flex items-center gap-3  hover:text-white text-black px-5 py-0 lg:py-3 rounded-xl mt-0 lg:mt-28'><RiLogoutCircleLine className='h-8 w-8' /></button>
                </>
            )}

            {/* {isAdmin && (`
                <li>
                    <Link to='/adminDashboard/adminHome' className='flex items-center gap-3 hover:bg-indigo-500 hover:text-white py-1 px-5 rounded-lg'>
                        <span className='text-lg font-medium'>Admin Panel</span>
                    </Link>
                </li>
            )} */}
        </>
    );

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from the provided URL
        fetch(`https://asteriactg.com/user/admin/${user?.email}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.length === 0) {
                    setIsStudentUser(true);
                }
                console.log(user)
                // Check if the user is an admin based on their username and password
                if (data.role === 'Admin') {
                    //setIsAdmin(true);
                    navigate('/adminDashboard/adminHome')
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div data-aos="fade-right" data-aos-duration="3000" className='max-h-screen w-fit bg-gradient-to-t from-[#0093E9] to-[#80D0C7] bg-opacity-50 px-5 lg:px-0 py-0 lg:py-5 rounded-3xl text-start mb-5 lg:mb-8 mt-0 lg:mt-8 hidden lg:flex border-x-8 lg:border-x-0  lg:border-y-8 border-black'>
            <div className='flex flex-col items-center justify-center'>
                {/* <div className='mt-5'>
                    <PiArrowFatLineDownFill className='text-indigo-300 text-3xl' />
                </div> */}
                {/* <hr className='h-3 bg-gradient-to-r from-indigo-300 to-purple-300 w-full rounded-full mt-3' /> */}
                <div className='my-8'>
                    <ul className='text-xl flex lg:flex-col gap-5'>
                        {sideBarItems}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
