import React, { useState } from 'react';
import '../Resources/Resouresd.scss'
import FileUpload from './FileUpload';
import FileList from './FileList';
const Resouresc = () => {
    const [files, setFiles] = useState([])

  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
  }
    return (
        <div className="App">
      <div className="title1"></div>
      <FileUpload files={files} setFiles={setFiles}
         removeFile={removeFile} />
      <FileList files={files} removeFile={removeFile} /> 
    </div>
    );
};

export default Resouresc;