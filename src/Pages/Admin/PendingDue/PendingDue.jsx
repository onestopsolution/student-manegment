import React from 'react';

const PendingDue = () => {
    return (
        <div className='mt-10'>
            <h1 className='text-center text-3xl font-bold bg-indigo-200 rounded-lg px-5 py-2 border-x-4 border-black'>Due Payment Table</h1>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-black'>
                            <th></th>
                            <th>Name</th>
                            <th>Due Amount</th>
                            <th>Total Due Months</th>
                            <th>Last Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr className='text-center'>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>5000</td>
                            <td>1</td>
                            <td>12.08.23</td>
                        </tr>
                        {/* row 2 */}
                        <tr className='text-center'>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {/* row 3 */}
                        <tr className='text-center'>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingDue;