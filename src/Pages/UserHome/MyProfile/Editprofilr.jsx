import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
const img_hosting_key = import.meta.env.VITE_Image_Upload;
const Editprofilr = () => {
    const { register, handleSubmit, reset } = useForm();


    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`

    const Jobdetail = useLoaderData();
    console.log(Jobdetail);
    const { stuid, name, brithday, fatherName, fatherNumber, motherName, email, motherNumber, WhatsAppNumber, instituteName, Batch, Class, location, Image, _id } = Jobdetail;

    useEffect(() => {
        // Fetch the attendance history from the API endpoint
        fetch(`  https://intern-first-server-farjanaakterlaila.vercel.app/student/${_id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)

            })
            .catch((error) => {
                console.error('Error fetching attendance history:', error);
            });
    }, [_id]);




    const onSubmit = data => {
        console.log(data)
        const formData = new FormData();
        formData.append('image', data.Image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                console.log(imgResponse)
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    console.log(data, imgURL)
                    const { stuid,
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
                        Image } = data;
                    const newCls = {
                        stuid,
                        name,
                        brithday,
                        fatherName,
                        fatherNumber: parseFloat(fatherNumber),
                        motherName,
                        email,
                        motherNumber: parseFloat(motherNumber),
                        WhatsAppNumber: parseFloat(WhatsAppNumber),
                        instituteName,
                        Batch,
                        Class,
                        location,
                        Image: imgURL
                    }
                    console.log(newCls)
                    fetch(`https://intern-first-server-farjanaakterlaila.vercel.app/edit/${_id}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newCls),
                    })
                        .then((res) => res.json())
                        .then(result => {
                            console.log('after posting new class ', result)
                            if (result.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Student added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })

    }
    return (
        <div className='min-w-max mx-8 mt-5'>
            <div className="text-3xl text-white font-bold text-center bg-gradient-to-r from-[#B721FF] to-[#21D4FD] rounded-full py-2 border-b-4 border-black mb-5">
                <h3 className="text-3xl text-center uppercase">Edit Profile</h3>
            </div>
            <div className="flex justify-center items-center">
                <div className="w-10/12 text-black py-10 mb-10 bg-gradient-to-l from-[#B5FFFC] to-[#FFDEE9] bg-opacity-40 rounded-2xl px-8 border-x-4 border-black">
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 items-center'>

                        <div className='flex flex-col lg:flex-row gap-1 lg:gap-3 w-full glass px-8 rounded-xl py-5'>
                            <div className='form-control w-full mb-4 '>
                                {/* {errors.exampleRequired && <span>This field is required</span>} */}
                                <label className="label"><span className="label-text text-xl font-semibold text-black">Image</span></label>
                                <input type="file"   {...register("Image", { required: true })} className="file-input file-input-bordered w-full text-white bg-slate-800" />

                            </div>
                            <div className="form-control w-full mb-4">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold text-black">Id</span>
                                </label>
                                <input
                                    className="input input-bordered w-full text-white bg-slate-800"
                                    value={stuid}
                                    onChange={(e) => setstuid(e.target.value)}
                                    placeholder="01"
                                // defaultValue={name}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row gap-1 lg:gap-3 w-full glass px-8 rounded-xl py-5'>
                            <div className="form-control w-full mb-4">
                                <label className="label ">
                                    <span className="label-text text-xl font-semibold text-black">Name</span>
                                </label>
                                <input
                                    className="input input-bordered w-full text-white bg-slate-800"
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                    placeholder="Name"
                                // defaultValue={name}
                                />
                            </div>
                            <div className="form-control w-full mb-4">
                                <label className="label ">
                                    <span className="label-text text-xl font-semibold text-black">Brithday</span>
                                </label>
                                <input
                                    className="input input-bordered w-full text-white bg-slate-800"
                                    value={brithday}
                                    onChange={(e) => setbrithday(e.target.value)}
                                    type="date"
                                // defaultValue={name}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row gap-1 lg:gap-3 w-full glass px-8 rounded-xl py-5 items-center justify-center'>
                            <div className="form-control w-full mb-4">
                                <label className="label ">
                                    <span className="label-text text-xl font-semibold text-black">Email</span>
                                </label>
                                <input
                                    className="input input-bordered w-full text-white bg-slate-800"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    placeholder='ABC@gmail.com'
                                // defaultValue={name}
                                />
                            </div>
                            <div className="form-control w-full mb-4">
                                <label className="label-text text-xl font-semibold text-black mb-3">WhatsApp Number</label>

                                <input
                                    type="tel" // Use type="tel" for phone numbers
                                    className="input input-bordered w-full text-white bg-slate-800"
                                    value={WhatsAppNumber}
                                    onChange={(e) => setWhatsappNumber(e.target.value)}
                                    placeholder="WhatsApp Number"
                                    pattern="^\d{11}$" // Regular expression for exactly 11 digits
                                    title="Please enter a valid mobile number with exactly 11 digits"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row gap-1 lg:gap-3 w-full glass px-8 rounded-xl py-5'>
                            <div className="form-control w-full mb-4">
                                <label className="label-text text-xl font-semibold text-black">Father's Name</label>
                                <input
                                    className="input input-bordered w-full text-white bg-slate-800"
                                    value={fatherName}
                                    onChange={(e) => setFatherName(e.target.value)}
                                    placeholder="Father's Name"
                                />
                            </div>

                            <div className="form-control w-full mb-4">
                                <label className="label-text text-xl font-semibold text-black">Father's Number</label>
                                <input
                                    type="tel" // Use type="tel" for phone numbers
                                    className="input input-bordered w-full text-white bg-slate-800"
                                    value={fatherNumber}
                                    onChange={(e) => setFatherNumber(e.target.value)}
                                    placeholder="Father's Number"
                                    pattern="^\d{11}$" // Regular expression for exactly 11 digits
                                    title="Please enter a valid mobile number with exactly 11 digits"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row gap-1 lg:gap-3 w-full glass px-8 rounded-xl py-5'>
                            <div className="form-control w-full mb-4">
                                <label className="label-text text-xl font-semibold text-black">Mother's Name</label>
                                <input
                                    className="input input-bordered w-full text-white bg-slate-800"
                                    value={motherName}
                                    onChange={(e) => setMotherName(e.target.value)}
                                    placeholder="Mother's Name"
                                />
                            </div>

                            <div className="form-control w-full mb-4">
                                <label className="label-text text-xl font-semibold text-black">Mother's Number</label>
                                <input
                                    type="tel" // Use type="tel" for phone numbers
                                    className="input input-bordered w-full text-white bg-slate-800"
                                    value={motherNumber}
                                    onChange={(e) => setMotherNumber(e.target.value)}
                                    placeholder="Mother's Number"
                                    pattern="^\d{11}$" // Regular expression for exactly 11 digits
                                    title="Please enter a valid mobile number with exactly 11 digits"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row gap-1 lg:gap-3 w-full glass px-8 rounded-xl py-5'>
                            <div className="form-control w-full mb-4">
                                <label className="label-text text-xl font-semibold text-black">Location</label>
                                <input
                                    className="input input-bordered w-full text-white bg-slate-800"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Location"
                                />
                            </div>
                            <div className="form-control w-full mb-4">
                                <label className="label-text text-xl font-semibold text-black">Institute Name</label>
                                <input
                                    className="input input-bordered w-full text-white bg-slate-800"
                                    value={instituteName}
                                    onChange={(e) => setInstituteName(e.target.value)}
                                    placeholder="Institute Name"
                                />
                            </div>
                        </div>

                        <input className="bg-gradient-to-r from-[#B721FF] to-[#21D4FD] px-8 py-2 flex items-center justify-center gap-2 rounded-full text-xl text-white font-bold shadow-2xl shadow-black border-x-4 border-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 mt-8" type="submit" value="Save Changes" />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Editprofilr;