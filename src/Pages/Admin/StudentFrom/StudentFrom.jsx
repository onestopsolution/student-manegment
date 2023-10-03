import { useEffect, useState } from 'react';
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

    const [name, setname] = useState('');
    const [stuid, setstuid] = useState('');
    const [brithday, setbrithday] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [fatherNumber, setFatherNumber] = useState('');
    const [motherName, setMotherName] = useState('');
    const [motherNumber, setMotherNumber] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [email, setemail] = useState('');


    const [location, setLocation] = useState('');
    const [instituteName, setInstituteName] = useState('');
    const [classList, setClassList] = useState([]);
    const [batchList, setBatchList] = useState([]);
    const paymentOptions = ['Monthly', 'Course Payment 1', 'Course Payment 2', 'Course Payment 3'];

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`


    useEffect(() => {
        // Fetch class and batch data from your API
        fetch("https://intern-first-server-farjanaakterlaila.vercel.app/BatchClass")

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
                        stuid,
                        name,
                        brithday,
                        fatherName,
                        fatherNumber: parseFloat(fatherNumber),
                        motherName,
                        email,
                        motherNumber: parseFloat(motherNumber),
                        WhatsAppNumber: parseFloat(whatsappNumber),
                        instituteName,
                        Batch: selectedBatch,
                        Class: selectedClass,
                        location,
                        Payment: selectedPaymentType === 'course' ? `Course Payment ${selectedInstallment}` : selectedPaymentType,
                        Amount: parseFloat(paymentAmount),
                        Image: imgURL
                    }
                    console.log(newCls)
                    fetch("https://intern-first-server-farjanaakterlaila.vercel.app/student", {
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
                <h3 className="text-3xl text-center">Student's From</h3>
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

                        {/* <div className="form-control w-full mb-4">
                            <label className="label-text text-xl font-semibold text-black">Father's Number</label>
                            <input
                            type='number'
                                className="input input-bordered w-full "
                                value={fatherNumber}
                                onChange={(e) => setFatherNumber(e.target.value)}
                                placeholder="Father's Number"
                            />
                        </div> */}
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

{/* <div className="form-control w-full mb-4">
    <label className="label-text text-xl font-semibold text-black">Amount</label>
    <input
        type="number"
        className="input input-bordered w-full "
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
        placeholder="Payment Amount"
    />
</div> */}


                        <input className="btn btn-primary btn-lg mt-5" type="submit" value="Add Student" />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentFrom;