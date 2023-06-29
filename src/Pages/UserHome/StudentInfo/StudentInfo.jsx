import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const StudentInfo = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className="hero h-fit w-fit bg-indigo-100 mx-auto mt-10 rounded-2xl py-5 px-20">
            <div className="hero-content flex-col lg:flex-row gap-20 justify-between">
                <img src={user.photoURL} className="max-w-sm h-80 rounded-lg shadow-2xl" />
                <div>
                    <div className='bg-yellow-50 p-8 rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 duration-300 '>
                        <h1 className='text-xl'>Name: <span className='font-semibold'>{user.displayName}</span></h1>
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