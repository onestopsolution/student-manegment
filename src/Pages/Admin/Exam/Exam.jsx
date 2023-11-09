import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const Exam = () => {
    const Jobdetail = useLoaderData();
    console.log(Jobdetail._id)
    const { _id, name,Batch,Class,WhatsAppNumber,message } = Jobdetail;
    console.log("id:",_id)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        fetch(`  https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/sendmessage/${_id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            
        })
            .then((res) => res.json()
        
            )
            .then((result) => {
                console.log(data);
                console.log(result);
                if (result.ok) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Updated Successfully',
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
            <h3 className="text-3xl text-center">Update Payment</h3>
        </div>
        <div className="flex justify-center items-center">
            <div className="w-4/5 text-black py-5 bg-gradient-to-r from-indigo-200 to-purple-200 bg-opacity-40 rounded-2xl px-10">
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>

                    <div className="form-control w-full mb-4">
                        <label className="label ">
                            <span className="label-text text-xl font-semibold text-black">Name</span>
                        </label>
                        <input
                            className="input input-bordered w-full text-black bg-white"
                            {...register('name')}

                           value={name}
                        />
                    </div>

                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text text-xl font-semibold text-black">Batch</span>
                        </label>
                        <input
                            className="input input-bordered w-full text-black bg-white"
                            {...register('Batch')}
                           
                           value={Batch}
                        />

                    </div>


                    <div className="form-control w-full mb-4">
                        <label className="label ">
                            <span className="label-text text-xl font-semibold text-black">Class</span>
                        </label>
                        <input
                            className="input input-bordered w-full text-black bg-white"
                            {...register('Class')}
                            
                            value={Class}
                        />
                    </div>
                    <div className="form-control w-full mb-4">
                        <label className="label-text text-xl font-semibold text-black">Mobile Number</label>
                        <input
                            className="input input-bordered w-fulltext-black bg-white"
                            {...register('WhatsAppNumber')}
                           type='text'
                            defaultValue={WhatsAppNumber}
                        /></div>
                    <div className="form-control w-full mb-4">
                        <label className="label-text text-xl font-semibold text-black">CT Number</label>
                        <input
                            className="input input-bordered w-fulltext-black bg-white"
                            {...register('ctname')}
                           type='text'
                           placeholder='CT-1'
                            //defaultValue={WhatsAppNumber}
                        /></div>
                    <div className="form-control w-full mb-4">
                        <label className="label-text text-xl font-semibold text-black">Highest Marks</label>
                        <input
                            className="input input-bordered w-fulltext-black bg-white"
                            {...register('Highest')}
                           type='number'
                           placeholder='10'
                            //defaultValue={WhatsAppNumber}
                        /></div>
                    <div className="form-control w-full mb-4">
                        <label className="label-text text-xl font-semibold text-black">Obtain</label>
                        <input
                            className="input input-bordered w-fulltext-black bg-white"
                            {...register('Obtain')}
                           type='number'
                           placeholder='10'
                            //defaultValue={WhatsAppNumber}
                        /></div>
                    <div className="form-control w-full mb-4">
                        <label className="label-text text-xl font-semibold text-black">CT Mark</label>
                        <input
                            className="input input-bordered w-fulltext-black bg-white"
                            {...register('message')}
                           
                            type="text"
                            
                        /></div>
                   
                    
                   


                    <input className="btn btn-primary btn-lg mt-5" type="submit" value="Update Payment" />

                </form>
            </div>
        </div>
    </div>
    );
};

export default Exam;
