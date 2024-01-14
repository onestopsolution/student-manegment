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
    const { stuid,name,brithday,fatherName,fatherNumber,motherName,email,motherNumber,WhatsAppNumber,instituteName,Batch,Class, location ,Image, _id } = Jobdetail;
  
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
                    const {stuid,
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
                            <input type="file"   {...register("Image", { required: true })} className="file-input file-input-bordered w-full " />

                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Id</span>
                            </label>
                            <input
                                className="input input-bordered w-full "
                                value={stuid}
                                onChange={(e) => setstuid(e.target.value)}
                                placeholder="01"
                            // defaultValue={name}
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Name</span>
                            </label>
                            <input
                                className="input input-bordered w-full "
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
                                className="input input-bordered w-full "
                                value={brithday}
                                onChange={(e) => setbrithday(e.target.value)}
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
                                onChange={(e) => setemail(e.target.value)}
                                placeholder='ABC@gmail.com'
                            // defaultValue={name}
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Father's Name</label>
                            <input
                                className="input input-bordered w-full "
                                value={fatherName}
                                onChange={(e) => setFatherName(e.target.value)}
                                placeholder="Father's Name"
                            />
                        </div>

                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Father's Number</label>
                            <input
                                type="tel" // Use type="tel" for phone numbers
                                className="input input-bordered w-full "
                                value={fatherNumber}
                                onChange={(e) => setFatherNumber(e.target.value)}
                                placeholder="Father's Number"
                                pattern="^\d{11}$" // Regular expression for exactly 11 digits
                                title="Please enter a valid mobile number with exactly 11 digits"
                            />
                        </div>



                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Mother's Name</label>
                            <input
                                className="input input-bordered w-full "
                                value={motherName}
                                onChange={(e) => setMotherName(e.target.value)}
                                placeholder="Mother's Name"
                            />
                        </div>

                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Mother's Number</label>
                            <input
                                type="tel" // Use type="tel" for phone numbers
                                className="input input-bordered w-full "
                                value={motherNumber}
                                onChange={(e) => setMotherNumber(e.target.value)}
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
                                value={WhatsAppNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                                placeholder="WhatsApp Number"
                                pattern="^\d{11}$" // Regular expression for exactly 11 digits
                                title="Please enter a valid mobile number with exactly 11 digits"
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Location</label>
                            <input
                                className="input input-bordered w-full "
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Location"
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Institute Name</label>
                            <input
                                className="input input-bordered w-full "
                                value={instituteName}
                                onChange={(e) => setInstituteName(e.target.value)}
                                placeholder="Institute Name"
                            />
                        </div>
                     


                       


                        <input className="btn btn-primary btn-lg mt-5" type="submit" value="Add Student" />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Editprofilr;