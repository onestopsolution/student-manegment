import React from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Tilt from 'react-parallax-tilt';
import Swal from 'sweetalert2';

const CourseCard = ({ course }) => {

    const handleDelete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if(result.isConfirmed){
                fetch(`https://intern-first-server-farjanaakterlaila.vercel.app/classes/${_id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.deletedCount > 0){
                        Swal.fire(
                            'Deleted!',
                            'Your class has been deleted.',
                            'success'
                          )
                    }
                })
            }
        })
    }

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
                        <button className="btn btn-error text-3xl btn-square text-white" onClick={() => handleDelete(course._id)}><AiFillDelete /></button>
                    </div>
                </div>
            </div>
        </Tilt>
    );
};

export default CourseCard;