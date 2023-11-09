import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IncomeGraph = () => {
  const [expenseData, setExpenseData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    fetch('  https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/addincome')
      .then((response) => response.json())
      .then((data) => {
        // Calculate profit by subtracting expenses (Express) from income
        const profitData = data.map((item) => ({
          selectedMonth: item.selectedMonth,
          stuincome: item.income,
          
          otherIncome: item.Otherincome,
         Income:item.income + item.Otherincome,
          Express: item.Express,
          Profit: item.income + item.Otherincome - item.Express, // Calculate profit
        }
        ));
       
        setExpenseData(profitData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <h1 className='text-center text-3xl font-semibold bg-indigo-500 text-white px-5 py-3 rounded-full border-x-4 border-black border-b-4'>
        Profit & Income Graph
      </h1>
      <ResponsiveContainer maxWidth="100%" minWidth="30%" maxHeight="50%" minHeight="25%" className='my-10'>
        <BarChart
          width={500}
          height={300}
          data={expenseData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="selectedMonth" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Income" fill="#3DBE29" />
          <Bar dataKey="Express" fill="#E21717" />
          <Bar dataKey="Profit" fill="#E8BD0D" />
        </BarChart>
      </ResponsiveContainer>
      <button className='btn btn-warning mt-10 mb-5' onClick={() => navigate('/adminDashboard/addincome')}>Add</button>
    </>
  );
};

export default IncomeGraph;
