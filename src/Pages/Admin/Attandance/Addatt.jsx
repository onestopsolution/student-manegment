import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Addatt = () => {
    const [date, setDate] = useState('');
    const [studentName, setStudentName] = useState('');
    const [attendance, setAttendance] = useState('1'); // Default: Present
    const [studentList, setStudentList] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:5000/student")
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
        const response = await fetch('http://localhost:5000/attendance', {
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
        <div>
        <h1>Attendance Form</h1>
        <form onSubmit={handleSubmit}>
          <label>Date:</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
          <br /><br />
          <label>Student Name:</label>
          <select value={studentName} onChange={e => setStudentName(e.target.value)} required>
            <option value="">Select Student</option>
            {studentList.map((student, index) => (
              <option key={index} value={student.name}>{student.name}</option>
            ))}
          </select>
          <br /><br />
          <label>Attendance:</label>
          <select value={attendance} onChange={e => setAttendance(e.target.value)}>
            <option value="1">Present</option>
            <option value="0">Absent</option>
          </select>
          <br /><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  

export default Addatt;