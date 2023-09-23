// import React from 'react';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const IncomeGraph = () => {

//     const data = [
//         {
//             name: 'January',
//             expense: 4000,
//             income: 2400,
//             profit: 2000,
//             amt: 2400,
//         },
//         {
//             name: 'February',
//             expense: 3000,
//             income: 1398,
//             profit: 2000,
//             amt: 2210,
//         },
//         {
//             name: 'March',
//             expense: 2000,
//             income: 9800,
//             profit: 2000,
//             amt: 2290,
//         },
//         {
//             name: 'April',
//             expense: 2780,
//             income: 3908,
//             profit: 2000,
//             amt: 2000,
//         },
//         {
//             name: 'May',
//             expense: 1890,
//             income: 4800,
//             profit: 2000,
//             amt: 2181,
//         },
//         {
//             name: 'June',
//             expense: 2390,
//             income: 3800,
//             profit: 2000,
//             amt: 2500,
//         },
//         {
//             name: 'July',
//             expense: 3490,
//             income: 4300,
//             profit: 2000,
//             amt: 2100,
//         },
//         {
//             name: 'August',
//             expense: 3490,
//             income: 4300,
//             profit: 2000,
//             amt: 2100,
//         },
//         {
//             name: 'September',
//             expense: 3490,
//             income: 4300,
//             profit: 2000,
//             amt: 2100,
//         },
//         {
//             name: 'October',
//             expense: 3490,
//             income: 4300,
//             profit: 2000,
//             amt: 2100,
//         },
//         {
//             name: 'November',
//             expense: 3490,
//             income: 4300,
//             profit: 2000,
//             amt: 2100,
//         },
//         {
//             name: 'December',
//             expense: 3490,
//             income: 4300,
//             profit: 2000,
//             amt: 2100,
//         },
//     ];

//     return (
//         <>
//             <h1 className='text-center text-3xl font-semibold bg-indigo-500 text-white px-5 py-3 rounded-full border-x-4 border-black border-b-4'>Profit & Income Graph</h1>
//             <ResponsiveContainer maxWidth="100%" minWidth="30%" maxHeight="50%" minHeight="25%" className='my-10'>
//                 <BarChart
//                     width={500}
//                     height={300}
//                     data={data}
//                     margin={{
//                         top: 5,
//                         right: 30,
//                         left: 20,
//                         bottom: 5,
//                     }}
//                 >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="income" fill="#3DBE29" />82ca9d
//                     <Bar dataKey="expense" fill="#E21717" />
//                     <Bar dataKey="profit" fill="#E8BD0D" />
//                 </BarChart>
//             </ResponsiveContainer>
//             <button className='btn btn-warning mt-10 mb-5' onClick={() => navigate('/adminDashboard/addexpress')}>Add </button>
//         </>
//     );
// };

// export default IncomeGraph;


import React, { useState, useEffect } from 'react';

const IncomeGraph = () => {
    const [expenseData, setExpenseData] = useState([]);
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        // Fetch expense data from the backend
        fetch(' https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/express')
            .then((response) => response.json())
            .then((data) => {
                setExpenseData(data);
            })
            .catch((error) => {
                console.error('Error fetching expense data:', error);
            });

        // Fetch student data from the backend
        fetch(' https://intern-first-server-farjanaakterlaila.vercel.app/student')
            .then((response) => response.json())
            .then((data) => {
                setStudentData(data);
            })
            .catch((error) => {
                console.error('Error fetching student data:', error);
            });
    }, []);

    // Calculate and group expenses by name
    const expensesByName = {};

    expenseData.forEach((expense) => {
        const name = expense.name || 'Unknown'; // Use 'Unknown' as a default name
        if (!expensesByName[name]) {
            expensesByName[name] = {
                totalExpense: 0,
                expenses: [],
            };
        }
        for (const key in expense) {
            if (key !== '_id' && key !== 'name') {
                expensesByName[name].totalExpense += parseFloat(expense[key]) || 0;
                expensesByName[name].expenses.push({ [key]: parseFloat(expense[key]) || 0 });
            }
        }
    });

    // Calculate the monthly income for each student after subtracting expenses
    const studentIncomeData = studentData.map((student) => {
        const lastPayment = student.payment_history[student.payment_history.length - 1];
        const studentPaydate = lastPayment ? lastPayment.paydate || 'Unknown' : 'Unknown';
        const studentMonthlyIncome = lastPayment ? parseFloat(lastPayment.payamount) || 0 : 0;
        const studentTotalExpense = expensesByName[studentPaydate] ? expensesByName[studentPaydate].totalExpense : 0;
        const studentIncomeAfterExpenses = studentTotalExpense - studentMonthlyIncome;
        console.log("studentTotalExpense", studentTotalExpense)
        console.log("studentMonthlyIncome", studentMonthlyIncome)
        console.log("studentIncomeAfterExpenses", studentIncomeAfterExpenses)
        return {
            paydate: studentPaydate,
            monthlyIncome: studentIncomeAfterExpenses,
        };
    });

    // Calculate the total monthly income after subtracting expenses for all students
    const totalMonthlyIncome = studentIncomeData.reduce((total, student) => {
        return total + student.monthlyIncome;
    }, 0);

    // Calculate the monthly income for each express paydate after subtracting expenses
    const expressIncomeData = Object.keys(expensesByName).map((name) => {
        const expressMonthlyExpense = expensesByName[name].totalExpense;
        const expressMonthlyIncome = studentIncomeData.reduce((totalIncome, student) => {
            if (student.paydate === name) {
                return totalIncome + student.monthlyIncome;
            }
            return totalIncome;
        }, 0);

        return {
            paydate: name,
            totalMonthlyIncome: (-1) * (expressMonthlyIncome - expressMonthlyExpense),
            individualMonthlyIncome: expressMonthlyIncome,
        };
    });

    return (
        <>
            <h1 className='text-center text-3xl font-semibold bg-indigo-500 text-white px-5 py-3 rounded-full border-x-4 border-black border-b-4'>
                Monthly Income After Expenses (Paydate-wise)
            </h1>
            <div className='my-10'>
                <table className='table-auto'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2'>Paydate</th>
                            <th className='px-4 py-2'>Total Monthly Income</th>
                            <th className='px-4 py-2'>Individual Monthly Income</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expressIncomeData.map((item) => (
                            <tr key={item.paydate}>
                                <td className='border px-4 py-2'>{item.paydate}</td>
                                <td className='border px-4 py-2'>{item.totalMonthlyIncome}</td>
                                <td className='border px-4 py-2'>{item.individualMonthlyIncome}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='my-10'>
                <p className='text-lg font-semibold'>
                    Total Monthly Income for All Express Paydates: {totalMonthlyIncome}
                </p>
            </div>
        </>
    );
};

export default IncomeGraph;

