
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  LineChart,
  Line,
} from 'recharts';

const StudentCTMarks = () => {
  const { user } = useContext(AuthContext);
  const [ctData, setCTData] = useState([]);

  useEffect(() => {
    // Fetch data from the provided URL
    fetch(`  https://intern-first-server-farjanaakterlaila.vercel.app/post-toy?email=${user?.email}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Assuming user data is the first item in the array
        if (data.length > 0) {
          const userData = data[0];
          const messageHistory = userData.message_history;

          // Filter out entries with "ctname," "Highest," and "Obtain" properties
          const ctMarksData = messageHistory.filter((entry) =>
            entry.ctname && entry.Highest && entry.Obtain
          );

          setCTData(ctMarksData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user]);

  return (

    <div className='card glass mt-10 py-10 px-1 lg:px-10 rounded-3xl'>
      <h1 className='text-3xl text-center font-bold bg-gradient-to-r from-[#B721FF] to-[#21D4FD] text-white py-1 rounded-full border-x-4 border-black' data-aos="zoom-out">CT Marks</h1>
      <ResponsiveContainer className='my-5' maxWidth="80%" minWidth="30%" maxHeight="80%" minHeight="80%">
        <LineChart
          width={500}
          height={300}
          data={ctData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="ctname" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Highest" stroke="#6D5ACF" strokeWidth={5} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Obtain" stroke="#ADD8E6" strokeWidth={5} />
        </LineChart>

      </ResponsiveContainer>
    </div>
  );
};

export default StudentCTMarks;
