import React from 'react';

const AdminTotal = () => {
    return (
        <div className='flex flex-col lg:flex-row flex-wrap gap-10'>
            <div className="stats shadow-2xl shadow-black w-60 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300 ">

                <div className="stat">
                    <div className="stat-title text-white">Total Students</div>
                    <div className="stat-value">89,400</div>
                </div>

            </div>
            <div className="stats shadow-2xl shadow-black w-60 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300 ">

                <div className="stat">
                    <div className="stat-title text-white">Total Courses</div>
                    <div className="stat-value">89,400</div>
                </div>

            </div>
            <div className="stats shadow-2xl shadow-black w-60 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300 ">

                <div className="stat">
                    <div className="stat-title text-white">Total Income</div>
                    <div className="stat-value">89,400</div>
                </div>

            </div>
            <div className="stats shadow-2xl shadow-black w-60 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300 ">

                <div className="stat">
                    <div className="stat-title text-white">Total Profit</div>
                    <div className="stat-value">89,400</div>
                </div>

            </div>
            <div className="stats shadow-2xl shadow-black w-60 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300 ">

                <div className="stat">
                    <div className="stat-title text-white">Total Expense</div>
                    <div className="stat-value">89,400</div>
                </div>

            </div>
           
        </div>
    );
};

export default AdminTotal;