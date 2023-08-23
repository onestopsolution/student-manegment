import React, { useEffect, useState } from 'react';

const Attandace = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [studentNames, setStudentNames] = useState([]);
  const [batchClassInfo, setBatchClassInfo] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchStudentNames = async () => {
    const response = await fetch('http://localhost:5000/student');
    const data = await response.json();
    const names = data.map(item => item.name);
    setStudentNames(names);
  };

  const fetchBatchClassInfo = async () => {
    const response = await fetch('/api/batch-class-info');
    const data = await response.json();
    setBatchClassInfo(data);
  };

  const handleAttendanceChange = (index, newValue) => {
    const updatedData = [...attendanceData];
    updatedData[index] = parseInt(newValue); // Convert input to a number (1 or 0)
    setAttendanceData(updatedData);
  };

  const saveAttendanceData = async () => {
    const response = await fetch('/api/save-attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ attendanceData, selectedDate })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Error saving attendance data:', data);
    } else {
      console.log('Attendance data saved:', data);
    }
  };

  useEffect(() => {
    fetchStudentNames();
    fetchBatchClassInfo();
  }, []);

  useEffect(() => {
    saveAttendanceData();
  }, [attendanceData, selectedDate]);

    return (
     
<div className="w-full">
      <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
        <h3 className="text-3xl p-8 mb-40">Attandance sheet</h3>
      </div>
      <div className="overflow-x-auto mx-40">
        <table className="table w-full text-xl">
          <thead className="text-xl text-center text-black border">
            <tr className='border'>
              <th className='border'>#</th>
              <th className='border'>Name</th>
              <th className='border'>Date</th>
              <th className='border'>Class</th>
              <th className='border'>Batch</th>
              <th className='border'>Present/Absent</th>
              <th className='border'>Total Present</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {attendanceData.map((status, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{studentNames[index]}</td>
                <td>{selectedDate.toDateString()}</td>
                <td>{batchClassInfo[index]?.Class}</td>
                <td>{batchClassInfo[index]?.Batch}</td>
                <td>
                  <input
                    type="number"
                    value={status}
                    onChange={(e) => handleAttendanceChange(index, e.target.value)}
                  />
                </td>
                <td>Total Present</td>
              </tr>
            ))}
          </tbody>
          {/* <tbody className="text-center">
            {users.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                
          </tbody> */}
        </table>
      </div>
    </div>

    );
};

export default Attandace;