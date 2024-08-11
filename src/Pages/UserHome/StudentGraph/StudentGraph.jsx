// import React from 'react';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const StudentGraph = () => {

//   const data = [
//     {
//       name: 'January',
//       present: 4000,
//       absent: 2400,
//       amt: 2400,
//     },
//     {
//       name: 'February',
//       present: 3000,
//       absent: 1398,
//       amt: 2210,
//     },
//     {
//       name: 'March',
//       present: 2000,
//       absent: 5000,
//       amt: 2290,
//     },
//     {
//       name: 'April',
//       present: 2780,
//       absent: 3908,
//       amt: 2000,
//     },
//     {
//       name: 'May',
//       present: 1890,
//       absent: 4800,
//       amt: 2181,
//     },
//     {
//       name: 'June',
//       present: 2390,
//       absent: 3800,
//       amt: 2500,
//     },
//     {
//       name: 'July',
//       present: 3490,
//       absent: 4300,
//       amt: 2100,
//     },
//     {
//       name: 'August',
//       present: 3490,
//       absent: 4300,
//       amt: 2100,
//     },
//     {
//       name: 'September',
//       present: 3005,
//       absent: 4300,
//       amt: 2100,
//     },
//     {
//       name: 'October',
//       present: 3490,
//       absent: 4300,
//       amt: 2100,
//     },
//     {
//       name: 'November',
//       present: 3490,
//       absent: 4300,
//       amt: 2100,
//     },
//     {
//       name: 'December',
//       present: 3490,
//       absent: 4300,
//       amt: 2100,
//     },
//   ];


//   return (
//     <>
//       <h1 className='text-3xl text-center font-bold bg-indigo-300 py-3 rounded-full border-x-4 border-black mt-10 lg:mt-40' data-aos="zoom-in">Student Attendance</h1>
//       <ResponsiveContainer maxWidth="100%" minWidth="30%" maxHeight="30%" minHeight="20%">
//         <BarChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 20,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="present" stackId="a" fill="#207398" />
//           <Bar dataKey="absent" stackId="a" fill="#758283" />
//         </BarChart>
//       </ResponsiveContainer>
//     </>
//   );
// };

// export default StudentGraph;


import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const StudentAttendanceGraph = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  // Function to format the date as "MM/yyyy"
  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  useEffect(() => {
    // Fetch data from the provided URL
    fetch(`  https://asteriactg.com/post-toy?email=${user?.email}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Assuming user data is the first item in the array
        if (data.length > 0) {
          setUserData(data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user]);

  // Calculate total presence and absence for each month
  const attendanceByMonth = userData.attendance_history?.reduce((acc, entry) => {
    const monthYear = formatMonth(entry.date);
    if (!acc[monthYear]) {
      acc[monthYear] = { presence: 0, absence: 0 };
    }
    if (entry.attendance === '1') {
      acc[monthYear].presence++;
    } else {
      acc[monthYear].absence++;
    }
    return acc;
  }, {});

  // Transform data for the Recharts BarChart
  const dataForChart = attendanceByMonth
    ? Object.entries(attendanceByMonth).map(([monthYear, { presence, absence }]) => ({
        monthYear,
        presence,
        absence,
      }))
    : [];

  return (
    <div className='card glass mt-10 py-10 px-1 lg:px-10 rounded-3xl'>
      <h1 className='text-xl lg:text-3xl text-center font-bold bg-gradient-to-r from-[#B721FF] to-[#21D4FD] text-white px-3 py-1 rounded-full border-x-4 border-black mb-5' data-aos="zoom-in">Student Attendance</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={dataForChart}
          margin={{
            top: 20,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="presence" fill="#B721FF" name="Present" />
          <Bar dataKey="absence" fill="#21D4FD" name="Absence" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentAttendanceGraph;

