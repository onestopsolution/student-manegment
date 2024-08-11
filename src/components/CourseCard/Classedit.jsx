import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const Classedit = () => {
    const Jobdetail = useLoaderData();
    console.log(Jobdetail)
    const {_id,Image,Name,InstructorName,AvailableSeats,Price} = Jobdetail;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
    fetch(` https://asteriactg.com/adminDashboard/update/${_id}`, {
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
        <div className='form-control w-full mb-4 '>
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      <label className="label"><span className="label-text text-xl font-semibold text-black">Image</span></label>
      <input type="url"   {...register('Image')}  placeholder="image link" defaultValue={Image} className="file-input file-input-bordered w-full text-white pl-5" disabled />
     
      </div>
       <div className="form-control w-full mb-4">
                <label className="label ">
                    <span className="label-text text-xl font-semibold text-black">Class Name</span>
                </label>
      <input
        className="input input-bordered w-full text-black bg-white"
         {...register('Name')}
       
         defaultValue={Name}
      />
      </div>
    
      <div className="form-control w-full mb-4">
                <label className="label">
                    <span className="label-text text-xl font-semibold text-black">Instructor Name</span>
                </label>
      <input
       className="input input-bordered w-full text-black bg-white"
         {...register('InstructorName')}
         defaultValue={InstructorName}
     
      />
     
      </div>
    
    
      <div className="form-control w-full mb-4">
                    <label className="label ">
                        <span className="label-text text-xl font-semibold text-black">Price</span>
                    </label>
      <input
       className="input input-bordered w-full text-black bg-white"
         {...register('Price')}
        placeholder="Price"
        type="number"
        defaultValue={Price}
      />
      </div>
      <div className="form-control w-full mb-4">
                    <label className="label-text text-xl font-semibold text-black">Available Seats</label>
      <input
       className="input input-bordered w-fulltext-black bg-white"
         {...register('AvailableSeats', { required: true })}
        placeholder="Available Seats"
        type="number"
         defaultValue={AvailableSeats}
      /></div>
      
     
      <input className="btn btn-primary btn-lg mt-5" type="submit" value="Update Class" />
      
    </form>
  </div>
</div>
    </div>
    );
};

export default Classedit;