import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import StudentInfo from '../StudentInfo/StudentInfo';
import StudentTotal from '../StudentTotal/StudentTotal';

const Home = () => {

    return (
        <div>
            <Navbar></Navbar>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 mx-auto w-fit'>
                <div className='col-span-1 lg:col-start-0 lg:col-end-1 '>
                    <StudentInfo></StudentInfo>
                </div>
                <div className='col-span-1 lg:col-start-1 lg:col-end-3'>
                    <StudentTotal></StudentTotal>
                </div>
            </div>
        </div>
    );
};

export default Home;