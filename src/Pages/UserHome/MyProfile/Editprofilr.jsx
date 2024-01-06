import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Providers/AuthProvider';
const img_hosting_key = import.meta.env.VITE_Image_Upload;
const Editprofilr = () => {
    const {user}=useContext(AuthContext);
    const Jobdetail = useLoaderData();
    console.log(Jobdetail)
    const {  _id,stuid,
        name,
        brithday,
        fatherName,
        fatherNumber,
        motherName,
        email,
        motherNumber,
        WhatsAppNumber,
        instituteName,
        Batch,
        Class,
        location,
        Payment,
        Amount,
        Image} = Jobdetail;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        fetch(` https://intern-first-server-farjanaakterlaila.vercel.app/edit/${_id}`, {
          method: "POST",
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
                <h3 className="text-3xl text-center">Edit Profile</h3>
            </div>
            <div className="flex justify-center items-center">
                <div className="w-4/5 text-black py-5 bg-gradient-to-r from-indigo-200 to-purple-200 bg-opacity-40 rounded-2xl px-10">
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
                        <div className='form-control w-full mb-4 '>
                            {/* {errors.exampleRequired && <span>This field is required</span>} */}
                            <label className="label"><span className="label-text text-xl font-semibold text-black">Image</span></label>
                            <input type="url"   {...register("Image", { required: true })} 
                            defaultValue={Image}
                            className="file-input file-input-bordered w-full pl-2" />

                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Id</span>
                            </label>
                            <input
                                className="input input-bordered w-full "
                                value={stuid}
                                {...register('stuid')}
                               
                            
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Name</span>
                            </label>
                            <input
                                className="input input-bordered w-full "
                                {...register('name')}
                                
                            defaultValue={name}
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Brithday</span>
                            </label>
                            <input
                                className="input input-bordered w-full "
                                defaultValue={brithday}
                                {...register('brithday')}
                                type="date"
                            // defaultValue={name}
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Email</span>
                            </label>
                            <input
                                className="input input-bordered w-full "
                                value={email}
                                {...register('email')}
                                placeholder='ABC@gmail.com'
                            // defaultValue={name}
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Father's Name</label>
                            <input
                                className="input input-bordered w-full "
                                defaultValue={fatherName}
                                {...register('fatherName')}
                                placeholder="Father's Name"
                            />
                        </div>

                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Father's Number</label>
                            <input
                                type="tel" // Use type="tel" for phone numbers
                                className="input input-bordered w-full "
                                defaultValue={fatherNumber}
                                {...register('fatherNumber')}
                                placeholder="Father's Number"
                                pattern="^\d{11}$" // Regular expression for exactly 11 digits
                                title="Please enter a valid mobile number with exactly 11 digits"
                            />
                        </div>



                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Mother's Name</label>
                            <input
                                className="input input-bordered w-full "
                                defaultValue={motherName}
                                {...register('motherName')}
                                placeholder="Mother's Name"
                            />
                        </div>

                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Mother's Number</label>
                            <input
                                type="tel" // Use type="tel" for phone numbers
                                className="input input-bordered w-full "
                               defaultValue={motherNumber}
                                {...register('motherNumber')}
                                placeholder="Mother's Number"
                                pattern="^\d{11}$" // Regular expression for exactly 11 digits
                                title="Please enter a valid mobile number with exactly 11 digits"
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">WhatsApp Number</label>

                            <input
                                type="tel" // Use type="tel" for phone numbers
                                className="input input-bordered w-full "
                                defaultValue={WhatsAppNumber}
                                {...register('WhatsAppNumber')}
                                placeholder="WhatsApp Number"
                                pattern="^\d{11}$" // Regular expression for exactly 11 digits
                                title="Please enter a valid mobile number with exactly 11 digits"
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Location</label>
                            <input
                                className="input input-bordered w-full "
                                defaultValue={location}
                                {...register('location')}
                                placeholder="Location"
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Institute Name</label>
                            <input
                                className="input input-bordered w-full "
                                defaultValue={instituteName}
                                {...register('instituteName')}
                                placeholder="Institute Name"
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Class</label>
                            <input
                                className="input input-bordered w-full "
                               
                                {...register('Class')}
                                value={Class}
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Batch</label>
                            <input
                                className="input input-bordered w-full "
                                
                                {...register('Batch')}
                                value={Batch}
                            />
                        </div>
                         <input className="btn btn-primary btn-lg mt-5" type="submit" value="Update Profile" />

                    </form>
                </div>
            </div>
        </div>

    );
};

export default Editprofilr;