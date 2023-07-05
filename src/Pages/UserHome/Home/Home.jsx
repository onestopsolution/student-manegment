import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import StudentGraph from '../StudentGraph/StudentGraph';
import StudentInfo from '../StudentInfo/StudentInfo';
import StudentTotal from '../StudentTotal/StudentTotal';

const Home = () => {

    return (
        <div>
            <Navbar></Navbar>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 mt-10 mx-auto w-fit'>
                <div className='col-span-1 lg:col-start-0 lg:col-end-1 flex justify-center '>
                    <Sidebar></Sidebar>
                </div>
                <div className='col-span-1 lg:col-start-1 lg:col-end-3 flex flex-col gap-5'>
                    <StudentInfo></StudentInfo>
                    <StudentTotal></StudentTotal>
                    <StudentGraph></StudentGraph>
                </div>
            </div>
        </div>
    );
};

export default Home;