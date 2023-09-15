import React, { useEffect, useState } from 'react';
import FileItem from './FileItem';
import Swal from 'sweetalert2';

const FileList = ({ files, removeFile }) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    // Fetch the list of files from your backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/files'); // Replace with your backend endpoint
        if (response.ok) {
          const data = await response.json();
          setFileList(data); // Update the file list with data from the backend
        } else {
          console.error('Failed to fetch files from the backend');
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchData();
  }, []);

  // Modify the deleteFileHandler function to also delete files from the backend
  const deleteFileHandler = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/files/${id}`, {
        method: 'DELETE', // Replace with your backend endpoint for deleting files
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Deleted Successful',
          text: 'Your file has been uploaded successfully!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            // Reload the window
            window.location.reload();
          }
        });
        removeFile(id);

      } else {
        console.error('File deletion failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ul className="file-list1">
      {fileList.map((f) => (
        <FileItem key={f.name} file={f} deleteFile={deleteFileHandler} />
      ))}
    </ul>
  );
};

export default FileList;