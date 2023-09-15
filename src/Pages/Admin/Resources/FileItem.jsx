import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import '../Resources/Resouresd.scss'
const FileItem = ({ file, deleteFile }) => {
    return (
        <>
            <li
                className="file-item1"
                key={file.name}>
                <FontAwesomeIcon icon={faFileAlt} />
                <p>{file.originalname}</p>
                <div className="actions">
                    <div ></div>
                    {file.isUploading && <FontAwesomeIcon
                        icon={faSpinner} className="fa-spin"
                        onClick={() => deleteFile(file._id)} />
                    }
                    {!file.isUploading &&
                        <FontAwesomeIcon icon={faTrash}
                            onClick={() => deleteFile(file._id)} />
                    }
                </div>
            </li>
        </>
    );
};

export default FileItem;