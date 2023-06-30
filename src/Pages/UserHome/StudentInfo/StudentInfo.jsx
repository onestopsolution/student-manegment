import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import Tilt from 'react-parallax-tilt';

const StudentInfo = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className="hero h-fit w-fit bg-indigo-100 mx-auto mt-10 rounded-2xl py-5 px-3">
            <div className="hero-content flex-col lg:flex-row gap-20 justify-between items-center">
                <Tilt>
                    <div>
                        <img src={user ? user.photoURL : 'https://i.ibb.co/X58Dht9/businesswoman-standing-thinking-near-big-question-mark-isolated-white-background.jpg'} className="max-w-sm h-80 rounded-xl shadow-2xl" />
                    </div>
                </Tilt>
                <div>
                    <div className='bg-yellow-50 p-8 rounded-xl transition ease-in-out delay-150 hover:-translate-y-5 hover:scale-110 duration-300 shadow-inner shadow-indigo-500'>
                        <h1 className='text-xl'>Name: <span className='font-semibold'>{user ? user.displayName : 'Guest'}</span></h1>
                        <h1 className='text-xl'>School: <span className='font-semibold'>{ }</span></h1>
                        <h1 className='text-xl'>StudentID: <span className='font-semibold'>{ }</span></h1>
                        <h1 className='text-xl'>Contact: <span className='font-semibold'>{ }</span></h1>
                        <h1 className='text-xl'>Program/Course: <span className='font-semibold'>{ }</span></h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentInfo;