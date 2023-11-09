import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLoaderData } from 'react-router-dom';

function AttendanceCalendar() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [attendanceCount1, setAttendanceCount1] = useState(0); // Count of attendance '1'
  const [attendanceCount0, setAttendanceCount0] = useState(0); // Count of attendance '0'
  const Jobdetail = useLoaderData();
  const { _id } = Jobdetail;

  useEffect(() => {
    // Fetch the attendance history from the API endpoint
    fetch(`   https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/attendance/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.attendance_history)
        setAttendanceData(data.attendance_history);
      })
      .catch((error) => {
        console.error('Error fetching attendance history:', error);
      });
  }, [_id]);

  useEffect(() => {
    // Function to mark dates with attendance '1' and '0'
    const getMarkedDates = () => {
      const marked = {};
      let count1 = 0;
      let count0 = 0;

      attendanceData.forEach((item) => {
        const date = new Date(item.date);
        const formattedDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
console.log(formattedDate,item.attendance)
        if (item.attendance === 1) {
          marked[formattedDate] = { attendance: 1 };
          count1++;
        } else if (item.attendance === 0) {
          marked[formattedDate] = { attendance: 0 };
          count0++;
        }
      });

      setMarkedDates(marked);
      setAttendanceCount1(count1);
      setAttendanceCount0(count0);
    };

    getMarkedDates();
  }, [attendanceData]);

  // Custom function to determine tile (date) classes
  const tileClassName = ({ date }) => {
    const formattedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    // Check if the date is in the markedDates object and has attendance '1'
    if (formattedDate in markedDates && markedDates[formattedDate].attendance === 1) {
      return 'blue-day'; // Apply a custom class for dates with attendance '1'
    }

    // Check if the date is in the markedDates object and has attendance '0'
    if (formattedDate in markedDates && markedDates[formattedDate].attendance === 0) {
      return 'pink-day'; // Apply a custom class for dates with attendance '0'
    }

    const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

    if (dayOfWeek === 5 || dayOfWeek === 6) {
      // Friday (5) and Saturday (6)
      return 'red-day';
    } else {
      // Other days
      return 'black-day';
    }
  };

  return (
    <div>
      <h1 className='text-center w-full text-3xl font-semibold bg-indigo-500 text-white px-5 py-3 rounded-full border-x-4 border-black border-b-4 mb-10'>Attendance Calendar</h1>
      <div className='flex mb-10'>
        <p className=' text-xl mx-auto'><span className='font-bold'> Total Present: </span>{attendanceCount1}</p>
        <p className=' text-xl mx-auto'><span className='font-bold'> Total Absent:</span> {attendanceCount0}</p>
      </div>
      <Calendar
        tileContent={({ date }) => {
          const formattedDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          );
          if (formattedDate in markedDates) {
            return (
              <div className={` ${markedDates[formattedDate].attendance === '1' ? 'blue-day' : 'pink-day'}`}>
                
              </div>
            );
          }
        }}
        tileClassName={tileClassName} // Apply custom classes
      />
    </div>
  );
}

export default AttendanceCalendar;
