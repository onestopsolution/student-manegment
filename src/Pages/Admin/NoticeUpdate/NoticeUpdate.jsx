import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import AdminTotal from '../AdminTotal/AdminTotal';
import Swal from 'sweetalert2';

const NoticeUpdate = () => {
  const { user } = useContext(AuthContext);
  const [classList, setClassList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [noticeText, setNoticeText] = useState('');
  const [selectedClassDisplay, setSelectedClassDisplay] = useState('');
  const [selectedBatchDisplay, setSelectedBatchDisplay] = useState('');
  useEffect(() => {
    // Fetch class and batch data from your API
    fetch(" https://intern-first-server-farjanaakterlaila.vercel.app/BatchClass")
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

  const handleClassChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedClass(selectedValue);
    setSelectedClassDisplay(selectedValue); 
  };

  const handleBatchChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedBatch(selectedValue);
    setSelectedBatchDisplay(selectedValue);
  };

  const handleNoticeChange = (e) => {
    setNoticeText(e.target.value);
  };

  const handleSendNotice = () => {
    // Construct the data object for the POST request
    const data = {
      selectedClass,
      selectedBatch,
      noticeText,
    };

    // Send the POST request to your backend
    fetch('  https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/notice', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // Serialize the data object to JSON
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Insert Successfully',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
      }
    })
    .catch((error) => {
      console.error("Error sending notice:", error);
    });
  };

  return (
    <div className='flex flex-col items-center gap-10 ml-8'>
      <div>
        <h1 className='text-3xl text-center lg:text-start font-bold'>Hey, <span className='text-indigo-600'>{user ? user.displayName : 'Guest'}</span></h1>
        <div className='mt-10'>
          <AdminTotal></AdminTotal>
        </div>
      </div>
      <div className='flex flex-col gap-5 bg-indigo-100 p-5 items-center w-full mr-10 rounded-xl'>
        <h1 className='text-center w-full text-3xl bg-purple-500 text-white px-5 py-2 rounded-xl font-semibold border-b-4 border-black'>Send Notice / Information</h1>
        <div className="flex justify-between w-full mt-5">
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">Select Class</label>
            <select
              className="dropdown-content z-[1] menu p-2 shadow bg-slate-100 rounded-box w-52"
              value={selectedClass}
              onChange={handleClassChange}
            >
              <option value="" disabled>Select Class</option>
              {classList.map((className, index) => (
                <option key={index} value={className}>{className}</option>
              ))}
            </select>
          </div>
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">Select Batch</label>
            <select
              className="dropdown-content z-[1] menu p-2 shadow bg-slate-100 rounded-box w-52"
              value={selectedBatch}
              onChange={handleBatchChange}
            >
              <option value="" disabled>Select Batch</option>
              {batchList.map((batchName, index) => (
                <option key={index} value={batchName}>{batchName}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Display selected class and batch */}
        {selectedClassDisplay && (
          <p>Selected Class: {selectedClassDisplay}</p>
        )}
        {selectedBatchDisplay && (
          <p>Selected Batch: {selectedBatchDisplay}</p>
        )}
        <textarea
          placeholder="Write your Notice"
          className="textarea textarea-bordered textarea-lg  w-full max-w-screen-lg"
          value={noticeText}
          onChange={handleNoticeChange}
        ></textarea>
        <button className='btn btn-primary w-4/5 font-semibold' onClick={handleSendNotice}>Send Notice</button>
      </div>
    </div>
  );
};

export default NoticeUpdate;
