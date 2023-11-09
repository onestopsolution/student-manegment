import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
const BatchCls = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = data => {
   
      fetch(" https://intern-first-server-farjanaakterlaila.vercel.app/BatchClass", {
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
              text: 'Added Successfully',
              icon: 'success',
              confirmButtonText: 'Okay'
            })
          }
        });
      console.log(data);}
    return (
        <div className='w-11/12 mx-5 mt-5'>
        <div className="uppercase font-bold bg-gradient-to-r from-indigo-200 to-purple-400 mb-10 py-3 rounded-full border-x-4 border-black border-b-2">
            <h3 className="text-3xl text-center">Class And Batch Update</h3>
        </div>
        <div className="flex justify-center items-center">
            <div className="w-4/5 text-black py-5 bg-gradient-to-r from-indigo-200 to-purple-200 bg-opacity-40 rounded-2xl px-10">
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>

                    <div className="form-control w-full mb-4">
                        <label className="label-text text-xl font-semibold text-black">Class</label>
                        <input
                       
                            className="input input-bordered w-full text-black bg-white"
                            {...register('Class')}
                            
                            placeholder="Enter Class"
                        />
                    </div>

                    <div className="form-control w-full mb-4">
                        <label className="label-text text-xl font-semibold text-black">Batch</label>
                        <input 
                            className="input input-bordered w-full text-black bg-white"
                            {...register('Batch')}
                            
                            placeholder="Enter Batch"
                        />
                    </div>

                    <input className="btn btn-primary btn-lg mt-5" type="submit" value="Add" />

                </form>
            </div>
        </div>
    </div>
    );
};

export default BatchCls;
