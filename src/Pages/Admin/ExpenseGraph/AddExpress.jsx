import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddExpress = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [paymentSum, setPaymentSum] = useState();

    useEffect(() => {
        // Fetch the payment sum from the API endpoint
        fetch(' https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/instructors/paymentSum')
            .then((res) => res.json())
            .then((data) => {
                console.log(data.paymentSum);
                setPaymentSum(data.paymentSum);
            })
            .catch((error) => {
                console.error('Error fetching payment sum:', error);
            });
    }, []);
    const onSubmit = data => {
        fetch(' https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/express', {
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
    }
    return (
        <div className='w-11/12 mx-5 mt-5'>
            <div className="uppercase font-bold bg-gradient-to-r from-indigo-200 to-purple-400 mb-10 py-3 rounded-full border-x-4 border-black border-b-2">
                <h3 className="text-3xl text-center">Add Express</h3>
            </div>
            <div className="flex justify-center items-center">
                <div className="w-4/5 text-black py-5 bg-gradient-to-r from-indigo-200 to-purple-200 bg-opacity-40 rounded-2xl px-10">
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>

                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Month</span>
                            </label>
                            <input
                                className="input input-bordered w-full text-black bg-white"
                                {...register('name')}
                                placeholder="January"
//type="data"

                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Total Teacher Payment</span>
                            </label>
                            <input
                                className="input input-bordered w-full text-black bg-white"
                                {...register('teacherPayment')}
                                placeholder="10000"
                                type="number"
                                value={paymentSum}
                            />
                        </div>

                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text text-xl font-semibold text-black">Marketing</span>
                            </label>
                            <input
                                className="input input-bordered w-full text-black bg-white"
                                {...register('marketing')}
                                placeholder="1"
                                type="number"

                            />

                        </div>


                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Stuff and Director salary</span>
                            </label>
                            <input
                                className="input input-bordered w-full text-black bg-white"
                                {...register('stuff_salary')}
                                placeholder="10000"
                                type="number"

                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Stationary</label>
                            <input
                                className="input input-bordered w-fulltext-black bg-white"
                                {...register('stationary')}
                                placeholder="10000"
                                type="number"

                            /></div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Utility</label>
                            <input
                                className="input input-bordered w-fulltext-black bg-white"
                                {...register('utility')}
                                placeholder="10000"
                                type="number"

                            /></div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Event Entertainment</label>
                            <input
                                className="input input-bordered w-fulltext-black bg-white"
                                {...register('event_Entertainment')}
                                placeholder="10000"
                                type="number"

                            /></div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">
                                Exam Invigilator
                            </label>
                            <input
                                className="input input-bordered w-fulltext-black bg-white"
                                {...register('examInvigilator')}
                                placeholder="10000"
                                type="number"

                            /></div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Exam copy Checker</label>
                            <input
                                className="input input-bordered w-fulltext-black bg-white"
                                {...register('copyChecker')}
                                placeholder="1000"
                                type="number"

                            /></div>


                        <input className="btn btn-primary btn-lg mt-5" type="submit" value="Update Payment" />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddExpress;