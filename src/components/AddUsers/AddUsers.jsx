import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddUsers = () => {
   
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
   
      fetch("https://asteriactg.com/user", {
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
      console.log(data);
    }
    return (
        <div className='w-11/12 mx-5 mt-5'>
        <div className="uppercase font-bold bg-gradient-to-r from-indigo-200 to-purple-400 mb-10 py-3 rounded-full border-x-4 border-black border-b-2">
            <h3 className="text-3xl text-center">Add A New Users</h3>
        </div>
        <div className="flex justify-center items-center">
            <div className="w-4/5 text-black py-5 bg-gradient-to-r from-indigo-200 to-purple-200 bg-opacity-40 rounded-2xl px-10">
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
                    <div className='form-control w-full mb-4 '>
                        {/* {errors.exampleRequired && <span>This field is required</span>} */}
                        <label className="label"><span className="label-text text-xl font-semibold text-black">Image</span></label>
                        <input  {...register("image")}
              placeholder="Image link"
              type="url"className="input input-bordered w-full text-black bg-white" />

                    </div>
                    <div className="form-control w-full mb-4">
                        <label className="label ">
                            <span className="label-text text-xl font-semibold text-black">Name:</span>
                        </label>
                        <input
                            className="input input-bordered w-full text-black bg-white"
                            {...register('name')}
                            placeholder="Name"
                        // defaultValue={name}
                        />
                    </div>

                    

                    <div className="form-control w-full mb-4">
                        <label className="label ">
                            <span className="label-text text-xl font-semibold text-black">Email</span>
                        </label>
                        <input
                            className="input input-bordered w-full text-black bg-white"
                            {...register('email')}
                            placeholder="Email"
                        />

                    </div>
                    


                    <input className="btn btn-primary btn-lg mt-5" type="submit" value="Add User" />

                </form>
            </div>
        </div>
    </div>
    );
};

export default AddUsers;