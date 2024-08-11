import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import Swal from 'sweetalert2';
const TeacherAttendance = () => {
    const { user, loading } = useContext(AuthContext);
    const [toys, setToys] = useState([]);
    const url = 'https://asteriactg.com/user';
    const [studentList, setStudentList] = useState([]);
    const [batchList, setBatchList] = useState([]);
    const [classList, setClassList] = useState([]);
    const [selectedBatches, setSelectedBatches] = useState({});
    const [selectedClasses, setSelectedClasses] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Function to format the date to display only the date part (YYYY-MM-DD)
    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        fetch(" https://asteriactg.com/BatchClass")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setBatchList(data);
                setClassList(data);
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
            });
    }, []);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const instructorData = data.filter((item) => item.role === "Instructor");
                setToys(instructorData);
            });
    }, []);

    const navigate = useNavigate();

    const handleAttendanceChange = (index, newAttendance, selectedBatch, selectedClass) => {
        const updatedToys = [...toys];
        const date = new Date().toISOString().split('T')[0]; // Get the selected date in the "YYYY-MM-DD" format

        // Update the student's attendance and lastAttendanceDate
        updatedToys[index].attendance = newAttendance;
        updatedToys[index].lastAttendanceDate = date;

        // Update the selected batch and class for the specific item
        updatedToys[index].selectedBatch = selectedBatch;
        updatedToys[index].selectedClass = selectedClass;

        setToys(updatedToys);

        const studentId = updatedToys[index]._id;
        console.log(studentId);

        // Update the attendance in the database with selectedBatch and selectedClass
        fetch(` https://asteriactg.com/teacher/${studentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ attendance: newAttendance, date, selectedBatch, selectedClass }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle success
                Swal.fire({
                  icon: 'success',
                  title: 'Attendance Updated',
                  text: 'Student attendance has been successfully updated!',
                });
            })
            .catch(error => {
                console.error('Error updating student attendance:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while updating attendance.',
                });
            });
    };

    const toggleShowAllHistory = (index) => {
        const updatedToys = [...toys];
        updatedToys[index].showAllHistory = !updatedToys[index].showAllHistory;
        setToys(updatedToys);
    };

    return (
        <div className='mt-10'>
            <h1 className='text-center text-3xl font-bold bg-indigo-200 rounded-lg px-5 py-2 border-x-4 border-black'>Attandance Table</h1>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Calendar
                    className='mb-4 mt-4 mx-80' 
                    onChange={date => setSelectedDate(date)}
                    value={selectedDate}
                />
            </div>

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-black text-xl border'>
                            <th className='border-2 border-black'></th>
                            <th className='border-2 border-black'>Name</th>
                            <th className='border-2 border-black'>Batch</th>
                            <th className='border-2 border-black'>Class</th>
                            <th className='border-2 border-black'>Last Attandance & Date</th>
                            <th className='border-2 border-black'>Parsent & Absent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            toys.map((item, index) => (
                                <tr key={item._id}>
                                    <th className='border-2 border-black'>{index + 1}</th>
                                    <td className='border-2 border-black'>{item.name}</td>
                                    <td className='border-2 border-black'>
                                        <select
                                            className="select select-bordered flex-grow"
                                            value={selectedBatches[item._id] || ''}
                                            onChange={(e) => setSelectedBatches({ ...selectedBatches, [item._id]: e.target.value })}
                                        >
                                            <option value="">All Batches</option>
                                            {batchList.map((batch) => (
                                                <option key={batch._id} value={batch.Batch}>
                                                    {batch.Batch}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className='border-2 border-black'>
                                        <select
                                            className="select select-bordered flex-grow"
                                            value={selectedClasses[item._id] || ''}
                                            onChange={(e) => setSelectedClasses({ ...selectedClasses, [item._id]: e.target.value })}
                                        >
                                            <option value="">All Classes</option>
                                            {classList.map((batch) => (
                                                <option key={batch._id} value={batch.Class}>
                                                    {batch.Class}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className='border-2 border-black'>
                                        <div>Date: {formatDate(item.lastAttendanceDate)}</div>
                                        <div>Attendance: {item.attendance}</div>
                                    </td>
                                    <td className="border-2 border-black">
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        value="1"
                                                       checked={item.attendance === 1}
                                                        onChange={() => handleAttendanceChange(index, 1, selectedBatches[item._id], selectedClasses[item._id])}
                                                    /> Present
                                                </label>
                                            </div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="0"
                                                    checked={item.attendance === 0}
                                                    onChange={() => handleAttendanceChange(index, 0, selectedBatches[item._id], selectedClasses[item._id])}
                                                /> Absent
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherAttendance;
