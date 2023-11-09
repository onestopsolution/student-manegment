import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Addatt = () => {
  const [date, setDate] = useState('');
  const [studentName, setStudentName] = useState('');
  const [attendance, setAttendance] = useState('1'); // Default: Present
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    fetch("  https://intern-first-server-farjanaakterlaila.vercel.app/student")
      .then(response => response.json())
      .then(data => {
        setStudentList(data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('  https://intern-first-server-farjanaakterlaila.vercel.app/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          studentName: studentName,
          attendance: attendance,
        }),
      });

      const data = await response.json();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: data.message,
      });
    } catch (error) {
      console.error('Error submitting attendance:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while submitting attendance.',
      });
    }
  };
  return (
    <div className='w-full px-10 '>
      <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
        <h3 className="text-3xl">Attandance Upload</h3>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-5/12   text-black p-8 border bg-[#2563eb] bg-opacity-40">
          <form onSubmit={handleSubmit}>
         <div className='form-control w-full mb-4 '>
        
            <label className="label"><span className="label-text text-xl text-black">Date:</span></label>
            <input type="date" className="input input-bordered w-full" value={date} onChange={e => setDate(e.target.value)} required />
           
            </div> 
            <div className='form-control w-full mb-4 '>
            <label className="label"><span className="label-text text-xl text-black">Student Name:</span></label>
            <select value={studentName} className="input input-bordered w-full" onChange={e => setStudentName(e.target.value)} required>
              <option value="">Select Student</option>
              {studentList.map((student, index) => (
                <option key={index} value={student.name}>{student.name}</option>
              ))}
            </select>
           
            </div>
            <div className='form-control w-full mb-4 '>
            <label className="label"><span className="label-text text-xl text-black">Attendance:</span></label>
            <select value={attendance} className="input input-bordered w-full" onChange={e => setAttendance(e.target.value)}>
              <option value="1">Present</option>
              <option value="0">Absent</option>
            </select>
        </div>
        <input className="btn btn-md  mt-4 mx-48" type="submit" value="Add Attandance" />
          </form>
          </div></div>
        </div>
        );
  };


        export default Addatt;