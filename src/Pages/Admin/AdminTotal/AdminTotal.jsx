import React, { useEffect, useState } from 'react';

const AdminTotal = () => {

    const [classBatchData, setClassBatchData] = useState([]);
    const [totalClasses, setTotalClasses] = useState([]);
    const [totalBatches, setTotalBatches] = useState([]);

    useEffect(() => {
        // Fetch class and batch data from your API
        fetch("https://intern-first-server-farjanaakterlaila.vercel.app/BatchClass")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setClassBatchData(data);

                // Calculate the total number of unique classes and batches
                const uniqueClasses = new Set();
                const uniqueBatches = new Set();

                data.forEach(item => {
                    if (item.Class) {
                        uniqueClasses.add(item.Class);
                    }
                    if (item.Batch) {
                        uniqueBatches.add(item.Batch);
                    }
                });
console.log(uniqueClasses.size)
console.log(uniqueBatches.size)
                setTotalClasses(uniqueClasses.size);
                setTotalBatches(uniqueBatches.size);
            })
            .catch(error => {
                console.error('Error fetching classes and batches:', error);
            });
    }, []);
    const [expenseData, setExpenseData] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        // Fetch data from the provided URL
        fetch("https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/express")
            .then(response => response.json())
            .then(data => {
                setExpenseData(data);

                // Calculate the total expenses
                const expenses = data.reduce((total, item) => {
                    // Iterate over all properties except "_id" and "name"
                    Object.keys(item).forEach(key => {
                        if (key !== "_id" && key !== "name") {
                            //console.log(total)
                            total += parseFloat(item[key] || 0);
                        }
                    });
                    return total;
                }, 0);

                setTotalExpenses(expenses);
            })
            .catch(error => {
                console.error('Error fetching expenses data:', error);
            });
    }, []);
    const [paymentSum, setPaymentSum] = useState();

    useEffect(() => {
        // Fetch the payment sum from the API endpoint
        fetch(' https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/instructors/dueamountSum')
            .then((res) => res.json())
            .then((data) => {
                console.log(data.paymentSum);
                setPaymentSum(data.paymentSum);
            })
            .catch((error) => {
                console.error('Error fetching payment sum:', error);
            });
    }, []);
    return (
        <div className='flex flex-col lg:flex-row flex-wrap gap-10'>
            <div className="stats shadow-2xl shadow-black w-60 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 bg-black bg-opacity-90 hover:bg-indigo-500 hover:text-white duration-300 ">

                <div className="stat">
                    <div className="stat-title text-white">Total Students</div>
                    <div className="stat-value text-slate-300 hover:text-white">89,400</div>
                </div>

            </div>
            <div className="stats bg-black bg-opacity-90 shadow-2xl shadow-black w-60 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300 ">

                <div className="stat">
                    <div className="stat-title text-white">Total Batch</div>
                    <div className="stat-value text-slate-300 hover:text-white">{totalBatches}</div>
                </div>

            </div>
            <div className="stats bg-black bg-opacity-90 shadow-2xl shadow-black w-60 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300 ">

                <div className="stat">
                    <div className="stat-title text-white">Total Classes</div>
                    <div className="stat-value text-slate-300 hover:text-white">{totalClasses}</div>
                </div>

            </div>
            <div className="stats bg-black bg-opacity-90 shadow-2xl shadow-black w-60 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300 ">

                <div className="stat">
                    <div className="stat-title text-white">Total Income</div>
                    <div className="stat-value text-slate-300 hover:text-white">89,400</div>
                </div>

            </div>
            <div className="stats bg-black bg-opacity-90 shadow-2xl shadow-black w-60 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300 ">

                <div className="stat">
                    <div className="stat-title text-white">Total Profit</div>
                    <div className="stat-value text-slate-300 hover:text-white">89,400</div>
                </div>

            </div>
            <div className="stats bg-black bg-opacity-90 shadow-2xl shadow-black w-60 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300 ">

                <div className="stat">
                    <div className="stat-title text-white">Total Expense</div>
                    <div className="stat-value text-slate-300 hover:text-white">{totalExpenses}</div>
                </div>

            </div>
            <div className="stats bg-black bg-opacity-90 shadow-2xl shadow-black w-60 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300 ">

                <div className="stat">
                    <div className="stat-title text-white">Total Techer Due Amount</div>
                    <div className="stat-value text-slate-300 hover:text-white">{paymentSum}</div>
                </div>

            </div>
           
        </div>
    );
};

export default AdminTotal;