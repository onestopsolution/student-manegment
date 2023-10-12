import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import { AiOutlineUpload } from 'react-icons/ai';

const ExamList = () => {
    const { user, loading } = useContext(AuthContext);
    const [toys, setToys] = useState([]);
    const url = ' https://intern-first-server-farjanaakterlaila.vercel.app/student';

    // Function to format the date to display only the date part (YYYY-MM-DD)
   

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // const instructorData = data.filter((item) => item.role === "Instructor");
                setToys(data)
            })
    }, [])

    const navigate = useNavigate();
    return (
        <div className='mt-10 mx-12'>
        <h1 className='text-center text-3xl font-bold bg-indigo-200 rounded-lg px-5 py-2 border-x-4 border-black'>Exam Mark Sheet</h1>
        <div className="overflow-x-auto mt-10">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className='text-black text-xl border'>
                        <th className='border-2 border-black'></th>
                      
                        <th className='border-2 border-black'>Name</th>
                        <th className='border-2 border-black'>Batch</th>
                        <th className='border-2 border-black'>Class</th>
                        <th className='border-2 border-black'>Mobile Number </th>
                        <th className='border-2 border-black'> Ct Marks </th>
                      
                        <th className='border-2 border-black'>Action</th>
                    </tr>
                </thead>
                <tbody>
                 
                    {
                        toys.map((item, index) => (
                            <tr key={item._id}>
                                <th className='border-2 border-black'>{index + 1}</th>
                                
                                <td className='border-2 border-black'>{item.name}</td>
                                <td className='border-2 border-black'>{item.Batch}</td>
                                <td className='border-2 border-black'>{item.Class}</td>
                            
                                <td className='border-2 border-black'>{item.WhatsAppNumber}</td>
                                <td className='border-2 border-black'>{item.message}</td>
                               
                                <th className='border-2 border-black'>
                                    <button
                                        className="btn btn-sm btn-ghost bg-indigo-700 text-white"
                                        onClick={() => navigate(`/adminDashboard/sendmessage/${item._id}`)}
                                    >
                                        <AiOutlineUpload/>
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

export default ExamList;