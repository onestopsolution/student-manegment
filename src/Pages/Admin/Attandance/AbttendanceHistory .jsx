import React, { useEffect, useState } from 'react';

const AttendanceHistory  = ({ student }) => {
  const [cla,setCl] = useState([]);
  useEffect(()=>{
      fetch('https://intern-first-server-farjanaakterlaila.vercel.app/attendance')
      .then(res => res.json())
      .then(data => setCl(data))
  },[])
    return (
        <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {cla.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.attendance === '1' ? 'Present' : 'Absent'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
};

export default AttendanceHistory ;