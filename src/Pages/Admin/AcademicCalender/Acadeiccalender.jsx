import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Acadeiccalender = () => {

    const [value, onChange] = useState(new Date());

    return (
        <div className='flex flex-col items-center my-10'>
            <h1 className='text-center w-full text-3xl font-semibold bg-indigo-500 text-white px-5 py-3 rounded-full border-x-4 border-black border-b-4 mb-10'>Academic Calender</h1>
            <Calendar onChange={onChange} value={value} />
        </div>
    );
};

export default Acadeiccalender;