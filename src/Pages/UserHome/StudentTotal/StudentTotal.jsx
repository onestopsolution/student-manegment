import React from 'react';
import Tilt from 'react-parallax-tilt';

const StudentTotal = () => {
    return (
        <div className='flex flex-col lg:flex-row flex-wrap justify-center gap-10 h-fit text-center mt-10'>
            <Tilt>
                <div data-aos='flip-left' data-aos-duration="3000" className="stats bg-black bg-opacity-90 shadow-2xl shadow-black w-fit px-2 py-3 hover:bg-indigo-500 hover:text-white">

                    <div className="stat">
                        <div className="stat-title text-white">Enrolled Courses</div>
                        <div className="stat-value text-white">10</div>
                    </div>

                </div>
            </Tilt>
            <Tilt>
                <div data-aos="flip-up" data-aos-duration="3000" className="stats bg-black bg-opacity-90 shadow-2xl shadow-black w-fit px-2 py-3 hover:bg-indigo-500 hover:text-white">

                    <div className="stat">
                        <div className="stat-title text-white">Due Payment</div>
                        <div className="stat-value text-white">0 BDT</div>
                    </div>

                </div>
            </Tilt>
            <Tilt>
                <div data-aos='flip-right' data-aos-duration="3000" className="stats bg-black bg-opacity-90 shadow-2xl shadow-black w-fit px-2 py-3 hover:bg-indigo-500 hover:text-white">

                    <div className="stat">
                        <div className="stat-title text-white">Due Payment Date</div>
                        <div className="stat-value text-white">12.07.23</div>
                    </div>

                </div>
            </Tilt>
        </div>
    );
};

export default StudentTotal;