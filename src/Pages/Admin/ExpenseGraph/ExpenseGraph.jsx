import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const ExpenseGraph = () => {

    const data = [
        {
            name: 'January',
            marketing: 4000,
            stuff_salary: 2400,
            Instructor_Payment: 2400,
            utility: 2400,
            event_Entertainment: 2400
        },
        {
            name: 'February',
            marketing: 3000,
            stuff_salary: 1398,
            Instructor_Payment: 2210,
            utility: 2400,
            event_Entertainment: 2400
        },
        {
            name: 'March',
            marketing: 2000,
            stuff_salary: 9800,
            Instructor_Payment: 2290,
            utility: 2400,
            event_Entertainment: 2400
        },
        {
            name: 'April',
            marketing: 2780,
            stuff_salary: 3908,
            Instructor_Payment: 2000,
            utility: 2400,
            event_Entertainment: 2400
        },
        {
            name: 'May',
            marketing: 1890,
            stuff_salary: 4800,
            Instructor_Payment: 2181,
            utility: 2400,
            event_Entertainment: 2400
        },
        {
            name: 'June',
            marketing: 2390,
            stuff_salary: 3800,
            Instructor_Payment: 2500,
            utility: 2400,
            event_Entertainment: 2400
        },
        {
            name: 'July',
            marketing: 3490,
            stuff_salary: 4300,
            Instructor_Payment: 2100,
            utility: 2400,
            event_Entertainment: 2400
        },
    ];
    const navigate = useNavigate();
    return (
        <>
            <h1 className='text-center text-3xl font-semibold bg-indigo-500 text-white px-5 py-3 rounded-full border-x-4 border-black border-b-4 mb-10'>Expense Graph</h1>
            <ResponsiveContainer maxWidth="80%" minWidth="60%" maxHeight="50%" minHeight="25%">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
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
                    <Area type="monotone" dataKey="Instructor_Payment" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    <Area type="monotone" dataKey="utility" stackId="1" stroke="#120E43" fill="#120E43" />
                    <Area type="monotone" dataKey="event_Entertainment" stackId="1" stroke="#E03B8B" fill="#E03B8B" />
                </AreaChart>
            </ResponsiveContainer>
            <button className='btn btn-warning mt-10 mb-5' onClick={() => navigate('/adminDashboard/addexpress')}>Add Expense</button>
        </>
    );
};

export default ExpenseGraph;