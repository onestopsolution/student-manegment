import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { SlCalender } from 'react-icons/sl';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineUpload } from 'react-icons/ai';
const Attandace = () => {


  const [studentList, setStudentList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {

    fetch(" https://intern-first-server-farjanaakterlaila.vercel.app/student")
      .then(response => response.json())
      .then(data => {
        setStudentList(data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });

  }, []);
  const handleAttendanceChange = (index, newAttendance, newDate) => {
    const updatedStudentList = [...studentList];

    updatedStudentList[index].attendance = newAttendance;
    updatedStudentList[index].lastAttendanceDate = newDate;
    setStudentList(updatedStudentList);

    const studentId = updatedStudentList[index]._id;
    console.log(studentId, newAttendance);
    fetch(`https://intern-first-server-farjanaakterlaila.vercel.app/student/${studentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ attendance: newAttendance, date: newDate }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle success
        Swal.fire({
          icon: 'success',
          title: 'Attendance Updated',
          text: 'Student attendance has been successfully updated!',
        });
      })
      .catch(error => {
        console.error('Error updating student attendance:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating attendance.',
        });
      });
  };

  const toggleShowAllHistory = (index) => {
    const updatedStudentList = [...studentList];
    updatedStudentList[index].showAllHistory = !updatedStudentList[index].showAllHistory;
    setStudentList(updatedStudentList);
  };
  return (

    <div className="w-full">

      <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
        <h3 className="text-3xl p-8 mb-40">Attandance sheet</h3>
      </div>
      <div className="overflow-x-auto mx-40">
        <Link to='/adminDashboard/addatt'><button className='btn btn-primary flex justify-items-end ml-auto mb-8'><FaPlus />Add Attandance</button></Link>
        <table className="table w-full text-xl">
          <thead className="text-xl text-center text-black border">
            <tr className='border'>
              <td className='border-2 border-black'>Id</td>
              <th className='border-2 border-black'> Student Name</th>

              <th className='border-2 border-black'>Class</th>
              <th className='border-2 border-black'>Batch</th>
              <th className='border-2 border-black'>Attendance & Date</th>

            </tr>
          </thead>
          {/* <tbody>
                    {studentList.map((student, index) => (
                        <tr key={index}>
                            <td className='border-2 border-black'>{student._id}</td>
                            <td className='border-2 border-black'>{student.name}</td>
                            <td className='border-2 border-black'>{student.Class}</td>
                            <td className='border-2 border-black'>{student.Batch}</td>
                            <td className='border-2 border-black'>{student.attendance}
              <input className='bg-white text-black border-0'
                type="number"
                min="0"
                max="1"
                value={student.attendance}
                onChange={(e) => handleAttendanceChange(index, parseInt(e.target.value))}
              />
            </td>
            <td className='border-2 border-black'>
              <input
                className='bg-white text-black border-0'
                type="date"
               
                value={student.lastAttendanceDate}
                onChange={(e) => handleAttendanceChange(index, student.attendance, e.target.value)}
             
              />
            {student.lastAttendanceDate}
            </td>
                        </tr>
                    ))}
                </tbody> */}
          <tbody>
            {studentList.map((student, index) => (
              <tr key={index}>
                <td className='border-2 border-black'>{student._id}</td>
                <td className='border-2 border-black'>{student.name}</td>
                <td className='border-2 border-black'>{student.Class}</td>
                <td className='border-2 border-black'>{student.Batch}</td>
                <td className='border-2 border-black'>
                  <div>Date: {student.lastAttendanceDate}</div>
                  <div>Attendance: {student.attendance}</div>
                </td>
                <td className='border-2 border-black'>

                  <button
                    className="btn btn-sm btn-ghost bg-indigo-700 text-white"
                    onClick={() => navigate(`/adminDashboard/attendance/${student._id}`)}
                  >
                    <AiOutlineUpload />
                  </button>
                  {/* {student.showAllHistory ? (
                    <td>
                      {student.attendance_history.map((attendanceEntry, entryIndex) => (
                        <td key={entryIndex}>
                          <tr>Date: {attendanceEntry.date}</tr>
                          <div>Attendance: {attendanceEntry.attendance}</div>
                        </td>
                      ))}
                      <button onClick={() => toggleShowAllHistory(index)}>
                        Hide History
                      </button>
                    </td>
                  ) : (
                    <button onClick={() => toggleShowAllHistory(index)}>
                      Show All History
                    </button>
                  )} */}
                </td>
              </tr>
            ))}
          </tbody>


        </table>
      </div>
    </div>

  );
};

export default Attandace;