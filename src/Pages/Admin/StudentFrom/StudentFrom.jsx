import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


const img_hosting_key = import.meta.env.VITE_Image_Upload;

const StudentFrom = () => {
    const { register, handleSubmit, reset } = useForm();
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [selectedPaymentType, setSelectedPaymentType] = useState('');
    const [selectedInstallment, setSelectedInstallment] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
const [isClassDropdownVisible, setIsClassDropdownVisible] = useState(false);
const [isBatchDropdownVisible, setIsBatchDropdownVisible] = useState(false);


    const [fatherName, setFatherName] = useState('');
    const [fatherNumber, setFatherNumber] = useState('');
    const [motherName, setMotherName] = useState('');
    const [motherNumber, setMotherNumber] = useState('');

    const [location, setLocation] = useState('');
    const [instituteName, setInstituteName] = useState('');
    const classOptions = ['Class 8', 'Class 9', 'SSC', 'HSC', '11', '12'];
    const batchOptions = ['A (7-8)', 'B (10-12:30)'];
    const paymentOptions = ['Monthly', 'Course Payment 1', 'Course Payment 2', 'Course Payment 3'];

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
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    console.log(data, imgURL)
                    const { Name, InstructorName, Price, InstactorEmail, AvailableSeats } = data;
                    const newCls = {
                        fatherName,
                        fatherNumber:parseFloat(fatherNumber),
                        motherName,
                        motherNumber:parseFloat( motherNumber),
                        WhatsAppNumber: parseFloat(whatsappNumber),
                        Batch: selectedBatch,
                        Class: selectedClass,
                        Payment: selectedPaymentType === 'course' ? `Course Payment ${selectedInstallment}` : selectedPaymentType,
                        Image: imgURL
                    }
                    console.log(newCls)
                    fetch("http://localhost:5000/student", {
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
                                    title: 'Classes added successfully',
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
                <h3 className="text-3xl text-center">Student's From</h3>
            </div>
            <div className="flex justify-center items-center">
                <div className="w-4/5 text-black py-5 bg-gradient-to-r from-indigo-200 to-purple-200 bg-opacity-40 rounded-2xl px-10">
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
                        <div className='form-control w-full mb-4 '>
                            {/* {errors.exampleRequired && <span>This field is required</span>} */}
                            <label className="label"><span className="label-text text-xl font-semibold text-black">Image</span></label>
                            <input type="file"   {...register("Image", { required: true })} className="file-input file-input-bordered w-full text-black bg-white" />

                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Father's Name</label>
                            <input
                                className="input input-bordered w-full text-black bg-white"
                                value={fatherName}
                                onChange={(e) => setFatherName(e.target.value)}
                                placeholder="Father's Name"
                            />
                        </div>

                        {/* <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Father's Number</label>
                            <input
                            type='number'
                                className="input input-bordered w-full text-black bg-white"
                                value={fatherNumber}
                                onChange={(e) => setFatherNumber(e.target.value)}
                                placeholder="Father's Number"
                            />
                        </div> */}
     <div className="form-control w-full mb-4">
    <label className="label-text text-xl font-semibold text-black">Father's Number</label>
    <input
        type="tel" // Use type="tel" for phone numbers
        className="input input-bordered w-full text-black bg-white"
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
                                className="input input-bordered w-full text-black bg-white"
                                value={motherName}
                                onChange={(e) => setMotherName(e.target.value)}
                                placeholder="Mother's Name"
                            />
                        </div>

                        <div className="form-control w-full mb-4">
    <label className="label-text text-xl font-semibold text-black">Mother's Number</label>
    <input
        type="tel" // Use type="tel" for phone numbers
        className="input input-bordered w-full text-black bg-white"
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
        className="input input-bordered w-full text-black bg-white"
        value={whatsappNumber}
        onChange={(e) => setWhatsappNumber(e.target.value)}
                                placeholder="WhatsApp Number"
        pattern="^\d{11}$" // Regular expression for exactly 11 digits
        title="Please enter a valid mobile number with exactly 11 digits"
    />
                        </div>
                        <div className="form-control w-full mb-4">
    <label className="label-text text-xl font-semibold text-black">Location</label>
    <input
        className="input input-bordered w-full text-black bg-white"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
    />
</div>

                        {/* <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Class</label>
                            <select
                                className="select select-bordered w-full bg-white text-black"
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <option value="">Select Class</option>
                                {classOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div> */}
                        <div className="form-control w-full mb-4 flex">
    <div className="flex items-center">
        <input
            type="checkbox"
            className="mr-2"
            checked={isClassDropdownVisible}
            onChange={() => setIsClassDropdownVisible(!isClassDropdownVisible)}
        />
        <label className="label-text text-xl font-semibold text-black">Class</label>
    </div>
    {isClassDropdownVisible && (
        <select
            className="select select-bordered flex-grow"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
        >
            <option value="">Select Class</option>
            {classOptions.map((option, index) => (
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
            className="select select-bordered flex-grow"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
        >
            <option value="">Select Batch</option>
            {batchOptions.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )}
</div>




                        <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Payment Type</label>
                            <select
                                className="select select-bordered w-full bg-white text-black"
                                value={selectedPaymentType}
                                onChange={(e) => {
                                    setSelectedPaymentType(e.target.value);
                                    setSelectedInstallment(''); // Reset installment when changing payment type
                                }}
                            >
                                <option value="">Select Payment Type</option>
                                <option value="month">Month</option>
                                <option value="course">Course</option>
                            </select>
                        </div>

                        {selectedPaymentType === 'course' && (
                            <div className="form-control w-full mb-4">
                                <label className="label-text text-xl font-semibold text-black">Installment</label>
                                <select
                                    className="select select-bordered w-full bg-white text-black"
                                    value={selectedInstallment}
                                    onChange={(e) => setSelectedInstallment(e.target.value)}
                                >
                                    <option value="">Select Installment</option>
                                    <option value="1">Installment 1</option>
                                    <option value="2">Installment 2</option>
                                    <option value="3">Installment 3</option>
                                </select>
                            </div>
                        )}



                        <input className="btn btn-primary btn-lg mt-5" type="submit" value="Add Class" />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentFrom;