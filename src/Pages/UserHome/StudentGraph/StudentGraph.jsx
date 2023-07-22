import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StudentGraph = () => {

  const data = [
    {
      name: 'January',
      present: 4000,
      absent: 2400,
      amt: 2400,
    },
    {
      name: 'February',
      present: 3000,
      absent: 1398,
      amt: 2210,
    },
    {
      name: 'March',
      present: 2000,
      absent: 5000,
      amt: 2290,
    },
    {
      name: 'April',
      present: 2780,
      absent: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      present: 1890,
      absent: 4800,
      amt: 2181,
    },
    {
      name: 'June',
      present: 2390,
      absent: 3800,
      amt: 2500,
    },
    {
      name: 'July',
      present: 3490,
      absent: 4300,
      amt: 2100,
    },
    {
      name: 'August',
      present: 3490,
      absent: 4300,
      amt: 2100,
    },
    {
      name: 'September',
      present: 3005,
      absent: 4300,
      amt: 2100,
    },
    {
      name: 'October',
      present: 3490,
      absent: 4300,
      amt: 2100,
    },
    {
      name: 'November',
      present: 3490,
      absent: 4300,
      amt: 2100,
    },
    {
      name: 'December',
      present: 3490,
      absent: 4300,
      amt: 2100,
    },
  ];


  return (
    <>
      <h1 className='text-3xl text-center font-bold bg-indigo-300 py-3 rounded-full border-x-4 border-black'>Student Attendance</h1>
      <ResponsiveContainer maxWidth="100%" minWidth="30%" maxHeight="30%" minHeight="30%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="present" stackId="a" fill="#1FAA59" />
          <Bar dataKey="absent" stackId="a" fill="#E21717" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default StudentGraph;