import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import ClassRoutine from '../ClassRoutine/ClassRoutine';
import StudentCTGraph from '../StudentCT/StudentCTGraph';
import StudentGraph from '../StudentGraph/StudentGraph';
import StudentInfo from '../StudentInfo/StudentInfo';
import StudentTotal from '../StudentTotal/StudentTotal';


const Home = () => {

    return (
        <div className='h-full'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 mx-auto w-fit h-fit'>
                <div className='col-span-1 lg:col-start-0 lg:col-end-2 flex justify-center lg:fixed top-20 left-40 bottom-5'>
                    <Sidebar></Sidebar>
                </div>
                <div className='col-span-1 lg:col-start-2 lg:col-end-3 flex flex-col gap-10'>
                    <StudentInfo></StudentInfo>
                    <StudentTotal></StudentTotal>
                    <StudentGraph></StudentGraph>
                    <StudentCTGraph></StudentCTGraph>
                    <ClassRoutine></ClassRoutine>
                </div>
            </div>
        </div>
    );
};

export default Home;