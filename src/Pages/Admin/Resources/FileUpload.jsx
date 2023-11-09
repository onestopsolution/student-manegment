import React, { useEffect, useState } from 'react';
import '../Resources/Resouresd.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'; // Import SweetAlert

const FileUpload = ({ files, setFiles, removeFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [className, setClassName] = useState('');
  const [batchName, setBatchName] = useState('');
  const [classList, setClassList] = useState([]);
  const [batchList,  setBatchList] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleClassNameChange = (event) => {
    setClassName(event.target.value);
  };
  const handleBatchNameChange = (event) => {
    setBatchName(event.target.value);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    if (className.trim() === '') {
      alert('Please enter a class name.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('className', className);
    formData.append('batchName', batchName);

    fetch(' https://intern-first-server-farjanaakterlaila.vercel.app/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Response from the backend
        if (data.result.acknowledged) {

          Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Added successfully',
              showConfirmButton: false,
              timer: 1500,
             
          } 
          ) 
          
      }
      window.location.reload();
      })
      .catch((error) => {
        console.error('File upload error:', error);
       
      });
  };
  const fetchFileList = async () => {

    const response = await fetch('  https://intern-first-server-farjanaakterlaila.vercel.app/files');
    if (response.ok) {
      const data = await response.json();
      setFiles(data); // Update the state with the new file list
    } else {
      console.error('Error fetching file list');
    }
  };
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
  useEffect(() => {
   
    // Fetch the initial file list when the component mounts
    fetchFileList();
  }, []);
  return (
   
    <div className='w-full px-10 '>
      <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
        <h3 className="text-3xl">Resourses Upload</h3>
      </div>
      <div className="flex justify-center items-center ">
      <div className="text-black p-8 border bg-[#2563eb] bg-opacity-40">
      <div className='form-control w-full mb-4 '>
        <label className="label"><span className="label-text text-xl text-black font-semibold">File</span></label>
        <input
          className="file-input file-input-bordered w-full "
          type="file"
          accept=".pdf, .jpg, .png, .jpeg" // Specify allowed file types
          onChange={handleFileChange}
        />
      </div>
      <div className='form-control w-full mb-4'>
            <label className="label"><span className="label-text text-xl text-black font-semibold">Class Name:</span></label>
            <select
              className="select select-bordered w-full"
              value={className}
              onChange={handleClassNameChange}
            >
              <option value="">Select class name</option>
              {classList.map((classItem, index) => (
                <option key={index} value={classItem}>
                  {classItem}
                </option>
              ))}
            </select>
          </div>
      <div className='form-control w-full mb-4'>
            <label className="label"><span className="label-text text-xl text-black font-semibold">Batch Name:</span></label>
            <select
              className="select select-bordered w-full"
              value={batchName}
              onChange={handleBatchNameChange}
            >
              <option value="">Select class name</option>
              {batchList.map((batchList, index) => (
                <option key={index} value={batchList}>
                  {batchList}
                </option>
              ))}
            </select>
          </div>
      <button className="btn btn-md  mt-4 mx-48" onClick={handleUpload}>Upload File</button>
      
    </div>
    </div>
    </div>
  );
};

export default FileUpload;
