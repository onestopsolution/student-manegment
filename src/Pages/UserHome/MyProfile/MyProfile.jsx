import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const MyProfile = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className='flex mt-10 lg:mt-0 flex-col lg:flex-row items-center justify-around gap-20 min-h-screen w-11/12 my-5 ml-4 lg:ml-14 rounded-3xl'>
            <div data-aos="fade-right" data-aos-duration="3000"  className='w-fit md:w-96 bg-gradient-to-b from-yellow-100 to-indigo-100 px-10 py-10 rounded-xl flex flex-col items-center border-y-4 border-black'>
                <img src={user ? user.photoURL : 'https://i.ibb.co/X58Dht9/businesswoman-standing-thinking-near-big-question-mark-isolated-white-background.jpg'} className="w-52 h-52 rounded-xl shadow-lg shadow-black" />
                <div className='mt-10'>
                    <h1 className='text-3xl font-bold'>About Myself</h1>
                    <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum id dolorum soluta nulla, illum rerum exercitationem tempore officiis sit odio totam fuga et illo vitae. Beatae numquam tempore quisquam velit iste minus atque veniam veritatis vero! Ad illo, ab enim asperiores sapiente deserunt veniam quaerat quis quia molestiae beatae id.</p>
                </div>
            </div>
            <div data-aos="fade-left" data-aos-duration="3000"  className='w-4/5'>
                <h1 className='text-3xl text-white font-bold text-center bg-gradient-to-r from-indigo-300 to-purple-500 rounded-full py-2 border-b-4 border-black'>My Profile</h1>
                <h3 className='mt-5 text-3xl ml-10'><span className='font-semibold'>Hey,</span> This is <span className='font-bold'>{user ? user.displayName : 'Guest'}</span></h3>
                <div className='mt-10 flex flex-col gap-5 text-xl ml-20'>
                    <p>School: { }</p>
                    <p>Contact: { }</p>
                    <p>Program: { }</p>
                    <p>Location: { }</p>
                    <p>Date of Birth: { }</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;