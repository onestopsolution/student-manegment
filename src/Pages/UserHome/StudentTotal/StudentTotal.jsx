import React from 'react';
import Tilt from 'react-parallax-tilt';

const StudentTotal = () => {
    return (
        <div className='flex flex-col lg:flex-row items-center justify-center gap-10 h-full text-center'>
            <Tilt>
                <div className="stats shadow-2xl shadow-black w-fit sm:w-60 lg:w-60 py-5 hover:bg-indigo-500 hover:text-white">

                    <div className="stat">
                        <div className="stat-title text-white">Enrolled Courses</div>
                        <div className="stat-value">10</div>
                    </div>

                </div>
            </Tilt>
            <Tilt>
                <div className="stats shadow-2xl shadow-black w-fit sm:w-60 lg:w-60 py-5 hover:bg-indigo-500 hover:text-white">

                    <div className="stat">
                        <div className="stat-title text-white">Active Courses</div>
                        <div className="stat-value">3</div>
                    </div>

                </div>
            </Tilt>
            <Tilt>
                <div className="stats shadow-2xl shadow-black w-fit sm:w-60 lg:w-60 py-5 hover:bg-indigo-500 hover:text-white">

                    <div className="stat">
                        <div className="stat-title text-white">Completed Courses</div>
                        <div className="stat-value">2</div>
                    </div>

                </div>
            </Tilt>
        </div>
    );
};

export default StudentTotal;