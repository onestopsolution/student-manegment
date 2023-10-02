import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { Document, Page, pdfjs } from 'react-pdf';
import '@react-pdf-viewer/core/lib/styles/index.css'; // Import styles

const Resources = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [resources, setResources] = useState([]);
    const [selectedResource, setSelectedResource] = useState(null);

    useEffect(() => {
        // Fetch user data from the provided URL
        fetch(`https://intern-first-server-farjanaakterlaila.vercel.app/post-toy?email=${user?.email}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Assuming user data is the first item in the array
                if (data.length > 0) {
                    setUserData(data[0]);
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });

        // Fetch resources data from the provided URL
        fetch('https://intern-first-server-farjanaakterlaila.vercel.app/files')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Filter resources based on your condition
                const filteredResources = data.filter(
                    (resource) =>
                        resource.batchName === userData.Batch || resource.className === userData.Class
                );
                setResources(filteredResources);
            })
            .catch((error) => {
                console.error('Error fetching resources data:', error);
            });

        // Ensure PDF.js worker is set up properly
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    }, [user]);

    const handleResourceClick = (resource) => {
        setSelectedResource(resource);
    };

    return (
        <div>
            <h1>Resources:</h1>
            <ul>
                {resources.map((resource) => (
                    <li key={resource._id}>
                        <button onClick={() => handleResourceClick(resource)}>
                            {resource.filename}
                        </button>
                    </li>
                ))}
            </ul>

            {selectedResource && (
                <div>
                    <Document
                        file={` https://intern-first-server-farjanaakterlaila.vercel.app/pdfs/${selectedResource.filename}`}
                        onLoadSuccess={console.log}
                    >
                        <Page pageNumber={1} />
                    </Document>
                </div>
            )}
        </div>
    );
};

export default Resources;
