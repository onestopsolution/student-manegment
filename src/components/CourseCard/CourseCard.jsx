import React from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Tilt from 'react-parallax-tilt';

const CourseCard = ({ course }) => {
    return (
        <Tilt>
            <div className="card lg:card-side glass bg-indigo-100 shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                <figure><img src={course.Image} alt="Album" className='w-96' /></figure>
                <div className="card-body">
                    <h2 className="card-title">{course.Name}</h2>
                    <p>Instructor: {course.InstructorName}</p>
                    <p>Price: {course.Price}</p>
                    <div className="card-actions justify-end">
                        <button className="btn text-3xl btn-square btn-warning text-white"><AiFillEdit /></button>
                        <button className="btn btn-error text-3xl btn-square text-white"><AiFillDelete /></button>
                    </div>
                </div>
            </div>
        </Tilt>
    );
};

export default CourseCard;