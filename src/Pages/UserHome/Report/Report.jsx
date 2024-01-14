import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useReactToPrint } from 'react-to-print';

const Report = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [attendanceCount1, setAttendanceCount1] = useState(0);
    const [attendanceCount0, setAttendanceCount0] = useState(0);
    const [attendanceData, setAttendanceData] = useState([]);
    const [ctData, setCTData] = useState([]);

    useEffect(() => {
        fetch(` https://intern-first-server-farjanaakterlaila.vercel.app/post-toy?email=${user?.email}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    const userData = data[0];
                    const messageHistory = userData.message_history;
                    const ctMarksData = messageHistory.filter((entry) => entry.ctname && entry.Highest && entry.Obtain);
                    setCTData(ctMarksData);
                    setAttendanceData(data[0].attendance_history);
                    setUserData(data[0]);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [user]);


    useEffect(() => {
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

    const calculateGPAAndGrade = (obtain) => {
        let gpa = 0;
        let grade = '';
    
        if (obtain >= 80) {
            gpa = 5.0;
            grade = 'A+';
        } else if (obtain >= 70 && obtain <= 79) {
            gpa = 4.0;
            grade = 'A';
        } else if (obtain >= 60 && obtain <= 69) {
            gpa = 3.5;
            grade = 'A-';
        } else if (obtain >= 50 && obtain <= 59) {
            gpa = 3.0;
            grade = 'B';
        } else if (obtain >= 40 && obtain <= 49) {
            gpa = 2.0;
            grade = 'C';
        } else if (obtain >= 33 && obtain <= 39) {
            gpa = 1.0;
            grade = 'D';
        } else {
            gpa = 0.0;
            grade = 'F';
        }
    
        return { gpa, grade };
    };
    const calculateTotalGPAAndGrade = () => {
        let totalGPA = 0;

        ctData.forEach((entry) => {
            const { gpa } = calculateGPAAndGrade(entry.Obtain);
            totalGPA += gpa;
        });

        const averageGPA = totalGPA / ctData.length;
        let totalGrade = '';

        // Determine the total grade based on the average GPA
        if (averageGPA >= 4.50) {
            totalGrade = 'A+';
        } else if (averageGPA >= 3.50) {
            totalGrade = 'A';
        } else if (averageGPA >= 2.50) {
            totalGrade = 'B';
        } else if (averageGPA >= 1.50) {
            totalGrade = 'C';
        } else if (averageGPA >= 1.00) {
            totalGrade = 'D';
        } else {
            totalGrade = 'F';
        }
        return { totalGPA: averageGPA, totalGrade };
    };
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const { totalGPA , totalGrade} = calculateTotalGPAAndGrade();
    return (
        <div className="print__section mt-10 mb-8 font-serif">
            <div className="container mx-auto">
                <div className="lg:grid lg:grid-cols-1 p-4">
                    <div className="col-md-12 p-0 bg-gradient-to-r from-indigo-100 to-purple-100 bg-opacity-40">
                        <div className="lg:mr-4">
                            <div ref={componentRef} className="card">
                                <div className="float__start">
                                    <div className="border border-blue-700 m-4">
                                        <h3 className="font-bold text-xl py-2 mb-0 text-center text-black-800">
                                            OneStop Solution
                                        </h3>
                                    </div>
                                    <h3 className="font-bold text-3xl py-4 mb-0 text-center text-blue-800 border-b-0">Student Report Card</h3>
                                </div>
                                <div className="container mx-1 lg:mx-40 flex flex-col lg:flex-row">
                                    <div className="float__infoss">
                                        <ul className='lg:mt-4'>
                                            <li><span className="font-bold text-xl">Name:</span> <span className="text-xl ml-4">{userData.name}</span></li>
                                            <li className="mb-4 mt-4 lg:mb-0 lg:mt-0"><span className="font-bold text-xl">Class:</span> <span className="text-xl ml-4">{userData.Class}</span></li>
                                            <li className="mb-4 mt-4 lg:mb-0 lg:mt-0"><span className="font-bold text-xl">Batch:</span> <span className="text-xl ml-4">{userData.Batch}</span></li>
                                            <li className="mb-4 mt-4 lg:mb-0 lg:mt-0"><span className="font-bold text-xl">Absent:</span> <span className="text-xl ml-4">{attendanceCount0} days</span></li>
                                            <li className="mb-4 mt-4 lg:mb-0 lg:mt-0"><span className="font-bold text-xl">Present:</span> <span className="text-xl ml-4">{attendanceCount1} days</span></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <table className="table table-bordered ml-0 mr-0 lg:ml-40"  style={{ border: '2px solid black' }}>
                                            <thead  style={{ border: '2px solid black' }}>
                                                <tr >
                                                    <th  style={{ border: '2px solid black' }}className="text-black">Grade</th>
                                                    <th  style={{ border: '2px solid black' }}className="text-black">Point</th>
                                                    <th  style={{ border: '2px solid black' }}className="text-black">Interval</th>
                                                </tr>
                                            </thead>
                                            <tbody  style={{ border: '2px solid black' }}>
                                                <tr >
                                                    <td  style={{ border: '2px solid black' }}>A+</td>
                                                    <td  style={{ border: '2px solid black' }}>5.00</td>
                                                    <td  style={{ border: '2px solid black' }}>80.00 - 100.00</td>
                                                </tr>
                                                <tr>
                                                    <td  style={{ border: '2px solid black' }}>A</td>
                                                    <td  style={{ border: '2px solid black' }}>4.00 - 4.99</td>
                                                    <td style={{ border: '2px solid black' }}>70.00 - 79.99</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ border: '2px solid black' }}>A-</td>
                                                    <td style={{ border: '2px solid black' }}>3.50 - 3.99</td>
                                                    <td style={{ border: '2px solid black' }}>60.00 - 69.99</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ border: '2px solid black' }}>B</td>
                                                    <td style={{ border: '2px solid black' }}>3.00 - 3.49</td>
                                                    <td style={{ border: '2px solid black' }}>50.00 - 59.99</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ border: '2px solid black' }}>C</td>
                                                    <td style={{ border: '2px solid black' }}>2.00 - 2.99</td>
                                                    <td style={{ border: '2px solid black' }}>40.00 - 49.99</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ border: '2px solid black' }}>D</td>
                                                    <td style={{ border: '2px solid black' }}>1.00 - 1.99</td>
                                                    <td style={{ border: '2px solid black' }}>33.00 - 39.99</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            
                            <div className="ctMarksData mx-0 lg:mx-4 mt-4">
                                <table className="table table-bordered " style={{ border: '2px solid black' }}>
                                    <thead style={{ border: '2px solid black' }}>
                                        <tr style={{ border: '2px solid black' }}>
                                            <th style={{ border: '2px solid black' }} className="text-black">CT Number</th>
                                            <th style={{ border: '2px solid black' }} className="text-black">Obtain</th>
                                            <th style={{ border: '2px solid black' }} className="text-black">Grade</th>
                                            <th style={{ border: '2px solid black' }} className="text-black">GPA</th>
                                            <th style={{ border: '2px solid black' }} className="text-black">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ctData.map((entry, index) => {
                                            const { gpa, grade } = calculateGPAAndGrade(entry.Obtain);

                                            return (
                                                <tr key={index} style={{ border: '2px solid black' }}>
                                                    <td style={{ border: '2px solid black' }}>{`Ct-${index + 1}`}</td>
                                                    <td style={{ border: '2px solid black' }}>{entry.Obtain}</td>
                                                    <td style={{ border: '2px solid black' }}>{grade}</td>
                                                    <td style={{ border: '2px solid black' }}>{gpa}</td>
                                                  
                                                    {index === 0 && (
                                            <td rowSpan={ctData.length} style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                               {totalGPA.toFixed(2)}
                                            </td>
                                        //     <td rowSpan={ctData.length} className="lg:vertical-align-middle lg:text-center" style={{ border: '2px solid black' }}>
                                        //     {totalGPA.toFixed(2)}
                                        // </td>
                                                 
                                        )}
                                                </tr>
                                           
                                            );
                                        })}
                                 
                         
                                    </tbody>
                                </table>
                                </div>
                                <div className="mt-4 text-black text-sm mx-10 ">
                                Signature: ________________
                            </div>
                            </div>
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

    );
};

export default Report;