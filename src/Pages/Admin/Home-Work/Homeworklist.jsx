import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Homeworklist = () => {
  const [studentList, setStudentList] = useState([]);
  
useEffect(() => {

          fetch(" https://asteriactg.com/homework")
              .then(response => response.json())
              .then(data => {
                setStudentList(data);
                console.log(data);
              })
              .catch(error => {
                  console.error('Error fetching student data:', error);
              });
      
  }, []);
  
  const handleDelete = item => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(` https://asteriactg.com/homework/${item._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                     
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                                      const remaining = studentList.filter(toy => toy._id !== item._id);
              setStudentList(remaining);
                    }
                })
        }
    })
}
    return (
        <div className="mx-5">
        <div className=" bg-indigo-300 mx-5 py-3 rounded-full border-x-4 border-black border-b-2 w-full flex items-center justify-around my-5">
          <h3 className="text-4xl font-bold">Home Work List</h3>
          <Link to='/adminDashboard/homework'><button className='btn btn-primary flex'><FaPlus/>Add Home Work</button></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full text-xl">
            <thead className="text-xl text-center">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Class Name</th>
                <th>Batch Name</th>
                <th>Instruction</th>
                <th>Start Date</th>
                <th>Last Date</th>
                <th>Action</th>
                
              </tr>
            </thead>
            <tbody className="text-center">
               {studentList.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                                <div className="avatar">
                                    <div className=" w-20 h-12">
                                        <img src={item.Image} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </td>
                  <td>{item.Class}</td>
                  <td>{item.Batch}</td>
                  <td>{item.instruction}</td>
                  <td>{item.startdate}</td>
                  <td>{item.lastdate}</td>
                 <td> <button onClick={() => handleDelete(item)} className="btn btn-ghost bg-indigo-600  text-white"><FaTrashAlt></FaTrashAlt></button></td>
                  
                </tr>
              ))} 
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default Homeworklist;