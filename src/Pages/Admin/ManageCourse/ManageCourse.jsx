import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CourseCard from '../../../components/CourseCard/CourseCard';

const ManageCourse = () => {

    const courses = useLoaderData();
    console.log(courses);

    return (
        <div className=''>
            <h1 className='text-3xl font-bold bg-indigo-300 px-10 py-3 rounded-full border-x-4 border-black border-b-2 text-center'>Provided Courses</h1>
            <div className='mt-10 flex flex-col md:flex-row flex-wrap items-center justify-center gap-5'>
                {/* {
                    courses.map(course => <CourseCard key={course._id} course={course}></CourseCard>)
                } */}
            </div>
        </div>
    );
};

export default ManageCourse;