import React from 'react';

const ClassRoutine = () => {
    return (
        <div className='my-10 mx-10'>
            <h1 data-aos="flip-down" data-aos-duration="3000" className='text-center font-bold text-3xl mb-5 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full py-2 border-b-4 border-black'>Class Routine</h1>
            <div data-aos="fade-right" data-aos-duration="3000" className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='text-center text-black'>Day</th>
                            <th className='text-center text-black'>Time</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr className='text-black'>
                            <th></th>
                            <th>10.00 am - 11.30am</th>
                            <th>12.00pm - 1.00pm</th>
                            <th>1.00pm - 2.00pm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <td>Sunday</td>
                            <td></td>
                            <td></td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <td>Monday</td>
                            <td></td>
                            <td></td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <td>Tuesday</td>
                            <td></td>
                            <td></td>
                        </tr>
                        {/* row 4 */}
                        <tr>
                            <td>Wednesday</td>
                            <td></td>
                            <td></td>
                        </tr>
                        {/* row 5 */}
                        <tr>
                            <td>Thursday</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClassRoutine;