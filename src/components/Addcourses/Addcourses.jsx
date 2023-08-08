import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const img_hosting_key = import.meta.env.VITE_Image_Upload;

const Addcourses = () => {
    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
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
          if(imgResponse.success){
              const imgURL = imgResponse.data.display_url;
              console.log(data,imgURL)
              const {Name, InstructorName,Price,InstactorEmail, AvailableSeats} = data;
              const newCls = {Name,InstructorName,InstactorEmail,Price: parseFloat(Price), AvailableSeats: parseFloat(AvailableSeats), Image:imgURL}
              console.log(newCls)
             
            //   .then(data => {
            //       console.log('after posting new class ', data.data)
            //       if(data.data.insertedId){
            //           reset();
            //           Swal.fire({
            //               position: 'top-end',
            //               icon: 'success',
            //               title: 'Classes added successfully',
            //               showConfirmButton: false,
            //               timer: 1500
            //             })
            //       }
            //   })
          }
      })

    }
    return (
        <div className='w-full px-10 '>
            <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
                <h3 className="text-3xl">Add A New Courses</h3>
            </div>
            <div className="flex justify-center items-center">
                <div className="w-5/12   text-black p-8 border bg-error bg-opacity-40">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='form-control w-full mb-4 '>
                            {/* {errors.exampleRequired && <span>This field is required</span>} */}
                            <label className="label"><span className="label-text text-xl font-semibold text-black">Image</span></label>
                            <input type="file"   {...register("Image", { required: true })} className="file-input file-input-bordered w-full text-white" />

                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Class Name</span>
                            </label>
                            <input
                                className="input input-bordered w-full text-white"
                                {...register('Name')}
                                placeholder="Name"
                            // defaultValue={name}
                            />
                        </div>

                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text text-xl font-semibold text-black">Instructor Name</span>
                            </label>
                            <input
                                className="input input-bordered w-full text-white"
                                {...register('InstructorName')}

                            />

                        </div>

                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Instactor Email</span>
                            </label>
                            <input
                                className="input input-bordered w-full text-white"
                                {...register('InstactorEmail')}

                            />

                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Price</span>
                            </label>
                            <input
                                className="input input-bordered w-full text-white"
                                {...register('Price', { required: true })}
                                placeholder="Price"
                                type="number"
                            //  defaultValue={price}
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Available Seats</label>
                            <input
                                className="input input-bordered w-full text-white"
                                {...register('AvailableSeats', { required: true })}
                                placeholder="Available Seats"
                                type="number"
                            //  defaultValue={quantity}
                            /></div>


                        <input className="btn btn-lg  mt-4 mx-48" type="submit" value="Add Class" />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Addcourses;