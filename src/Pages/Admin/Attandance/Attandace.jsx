import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { SlCalender } from 'react-icons/sl';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineUpload } from 'react-icons/ai';
import Calendar from 'react-calendar';

const Attandace = () => {


  const [studentList, setStudentList] = useState([]);
  const [batchList, setbatchList] = useState([]);
  const [classList, setclassList] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {

    fetch("  https://intern-first-server-farjanaakterlaila.vercel.app/BatchClass")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setbatchList(data);
        setclassList(data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
    fetch("  https://intern-first-server-farjanaakterlaila.vercel.app/student")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setStudentList(data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });

  }, []);
  const filterStudentsByBatchAndClass = () => {
    return studentList.filter(student => {
      if (selectedBatch !== '' && student.Batch !== selectedBatch) {
        return false;
      }
      if (selectedClass !== '' && student.Class !== selectedClass) {
        return false;
      }
      return true;
    });
  };

  const handleAttendanceChange = (index, newAttendance) => {
    const updatedStudentList = [...studentList];
    const date = new Date().toISOString().split('T')[0]; // Get the selected date in the "YYYY-MM-DD" format

    // Update the student's attendance and lastAttendanceDate
    updatedStudentList[index].attendance = newAttendance;
    updatedStudentList[index].lastAttendanceDate = date;
    setStudentList(updatedStudentList);

    const studentId = updatedStudentList[index]._id;
    console.log(studentId)
    // Update the attendance in the database
    fetch(`  https://intern-first-server-farjanaakterlaila.vercel.app/student/${studentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ attendance: newAttendance, date }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle success
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Attendance Updated',
        //   text: 'Student attendance has been successfully updated!',
        // });
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
        <h3 className="text-3xl p-8 mb-8">Attendance sheet</h3>
      </div>
      <div className="overflow-x-auto mx-40">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <label className="label-text text-xl font-semibold text-black">Batch: </label>
            <select
              className="select select-bordered flex-grow"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="">All Batches</option>
              {batchList.map((batch) => (
                <option key={batch._id} value={batch.Batch}>
                  {batch.Batch}
                </option>
              ))}
            </select>
            <div className='mt-4 mb-4'>
              <label className="label-text text-xl font-semibold text-black ">Class: </label>
              <select
                className="select select-bordered flex-grow "
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">All Classes</option>
                {classList.map((batch) => (
                  <option key={batch._id} value={batch.Class}>
                    {batch.Class}
                  </option>
                ))}

              </select>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Calendar
              className='mb-4'
              onChange={date => setSelectedDate(date)}
              value={selectedDate}
            />
          </div>
        </div>
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

          <tbody>
            {filterStudentsByBatchAndClass().map((student, index) => (
              <tr key={index}>
                <td className='border-2 border-black'>{student.stuid}</td>
                <td className='border-2 border-black'>{student.name}</td>
                <td className='border-2 border-black'>{student.Class}</td>
                <td className='border-2 border-black'>{student.Batch}</td>
                <td className='border-2 border-black'>
                  <div>Date: {student.lastAttendanceDate}</div>
                  <div>Attendance: {student.attendance}</div>
                </td>
                <td className="border-2 border-black">

                  <div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <label>
                        <input
                          type="radio"
                          value="1"
                          checked={student.attendance === 1}
                          onChange={() => handleAttendanceChange(index, 1)}
                        /> Present
                      </label>
                    </div>
                    <label>
                      <input
                        type="radio"
                        value="0"
                        checked={student.attendance === 0}
                        onChange={() => handleAttendanceChange(index, 0)}
                      /> Absent
                    </label>
                  </div>
                </td>
                {/* <td className="border-2 border-black">
                  <input
                    className="bg-white text-black border-0"
                    type="date"
                    value={student.lastAttendanceDate}
                    onChange={(e) => handleAttendanceChange(index, student.attendance, e.target.value)}
                    />
                  </td> */}
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