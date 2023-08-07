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
    fetch(`https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/update/${_id}`, {
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
        <div className='w-full px-10 '>
        <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
            <h3 className="text-3xl">Update Class</h3>
        </div>
        <div className="flex justify-center items-center">
  <div className="w-5/12   text-black p-8 border bg-indigo-300 bg-opacity-40">
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-control w-full mb-4 '>
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      <label className="label"><span className="label-text text-xl font-semibold text-black">Image</span></label>
      <input type="url"   {...register('Image')}  placeholder="image link" defaultValue={Image} className="file-input file-input-bordered w-full text-white " />
     
      </div>
       <div className="form-control w-full mb-4">
                <label className="label ">
                    <span className="label-text text-xl font-semibold text-black">Class Name</span>
                </label>
      <input
        className="input input-bordered w-full text-white"
         {...register('Name')}
       
         defaultValue={Name}
      />
      </div>
    
      <div className="form-control w-full mb-4">
                <label className="label">
                    <span className="label-text text-xl font-semibold text-black">Instructor Name</span>
                </label>
      <input
       className="input input-bordered w-full text-white"
         {...register('InstructorName')}
         defaultValue={InstructorName}
     
      />
     
      </div>
    
    
      <div className="form-control w-full mb-4">
                    <label className="label ">
                        <span className="label-text text-xl font-semibold text-black">Price</span>
                    </label>
      <input
       className="input input-bordered w-full text-white"
         {...register('Price')}
        placeholder="Price"
        type="number"
        defaultValue={Price}
      />
      </div>
      <div className="form-control w-full mb-4">
                    <label className="label-text text-xl font-semibold text-black">Available Seats</label>
      <input
       className="input input-bordered w-full text-white"
         {...register('AvailableSeats', { required: true })}
        placeholder="Available Seats"
        type="number"
         defaultValue={AvailableSeats}
      /></div>
      
     
      <input className="btn btn-lg  mt-4 mx-48" type="submit" value="Add Class" />
      
    </form>
  </div>
</div>
    </div>
    );
};

export default Classedit;