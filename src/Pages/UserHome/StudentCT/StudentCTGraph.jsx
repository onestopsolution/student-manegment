import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const StudentCTGraph = () => {
    const data = [
        {
            name: 'CT-1',
            Obtain: 4000,
            Highest: 2400,
            amt: 2400,
        },
        {
            name: 'CT-2',
            Obtain: 3000,
            Highest: 1398,
            amt: 2210,
        },
        {
            name: 'CT-3',
            Obtain: 2000,
            Highest: 9800,
            amt: 2290,
        },
        {
            name: 'CT-4',
            Obtain: 2780,
            Highest: 3908,
            amt: 2000,
        },
        {
            name: 'CT-5',
            Obtain: 1890,
            Highest: 4800,
            amt: 2181,
        },
        {
            name: 'CT-6',
            Obtain: 2390,
            Highest: 3800,
            amt: 2500,
        },
        {
            name: 'CT-7',
            Obtain: 3490,
            Highest: 4300,
            amt: 2100,
        },
    ];

    return (
        <>
            <h1 className='text-3xl text-center font-bold bg-indigo-300 py-3 rounded-full border-x-4 border-black mt-10'>CT Marks</h1>
            <ResponsiveContainer className='my-5' minHeight='30%' maxHeight='50%' minWidth='80%' maxWidth='100%'>
                <LineChart
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
                    <Line type="monotone" dataKey="Highest" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Obtain" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default StudentCTGraph;