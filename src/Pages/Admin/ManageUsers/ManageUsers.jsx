
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ManageUsers = () => {

  const { data: user = [], refetch } = useQuery(['user'], async () => {
    const res = await fetch(' https://asteriactg.com/user')
    return res.json();
  })
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleMakeStudent = (user) => {
    if (user.role === 'Student' || selectedUsers.includes(user._id)) {
      return;
    }

    fetch(` https://asteriactg.com/user/student/${user._id}`, {
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

    fetch(` https://asteriactg.com/user/instructor/${user._id}`, {
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

    fetch(` https://asteriactg.com/user/employee/${user._id}`, {
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

  const handleMakeAdmin = (user) => {
    if (user.role === 'Admin' || selectedUsers.includes(user._id)) {
      return;
    }

    fetch(` https://asteriactg.com/user/admin/${user._id}`, {
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
            title: `${user.name} is an Admin Now!`,
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
    <div className="mx-5">
      <div className=" bg-indigo-300 mx-5 py-3 rounded-full border-x-4 border-black border-b-2 w-full flex items-center justify-around my-5">
        <h3 className="text-4xl font-bold">Users</h3>
        <Link to='/adminDashboard/adduser'><button className='btn btn-primary flex'><FaPlus />Add User</button></Link>
      </div>
      <div className="overflow-x-auto">
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
                <td className='flex flex-col items-center justify-center gap-3'>
                  {item.role === 'Student' ? (
                    'Student'
                  ) : (
                    <button
                      onClick={() => handleMakeStudent(item)}
                      className="btn btn-sm btn-ghost bg-indigo-700 text-white"
                      disabled={selectedUsers.includes(item._id) || item.role === 'Instructor' || item.role === 'Employee' || item.role === 'Admin'}
                    >
                      Student
                    </button>
                  )}
                  {item.role === 'Instructor' ? (
                    'Instructor'
                  ) : (
                    <button
                      onClick={() => handleMakeInstr(item)}
                      className="btn btn-sm btn-ghost bg-indigo-700 text-white"
                      disabled={selectedUsers.includes(item._id) || item.role === 'Student' || item.role === 'Employee' || item.role === 'Admin'}
                    >
                      Instructor
                    </button>
                  )}
                  {item.role === 'Employee' ? (
                    'Employee'
                  ) : (
                    <button
                      onClick={() => handleMakeEmp(item)}
                      className="btn btn-sm btn-ghost bg-indigo-700 text-white"
                      disabled={selectedUsers.includes(item._id) || item.role === 'Student' || item.role === 'Instructor' || item.role === 'Admin'}
                    >
                      Employee
                    </button>
                  )}
                  {item.role === 'Admin' ? (
                    'Admin'
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(item)}
                      className="btn btn-sm btn-ghost bg-indigo-700 text-white"
                      disabled={selectedUsers.includes(item._id) || item.role === 'Student' || item.role === 'Instructor' || item.role === 'Employee' }
                    >
                      Admin
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