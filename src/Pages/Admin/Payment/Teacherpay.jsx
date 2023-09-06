import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';

const Teacherpay = () => {
    const { user, loading } = useContext(AuthContext);
    const [toys, setToys] = useState([]);
    const url = 'http://localhost:5000/user';

    // Function to format the date to display only the date part (YYYY-MM-DD)
    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const instructorData = data.filter((item) => item.role === "Instructor");
                setToys(instructorData)
            })
    }, [])

    const navigate = useNavigate();
    return (
        <div className='mt-10'>
            <h1 className='text-center text-3xl font-bold bg-indigo-200 rounded-lg px-5 py-2 border-x-4 border-black'>Due Payment Table</h1>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-black text-xl border'>
                            <th className='border-2 border-black'></th>
                            <th className='border-2 border-black'>Name</th>
                            <th className='border-2 border-black'>Total Class</th>
                            <th className='border-2 border-black'>Total Amount</th>
                            <th className='border-2 border-black'>Pay Amount</th>
                            <th className='border-2 border-black'>Due Amount</th>
                            <th className='border-2 border-black'>Total Due Months</th>
                            <th className='border-2 border-black'>Last Pay Date</th>
                            <th className='border-2 border-black'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            toys.map((item, index) => (
                                <tr key={item._id}>
                                    <th className='border-2 border-black'>{index + 1}</th>
                                    <td className='border-2 border-black'>{item.name}</td>
                                    <td className='border-2 border-black'>{item.totalClass}</td>
                                    <td className='border-2 border-black'>{item.totalamount}</td>
                                    <td className='border-2 border-black'>{item.payamount}</td>
                                    <td className='border-2 border-black'>{item.dueamount}</td>
                                    <td className='border-2 border-black'>{item.totalduemonths}</td>
                                    <th className='border-2 border-black'>{formatDate(item.paydate)}</th>
                                    <th className='border-2 border-black'>
                                        <button
                                            className="btn btn-sm btn-ghost bg-indigo-700 text-white"
                                            onClick={() => navigate(`/adminDashboard/pay/${item._id}`)}
                                        >
                                            Pay
                                        </button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Teacherpay;