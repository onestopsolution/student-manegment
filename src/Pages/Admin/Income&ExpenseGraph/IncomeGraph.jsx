import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IncomeGraph = () => {

    const data = [
        {
            name: 'January',
            expense: 4000,
            income: 2400,
            profit: 2000,
            amt: 2400,
        },
        {
            name: 'February',
            expense: 3000,
            income: 1398,
            profit: 2000,
            amt: 2210,
        },
        {
            name: 'March',
            expense: 2000,
            income: 9800,
            profit: 2000,
            amt: 2290,
        },
        {
            name: 'April',
            expense: 2780,
            income: 3908,
            profit: 2000,
            amt: 2000,
        },
        {
            name: 'May',
            expense: 1890,
            income: 4800,
            profit: 2000,
            amt: 2181,
        },
        {
            name: 'June',
            expense: 2390,
            income: 3800,
            profit: 2000,
            amt: 2500,
        },
        {
            name: 'July',
            expense: 3490,
            income: 4300,
            profit: 2000,
            amt: 2100,
        },
        {
            name: 'August',
            expense: 3490,
            income: 4300,
            profit: 2000,
            amt: 2100,
        },
        {
            name: 'September',
            expense: 3490,
            income: 4300,
            profit: 2000,
            amt: 2100,
        },
        {
            name: 'October',
            expense: 3490,
            income: 4300,
            profit: 2000,
            amt: 2100,
        },
        {
            name: 'November',
            expense: 3490,
            income: 4300,
            profit: 2000,
            amt: 2100,
        },
        {
            name: 'December',
            expense: 3490,
            income: 4300,
            profit: 2000,
            amt: 2100,
        },
    ];

    return (

        <ResponsiveContainer width="90%" height="80%" className='my-10'>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" />82ca9d
                <Bar dataKey="expense" fill="#8884d8" />
                <Bar dataKey="profit" fill="#E8BD0D" />
            </BarChart>
        </ResponsiveContainer>

    );
};

export default IncomeGraph;