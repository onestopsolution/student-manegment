import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
const img_hosting_key = import.meta.env.VITE_Image_Upload;
const Homework = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [classList, setClassList] = useState([]);
    const [batchList, setBatchList] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [isClassDropdownVisible, setIsClassDropdownVisible] = useState(false);
    const [isBatchDropdownVisible, setIsBatchDropdownVisible] = useState(false);
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
    useEffect(() => {
        // Fetch class and batch data from your API
        fetch(" https://asteriactg.com/BatchClass")

            .then(response => response.json())
            .then(data => {
                const uniqueClasses = [...new Set(data.map(item => item.Class))]
                    .filter(className => className !== ''); // Exclude empty classes
                const uniqueBatches = [...new Set(data.map(item => item.Batch))];
                setClassList(uniqueClasses);
                setBatchList(uniqueBatches);
            })
            .catch(error => {
                console.error('Error fetching classes and batches:', error);
            });
    }, []);
    const onSubmit = data => {
        console.log(data);
        const formData = new FormData();
        //console.log(data.File.length)
        // Handle image or PDF file
        formData.append('image', data.Image[0])

        // Your code for fetching and posting data to your database
        fetch(img_hosting_url, {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(imgResponse => {
                console.log('Response from server:', imgResponse);


                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    console.log(data, imgURL)
                    const { Batch, Class, Image, startdate, lastdate, instruction } = data;
                    const newCls = {

                        Batch: selectedBatch,
                        Class: selectedClass,
                        startdate,
                        lastdate,
                        Image: imgURL,
                        instruction
                    }
                    console.log(newCls)
                    fetch(" https://asteriactg.com/homework", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newCls),
                    })
                        .then((res) => res.json())
                        .then(result => {
                            console.log('after posting new class ', result)
                            if (result.insertedId) {

                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
            .catch(error => {
                console.error('Error posting data:', error);
            });
    };

    return (
        <div className='w-full px-10 '>
            <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
                <h3 className="text-3xl">Home Work Upload</h3>
            </div>
            <div className="flex justify-center items-center">
                <div className="w-5/12   text-black p-8 border bg-[#2563eb] bg-opacity-40">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='form-control w-full mb-4 '>
                            {/* {errors.exampleRequired && <span>This field is required</span>} */}
                            <label className="label"><span className="label-text text-xl text-black font-semibold">File</span></label>
                            <input type="file"{...register('Image')} placeholder="image link" className="file-input file-input-bordered w-full " />
                        </div>
                        {/* <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold  text-black">Class Name</span>
                            </label>
                            <input
                                className="input input-bordered w-full "
                                {...register('ClassName')}
                                // placeholder="Name"
                               // defaultValue={Name}
                            />
                        </div> */}
                        <div className="form-control w-full mb-4 flex">
                            <div className="flex items-center ">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={isClassDropdownVisible}
                                    onChange={() => setIsClassDropdownVisible(!isClassDropdownVisible)}
                                />
                                <label className="label-text text-xl font-semibold text-black ">Class</label>
                            </div>
                            {isClassDropdownVisible && (
                                <select
                                    className="select select-bordered flex-grow "
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}

                                >
                                    <option value="">Select Class</option>
                                    {classList.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div className="form-control w-full mb-4 flex">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={isBatchDropdownVisible}
                                    onChange={() => setIsBatchDropdownVisible(!isBatchDropdownVisible)}
                                />
                                <label className="label-text text-xl font-semibold text-black">Batch</label>
                            </div>
                            {isBatchDropdownVisible && (
                                <select
                                    className="select select-bordered flex-grow "
                                    value={selectedBatch}
                                    onChange={(e) => setSelectedBatch(e.target.value)}
                                >
                                    <option value="">Select Batch</option>
                                    {batchList.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Start Date</span>
                            </label>
                            <input
                                className="input input-bordered w-full "
                                type="date"

                                {...register('startdate')}

                            />

                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Last date</span>
                            </label>
                            <input
                                className="input input-bordered w-full "
                                {...register('lastdate')}

                                type="date"

                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label ">
                                <span className="label-text text-xl font-semibold text-black">Instuction</span>
                            </label>
                            <input
                                className="input input-bordered w-full "
                                {...register('instruction')}

                                type="text"

                            />
                        </div>


                        <input className="btn btn-md  mt-4 mx-48" type="submit" value="Add Home Work" />

                    </form>
                </div>
            </div>
        </div>
    );
}




export default Homework;