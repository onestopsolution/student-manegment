import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Providers/AuthProvider';
const img_hosting_key = import.meta.env.VITE_Image_Upload;
const Editprofilr = () => {
    const { user } = useContext(AuthContext);
    const Jobdetail = useLoaderData();
    console.log(Jobdetail)
    const { _id, stuid,
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
        Image } = Jobdetail;
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
        <div className='max-w-full mx-5 mt-5 flex flex-col items-center justify-center'>
            <div className="uppercase font-bold bg-gradient-to-r from-[#B721FF] to-[#21D4FD] mb-5 py-3 rounded-full border-black border-b-4 w-full">
                <h3 className="text-xl lg:text-3xl text-center text-white">Edit Profile</h3>
            </div>
            <div className="flex justify-center items-center w-full">
                <div className="w-11/12 text-black py-8 bg-gradient-to-r from-[#E0C3FC] to-[#8EC5FC] border-x-4 border-black rounded-2xl px-5 lg:px-10">
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-center justify-center'>
                        <div className='form-control w-full mb-5 flex flex-row gap-2 items-center justify-center'>
                            {/* {errors.exampleRequired && <span>This field is required</span>} */}
                            <label className="label"><span className="label-text text-xs md:text-xl font-semibold text-black">Image:</span></label>
                            <input type="url"   {...register("Image", { required: true })}
                                defaultValue={Image}
                                className="file-input text-white bg-slate-800 border-0 file-input-bordered w-4/5 pl-2" />

                        </div>
                        {/* <div className="form-control w-full mb-5 flex flex-row gap-2 items-center justify-center">
                            <label className="label">
                                <span className="label-text text-xl font-semibold text-black">Id</span>
                            </label>
                            <input
                                className="input input-bordered bg-slate-800 text-white border-0 w-4/5 "
                                value={stuid}
                                {...register('stuid')}
                               
                            
                            />
                        </div> */}
                        <div className='flex flex-col lg:flex-row gap-1 lg:gap-5 w-11/12 glass p-5 rounded-2xl mb-5'>
                            <div className="form-control w-full mb-5 flex flex-row gap-2 items-center justify-center">
                                <label className="label ">
                                    <span className="label-text text-xs md:text-xl font-semibold text-black">Name:</span>
                                </label>
                                <input
                                    className="input input-bordered text-white bg-slate-800 border-0 w-4/5 "
                                    {...register('name')}

                                    defaultValue={name}
                                />
                            </div>

                            <div className="form-control w-full mb-5 flex flex-row items-center justify-center">
                                <label className="label-text text-xs md:text-xl font-semibold text-black">Institute Name:</label>
                                <input
                                    className="input input-bordered bg-slate-800 text-white border-0 w-4/5 "
                                    defaultValue={instituteName}
                                    {...register('instituteName')}
                                    placeholder="Institute Name"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row gap-1 lg:gap-5 w-11/12 glass p-5 rounded-2xl mb-5'>
                            <div className="form-control w-full mb-5 flex flex-row gap-2 items-center justify-center">
                                <label className="label ">
                                    <span className="label-text text-xs md:text-xl font-semibold text-black">Birthday:</span>
                                </label>
                                <input
                                    className="input input-bordered bg-slate-800 text-white border-0 w-4/5"
                                    defaultValue={brithday}
                                    {...register('brithday')}
                                    type="date"
                                // defaultValue={name}
                                />
                            </div>

                            <div className="form-control w-full mb-5 flex flex-row gap-2 items-center justify-center">
                                <label className="label-text text-xs md:text-xl font-semibold text-black">Location:</label>
                                <input
                                    className="input input-bordered bg-slate-800 text-white border-0 w-4/5 "
                                    defaultValue={location}
                                    {...register('location')}
                                    placeholder="Location"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row gap-1 lg:gap-5 w-11/12 glass p-5 rounded-2xl mb-5'>
                            <div className="form-control w-full mb-5 flex flex-row gap-2 items-center justify-center">
                                <label className="label ">
                                    <span className="label-text text-xs md:text-xl font-semibold text-black">Email:</span>
                                </label>
                                <input
                                    className="input input-bordered bg-slate-800 text-white border-0 w-4/5 "
                                    value={email}
                                    {...register('email')}
                                    placeholder='ABC@gmail.com'
                                // defaultValue={name}
                                />
                            </div>

                            <div className="form-control w-full mb-5 flex flex-row items-center justify-center">
                                <label className="label-text text-xs md:text-lg lg:text-xl font-semibold text-black">WhatsApp Number:</label>

                                <input
                                    type="tel" // Use type="tel" for phone numbers
                                    className="input input-bordered bg-slate-800 text-white border-0 w-4/5 "
                                    defaultValue={WhatsAppNumber}
                                    {...register('WhatsAppNumber')}
                                    placeholder="WhatsApp Number"
                                    pattern="^\d{11}$" // Regular expression for exactly 11 digits
                                    title="Please enter a valid mobile number with exactly 11 digits"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row gap-1 lg:gap-5 w-11/12 glass p-5 rounded-2xl mb-5'>
                            <div className="form-control w-full mb-5 flex flex-row items-center justify-center">
                                <label className="label-text text-xs md:text-lg lg:text-xl font-semibold text-black">Father's Name:</label>
                                <input
                                    className="input input-bordered bg-slate-800 text-white border-0 w-4/5 "
                                    defaultValue={fatherName}
                                    {...register('fatherName')}
                                    placeholder="Father's Name"
                                />
                            </div>

                            <div className="form-control w-full mb-5 flex flex-row items-center justify-center">
                                <label className="label-text text-xs md:text-lg lg:text-xl font-semibold text-black">Father's Number:</label>
                                <input
                                    type="tel" // Use type="tel" for phone numbers
                                    className="input input-bordered bg-slate-800 text-white border-0 w-4/5 "
                                    defaultValue={fatherNumber}
                                    {...register('fatherNumber')}
                                    placeholder="Father's Number"
                                    pattern="^\d{11}$" // Regular expression for exactly 11 digits
                                    title="Please enter a valid mobile number with exactly 11 digits"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row gap-1 lg:gap-5 w-11/12 glass p-5 rounded-2xl mb-5'>
                            <div className="form-control w-full mb-5 flex flex-row items-center justify-center">
                                <label className="label-text text-xs md:text-lg lg:text-xl font-semibold text-black">Mother's Name:</label>
                                <input
                                    className="input input-bordered bg-slate-800 text-white border-0 w-4/5 "
                                    defaultValue={motherName}
                                    {...register('motherName')}
                                    placeholder="Mother's Name"
                                />
                            </div>

                            <div className="form-control w-full mb-5 flex flex-row  items-center justify-center">
                                <label className="label-text text-xs md:text-lg lg:text-xl font-semibold text-black">Mother's Number:</label>
                                <input
                                    type="tel" // Use type="tel" for phone numbers
                                    className="input input-bordered bg-slate-800 text-white border-0 w-4/5 "
                                    defaultValue={motherNumber}
                                    {...register('motherNumber')}
                                    placeholder="Mother's Number"
                                    pattern="^\d{11}$" // Regular expression for exactly 11 digits
                                    title="Please enter a valid mobile number with exactly 11 digits"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row gap-1 lg:gap-5 w-11/12 glass p-5 rounded-2xl mb-5'>
                            <div className="form-control w-full mb-5 flex flex-row gap-2 items-center justify-center">
                                <label className="label-text text-xs md:text-xl font-semibold text-black">Class:</label>
                                <input
                                    className="input input-bordered bg-slate-800 text-white border-0 w-4/5 "

                                    {...register('Class')}
                                    value={Class}
                                />
                            </div>
                            <div className="form-control w-full mb-5 flex flex-row gap-2 items-center justify-center">
                                <label className="label-text text-xs md:text-xl font-semibold text-black">Batch:</label>
                                <input
                                    className="input input-bordered bg-slate-800 text-white border-0 w-4/5 "

                                    {...register('Batch')}
                                    value={Batch}
                                />
                            </div>
                        </div>

                        <input className="bg-gradient-to-r from-[#B721FF] to-[#21D4FD] px-8 py-3 text-xl flex items-center justify-center gap-2 rounded-full text-white font-bold shadow-2xl shadow-black border-x-4 border-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 mt-5" type="submit" value="Update Profile" />

                    </form>
                </div>
            </div>
        </div>

    );
};

export default Editprofilr;