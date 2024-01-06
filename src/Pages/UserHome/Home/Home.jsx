import React from 'react';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import StudentCTGraph from '../StudentCT/StudentCTGraph';
import StudentGraph from '../StudentGraph/StudentGraph';
import StudentInfo from '../StudentInfo/StudentInfo';
import StudentTotal from '../StudentTotal/StudentTotal';


const Home = () => {

    return (
        <div className='h-full'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 mx-auto w-fit h-fit'>
                <div className='col-span-1 lg:col-start-0 lg:col-end-1 flex justify-center lg:fixed top-20 left-20 bottom-5'>
                    <Sidebar></Sidebar>
                </div>
                <div className='col-span-1 lg:col-start-1 lg:col-end-4 flex flex-col'>
                    <StudentTotal></StudentTotal>
                    <StudentGraph></StudentGraph>
                    <StudentCTGraph></StudentCTGraph>
                </div>
            </div>
        </div>
    );
};

export default Home;