import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Addincome = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [totalExpress, setTotalExpress] = useState(0);
  const [itemSum, setItemSum] = useState({
    teacherPayment: 0,
    marketing: 0,
    stuffSalary: 0,
    stationary: 0,
    utility: 0,
    eventEntertainment: 0,
    examInvigilator: 0,
    copyChecker: 0,
  });

  useEffect(() => {
    // Fetch data from the provided URL
    fetch(' https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/express')
      .then(response => response.json())
      .then(data => {
        setData(data);

        // Filter data for the selected month
        const filteredData = data.filter(item => item.name === selectedMonth);

        // Calculate the total express for the selected month
        // const calculatedTotalExpress = filteredData.reduce((acc, item) => {
        //     console.log(item)
        //   return acc + parseFloat(item.expense || 0);
        // }, 0);

        //setTotalExpress(calculatedTotalExpress);

        // Calculate sums for specific items
        const calculatedItemSum = {
          teacherPayment: filteredData.reduce((acc, item) => {
            return acc + parseFloat(item.teacherPayment || 0);
          }, 0),
          marketing: filteredData.reduce((acc, item) => {
            return acc + parseFloat(item.marketing || 0);
          }, 0),
          stuffSalary: filteredData.reduce((acc, item) => {
            return acc + parseFloat(item.stuff_salary || 0);
          }, 0),
          stationary: filteredData.reduce((acc, item) => {
            return acc + parseFloat(item.stationary || 0);
          }, 0),
          utility: filteredData.reduce((acc, item) => {
            return acc + parseFloat(item.utility || 0);
          }, 0),
          eventEntertainment: filteredData.reduce((acc, item) => {
            return acc + parseFloat(item.event_Entertainment || 0);
          }, 0),
          examInvigilator: filteredData.reduce((acc, item) => {
            return acc + parseFloat(item.examInvigilator || 0);
          }, 0),
          copyChecker: filteredData.reduce((acc, item) => {
            return acc + parseFloat(item.copyChecker || 0);
          }, 0),
        };
// console.log(calculatedItemSum.copyChecker+ calculatedItemSum.marketing+ calculatedItemSum.teacherPayment+calculatedItemSum.examInvigilator+calculatedItemSum.eventEntertainment+calculatedItemSum.utility+calculatedItemSum.stationary+calculatedItemSum.stuffSalary)

const allsum=(calculatedItemSum.copyChecker+ calculatedItemSum.marketing+ calculatedItemSum.teacherPayment+calculatedItemSum.examInvigilator+calculatedItemSum.eventEntertainment+calculatedItemSum.utility+calculatedItemSum.stationary+calculatedItemSum.stuffSalary);

        setItemSum(allsum);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const onSubmit = (data) => {
    fetch(' https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/addincome', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Insert Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            });
        console.log(data);
  };

  return (
    <div className='w-11/12 mx-5 mt-5'>
      <div className="uppercase font-bold bg-gradient-to-r from-indigo-200 to-purple-400 mb-10 py-3 rounded-full border-x-4 border-black border-b-2">
        <h3 className="text-3xl text-center">Add Express</h3>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-4/5 text-black py-5 bg-gradient-to-r from-indigo-200 to-purple-200 bg-opacity-40 rounded-2xl px-10">
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
            {/* Input field to enter the selected month */}
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text text-xl font-semibold text-black">Enter Month</span>
              </label>
              <input
                className="input input-bordered w-full text-black bg-white"
                type="text"
                {...register('selectedMonth')}
                value={selectedMonth}
                onChange={handleMonthChange}
                placeholder="January"
              />
            </div>
            {/* Display total express value */}
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text text-xl font-semibold text-black">Total Express</span>
              </label>
              <input
                className="input input-bordered w-full text-black bg-white"
                type="number"
                {...register('Express')}
                placeholder="10000"
                value={itemSum}
                readOnly
              />
            </div>
            {/* Input field for income */}
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text text-xl font-semibold text-black">Income</span>
              </label>
              <input
                className="input input-bordered w-full text-black bg-white"
                {...register('income')}
                placeholder="1"
                type="number"
              />
            </div>
            {/* Submit button */}
            <input className="btn btn-primary btn-lg mt-5" type="submit" value="Update Payment" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addincome;
