
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ManageUsers = () => {
    
    const {data: user = [] , refetch} = useQuery(['user'],async()=>
    {
        const res = await fetch('https://intern-first-server-farjanaakterlaila.vercel.app/user')
        return res.json();
    })
    const [selectedUsers, setSelectedUsers] = useState([]); 

  const handleMakeAdmin = (user) => {
    if (user.role === 'Student' || selectedUsers.includes(user._id)) {
      return; 
    }

    fetch(`https://intern-first-server-farjanaakterlaila.vercel.app/user/student/${user._id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is an Student Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleMakeInstr = (user) => {
    if (user.role === 'Instructor' || selectedUsers.includes(user._id)) {
      return; 
    }

    fetch(`https://intern-first-server-farjanaakterlaila.vercel.app/user/instructor/${user._id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is an Instructor Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleMakeEmp = (user) => {
    if (user.role === 'Employee' || selectedUsers.includes(user._id)) {
      return; 
    }

    fetch(`https://intern-first-server-farjanaakterlaila.vercel.app/user/employee/${user._id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is an Employee Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const UserSelection = (user) => {
    if (selectedUsers.includes(user._id)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== user._id)); 
    } else {
      setSelectedUsers([...selectedUsers, user._id]); 
    }
  };

    return (
    <div className="w-full">
    <div className=" bg-indigo-300 mx-auto px-10 py-3 rounded-full border-x-4 border-black border-b-2 w-1/2 flex items-center justify-between mb-4">
      <h3 className="text-3xl">Users</h3>
      <Link to='/adminDashboard/adduser'><button className='btn btn-primary flex'><FaPlus/>Add User</button></Link>
    </div>
    <div className="overflow-x-auto mx-40">
      <table className="table w-full text-xl">
        <thead className="text-xl text-center">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            
          </tr>
        </thead>
        <tbody className="text-center">
          {user.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                {item.role === 'Student' ? (
                  'Student'
                ) : (
                  <button
                    onClick={() => handleMakeAdmin(item)}
                    className="btn btn-ghost bg-indigo-700 text-white mr-4"
                    disabled={selectedUsers.includes(item._id) || item.role === 'Instructor' || item.role === 'Employee'}
                  >
                    Student
                  </button>
                )}
                {item.role === 'Instructor' ? (
                  'Instructor'
                ) : (
                  <button
                    onClick={() => handleMakeInstr(item)}
                    className="ml-4 btn btn-ghost bg-indigo-700 text-white"
                    disabled={selectedUsers.includes(item._id) || item.role === 'Student'||item.role === 'Employee'}
                  >
                    Instructor
                  </button>
                )}
                {item.role === 'Employee' ? (
                  'Employee'
                ) : (
                  <button
                    onClick={() => handleMakeEmp(item)}
                    className="ml-4 btn btn-ghost bg-indigo-700 text-white"
                    disabled={selectedUsers.includes(item._id) || item.role === 'Student'||item.role === 'Instructor'}
                  >
                    Employee
                  </button>
                )}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    );
};

export default ManageUsers;