import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ExpenseGraph = () => {
    const [expenseData, setExpenseData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:5000/adminDashboard/express')
            .then((response) => response.json())
            .then((data) => {
                setExpenseData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <h1 className='text-center text-3xl font-semibold bg-indigo-500 text-white px-5 py-3 rounded-full border-x-4 border-black border-b-4 mb-10'>Expense Graph</h1>
            <ResponsiveContainer maxWidth="80%" minWidth="60%" maxHeight="50%" minHeight="25%">
                <AreaChart
                    width={500}
                    height={400}
                    data={expenseData} // Use the fetched data here
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="marketing" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="stuff_salary" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="teacherPayment" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    <Area type="monotone" dataKey="utility" stackId="1" stroke="#120E43" fill="#120E43" />
                    <Area type="monotone" dataKey="event_Entertainment" stackId="1" stroke="#E03B8B" fill="#E03B8B" />
                </AreaChart>
            </ResponsiveContainer>
            <button className='btn btn-warning mt-10 mb-5' onClick={() => navigate('/adminDashboard/addexpress')}>Add Expense</button>
        </>
    );
};

export default ExpenseGraph;
