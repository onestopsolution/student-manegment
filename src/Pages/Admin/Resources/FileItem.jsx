import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import '../Resources/Resouresd.scss'
import { FaTrashAlt } from 'react-icons/fa';
const FileItem = ({ file, deleteFile }) => {
   
    return (
        // <ul>
        // <li>class:{file.className}
        // <li>Batch:{file.batchName}</li>
        // <p>{file.filename}</p>
        // </li>
        //     <li
        //         className="file-item1"
        //         key={file.name}>
        //         <FontAwesomeIcon icon={faFileAlt} />
               
        //         <p>{file.filename}</p>
        //         <div className="actions">
        //             <div ></div>
        //             {file.isUploading && <FontAwesomeIcon
        //                 icon={faSpinner} className="fa-spin"
        //                 onClick={() => deleteFile(file._id)} />
        //             }
        //             {!file.isUploading &&
        //                 <FontAwesomeIcon icon={faTrash}
        //                     onClick={() => deleteFile(file._id)} />
        //             }
        //         </div>
        //     </li>
        // </ul>
        <div className="mx-5 mt-5">
        
        <div className="overflow-x-auto">
          <table className="table w-full text-xl">
            <thead className="text-xl text-center">
              {/* <tr>
             <th>#</th>
                <th>File name</th>
                <th>Class Name</th>
                <th>Batch Name</th>
                
                <th>Action</th>
                
              </tr> */}
            </thead>
            <tbody className="text-center">
              
                <tr key={file._id} >
               
                             
                                    <td><span className='font-bold'>File:</span> {file.filename}</td>
                              
                               
                
                  <td> <span className='font-bold'>Class: </span>{file.className}</td>
                  <td><span className='font-bold'>Batch: </span>  {file.batchName}</td>
                  
                 <td> <button onClick={() => deleteFile(file._id)} className="btn btn-ghost bg-indigo-600  text-white"><FaTrashAlt></FaTrashAlt></button></td>
                  
                </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default FileItem;