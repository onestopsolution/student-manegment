import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const PayDetails = () => {
    const Jobdetail = useLoaderData();
    console.log(Jobdetail._id)
    const {_id,name,totalamount,totalClass,payamount,totalduemonths,paydate,dueamount} = Jobdetail;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
    fetch(`https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/pay/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.modifiedCount > 0) {
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
            <h3 className="text-3xl text-center">Update Class</h3>
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
       
         defaultValue={name}
      />
      </div>
    
      <div className="form-control w-full mb-4">
                <label className="label">
                    <span className="label-text text-xl font-semibold text-black">Total Class:</span>
                </label>
      <input
       className="input input-bordered w-full text-black bg-white"
         {...register('totalClass')}
         placeholder="1"
         type="number"
         defaultValue={totalClass}
      />
     
      </div>
    
    
      <div className="form-control w-full mb-4">
                    <label className="label ">
                        <span className="label-text text-xl font-semibold text-black">Total Amount:</span>
                    </label>
      <input
       className="input input-bordered w-full text-black bg-white"
         {...register('totalamount')}
        placeholder="1"
        type="number"
        defaultValue={totalamount}
      />
      </div>
      <div className="form-control w-full mb-4">
                    <label className="label-text text-xl font-semibold text-black">Pay Amount</label>
      <input
       className="input input-bordered w-fulltext-black bg-white"
         {...register('payamount', { required: true })}
        placeholder="10000"
        type="number"
         defaultValue={payamount}
      /></div>
      <div className="form-control w-full mb-4">
                    <label className="label-text text-xl font-semibold text-black">Due Amount</label>
      <input
       className="input input-bordered w-fulltext-black bg-white"
         {...register('dueamount', { required: true })}
        placeholder="10000"
        type="number"
         defaultValue={dueamount}
      /></div>
      <div className="form-control w-full mb-4">
                    <label className="label-text text-xl font-semibold text-black">Total Due Months</label>
      <input
       className="input input-bordered w-fulltext-black bg-white"
         {...register('totalduemonths', { required: true })}
        placeholder="1"
        type="number"
         defaultValue={totalduemonths}
      /></div>
      <div className="form-control w-full mb-4">
                    <label className="label-text text-xl font-semibold text-black">Last Pay Date</label>
      <input
       className="input input-bordered w-fulltext-black bg-white"
         {...register('paydate', { required: true })}
        placeholder="mm/dd/yyyy"
        type="date"
         defaultValue={paydate}
      /></div>
      
     
      <input className="btn btn-primary btn-lg mt-5" type="submit" value="Update Payment" />
      
    </form>
  </div>
</div>
    </div>
    );
};

export default PayDetails;