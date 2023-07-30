import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import Tilt from 'react-parallax-tilt';
import './StudentInfo.css';

const StudentInfo = () => {

    const { user } = useContext(AuthContext);

    return (
        <div  data-aos="fade-left" data-aos-duration="3000" className="hero h-fit w-fit bg-indigo-100 mx-auto rounded-2xl py-5 px-5">
            <div className="hero-content w-fit flex-col xl:flex-row gap-10 justify-between">
                <Tilt className="tilt-img"
                    tiltMaxAngleX={35}
                    tiltMaxAngleY={35}
                    perspective={900}
                    scale={1.1}
                    transitionSpeed={2000}
                    gyroscope={true}>
                    <div>
                        <img src={user ? user.photoURL : 'https://i.ibb.co/X58Dht9/businesswoman-standing-thinking-near-big-question-mark-isolated-white-background.jpg'} className="w-40 h-40 rounded-xl shadow-lg shadow-black" />
                    </div>
                </Tilt>
                <div>
                    <div className='bg-yellow-50 p-8 rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 shadow-inner shadow-indigo-500'>
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