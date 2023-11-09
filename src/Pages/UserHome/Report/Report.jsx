import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useReactToPrint } from 'react-to-print';

const Report = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [attendanceCount1, setAttendanceCount1] = useState(0); // Count of attendance '1'
    const [attendanceCount0, setAttendanceCount0] = useState(0); // Count of attendance '0'
    const [attendanceData, setAttendanceData] = useState([]);
    const [ctData, setCTData] = useState([]);

    useEffect(() => {
        // Fetch data from the provided URL for attendance
        fetch(` https://intern-first-server-farjanaakterlaila.vercel.app/post-toy?email=${user?.email}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    console.log(data[0])
                    setAttendanceData(data[0].attendance_history);
                    setUserData(data[0]);
                }
            })
            .catch((error) => {
                console.error('Error fetching attendance data:', error);
            });

        // Fetch data from the provided URL for ctMarksData
        fetch(` https://intern-first-server-farjanaakterlaila.vercel.app/post-toy?email=${user?.email}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    const userData = data[0];
                    const messageHistory = userData.message_history;
                    // Filter out entries with "ctname," "Highest," and "Obtain" properties
                    const ctMarksData = messageHistory.filter((entry) => entry.ctname && entry.Highest && entry.Obtain);
                    setCTData(ctMarksData);
                }
            })
            .catch((error) => {
                console.error('Error fetching ctMarksData:', error);
            });
    }, [user]);

    useEffect(() => {
        // Function to mark dates with attendance '1' and '0'
        const getMarkedDates = () => {
            const marked = {};
            let count1 = 0;
            let count0 = 0;

            attendanceData.forEach((item) => {
                const date = new Date(item.date);
                const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

                if (item.attendance === '1') {
                    marked[formattedDate] = { attendance: '1' };
                    count1++;
                } else if (item.attendance === '0') {
                    marked[formattedDate] = { attendance: '0' };
                    count0++;
                }
            });

            setAttendanceCount1(count1);
            setAttendanceCount0(count0);
        };

        getMarkedDates();
    }, [attendanceData]);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="print__section mt-10 mb-8 font-serif ">
            <div className="container ">
                <div className="row mx-60 ">
                    <div className="col-md-12 p-0 bg-gradient-to-r from-indigo-100 to-purple-100 bg-opacity-40">

                        <div ref={componentRef} className="card ">
                            <div className="float__start">
                                <h3 className="font-bold text-3xl py-4 mb-0  text-center text-blue-800 border-b-0">Student Report Card</h3>
                                <h3 className="font-bold text-xl py-2 mb-0  text-center text-black-800 border-b-0" >OneStop Solution</h3>
                            </div>

                            <div className="float__infoss mx-60">
                                <ul>

                                    <li className='font-bold text-2xl text-blue-500 mt-4 border-t-4 border-blue-700 mb-2 '>Personal Information:</li>
                                    <li ><span className='font-bold text-xl '>Name</span> <span className='text-xl ml-12 '>{userData.name}</span></li>

                                    <li className='mb-4 mt-4'><span className='font-bold text-xl '>Email  </span> <span className='text-xl ml-8 '>{userData.email}</span></li>

                                    <li className='mb-4 mt-4'><span className='font-bold text-xl '>Date of Birth </span> <span className='text-xl ml-10'>{userData.brithday}</span></li>

                                    <li><span className='font-bold text-xl '>Phone No </span> <span className='text-xl ml-12 '>{userData.WhatsAppNumber}</span></li>

                                    <li className='font-bold text-2xl text-blue-500 mt-4 border-t-4 border-blue-700 mb-2'>Academic Information:</li>

                                    <li className='mb-4 mt-4'><span className='font-bold text-xl '>Institute Name: </span> <span className='text-xl ml-8 '>{userData.instituteName}</span></li>

                                    <li className='mb-4 mt-4'><span className='font-bold text-xl '>Class: </span> <span className='text-xl ml-32'>{userData.Class}</span></li>

                                    <li className='mb-4 mt-4'><span className='font-bold text-xl '>Batch: </span> <span className='text-xl ml-32 '>{userData.Batch}</span></li>

                                    <li className='mb-4 mt-4'><span className='font-bold text-xl '>Absent: </span> <span className='text-xl ml-28 '>{attendanceCount0} days</span></li>

                                    <li className='mb-4 mt-4'><span className='font-bold text-xl '>Present: </span> <span className='text-xl ml-28 '>{attendanceCount1} days</span></li>


                                </ul>
                            </div>
                            <div className="ctMarksData mx-60">
                                <h4 className='font-bold text-2xl text-blue-500 mt-4 border-t-4 border-blue-700 mb-2'>CT Marks Data:</h4>
                                <table className="table table-bordered" style={{ backgroundColor: 'white' }}>
                                    <thead className='border-r-4'>
                                        <tr className='border-r-4'>
                                            <th className='border-r-4 font-bold'>CT Number</th>
                                            <th className='border-r-4 font-bold'>Obtain</th>
                                            <th className='border-r-4 font-bold'>Highest</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ctData.map((entry, index) => (
                                            <tr key={index}>
                                                <td className='border-r-4'>{`Ct-${index + 1}`}</td>
                                                <td className='border-r-4'>{entry.Obtain}</td>
                                                <td className='border-r-4'>{entry.Highest}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="text-center mb-4 mt-8">
                                <button onClick={handlePrint} className="print__button btn btn-md text-blue-800">
                                    Print
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
