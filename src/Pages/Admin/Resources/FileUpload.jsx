import React, { useEffect } from 'react';
import '../Resources/Resouresd.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'; // Import SweetAlert

const FileUpload = ({ files, setFiles, removeFile }) => {
  const uploadHandler = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    file.isUploading = true;
    setFiles([...files, file]);

    // Upload file
    const formData = new FormData();
    formData.append("newFile", file, file.name);

    const response = await fetch(' https://intern-first-server-farjanaakterlaila.vercel.app/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      file.isUploading = false;
      setFiles([...files, file]);

      // Show a success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Upload Successful',
        text: 'Your file has been uploaded successfully!',
      }).then((result) => {
        if (result.isConfirmed) {
          // Reload the window
          window.location.reload();
        }
      });
      
      // Fetch the updated file list and update the state
      fetchFileList();
    } else {
      // Handle error here (remove the file, show a message, etc.)
      console.error('Upload failed');
      // You can call removeFile(file.name) here if you want to remove the file from the list.
      // removeFile(file.name);
    }
  };

  // Function to fetch the updated file list
  const fetchFileList = async () => {
    const response = await fetch(' https://intern-first-server-farjanaakterlaila.vercel.app/files');
    if (response.ok) {
      const data = await response.json();
      setFiles(data); // Update the state with the new file list
    } else {
      console.error('Error fetching file list');
    }
  };

  useEffect(() => {
    // Fetch the initial file list when the component mounts
    fetchFileList();
  }, []);
  return (
    <>
      <div className="file-card1">
        <div className="file-inputs1">
          <input type="file" multiple onChange={uploadHandler} />
          <button >
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            Upload Files
          </button>
        </div>
        {/* <p className="main1">Supported files</p>
        <p className="info1">PDF, JPG, PNG</p> */}
      </div>
    </>
  );
};

export default FileUpload;
