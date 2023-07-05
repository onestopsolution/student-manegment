import React from 'react';
import Tilt from 'react-parallax-tilt';

const StudentTotal = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-center gap-10 h-fit text-center mt-5 xl:mt-10 mb-10'>
            <Tilt>
                <div className="stats shadow-2xl shadow-black w-fit py-3 px-2 hover:bg-indigo-500 hover:text-white">

                    <div className="stat">
                        <div className="stat-title text-white">Enrolled Courses</div>
                        <div className="stat-value">10</div>
                    </div>

                </div>
            </Tilt>
            <Tilt>
                <div className="stats shadow-2xl shadow-black w-fit py-3 px-2 hover:bg-indigo-500 hover:text-white">

                    <div className="stat">
                        <div className="stat-title text-white">Active Courses</div>
                        <div className="stat-value">3</div>
                    </div>

                </div>
            </Tilt>
            <Tilt>
                <div className="stats shadow-2xl shadow-black w-fit py-3 px-2 hover:bg-indigo-500 hover:text-white">

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