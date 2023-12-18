import React from 'react';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import ClassRoutine from '../ClassRoutine/ClassRoutine';
import NoticeBoard from '../NoticeBoard/NoticeBoard';
import StudentCTGraph from '../StudentCT/StudentCTGraph';
import StudentGraph from '../StudentGraph/StudentGraph';
import StudentInfo from '../StudentInfo/StudentInfo';
import StudentTotal from '../StudentTotal/StudentTotal';


const Home = () => {

    return (
        <div className='h-full'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 mx-auto w-fit h-fit'>
                <div className='col-span-1 lg:col-start-0 lg:col-end-1 flex justify-center lg:fixed top-20 left-40 bottom-5'>
                    <Sidebar></Sidebar>
                </div>
                <div className='col-span-1 lg:col-start-2 lg:col-end-4 flex flex-col mr-8'>
                    <StudentInfo></StudentInfo>
                    <StudentTotal></StudentTotal>
                    <StudentGraph></StudentGraph>
                    <StudentCTGraph></StudentCTGraph>
                </div>
            </div>
        </div>
    );
};

export default Home;