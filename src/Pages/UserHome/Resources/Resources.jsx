import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const Resources = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [resources, setResources] = useState([]);

    useEffect(() => {
        // Fetch user data from the provided URL
        fetch(` https://intern-first-server-farjanaakterlaila.vercel.app/post-toy?email=${user?.email}`)
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
    }, [user]);

    useEffect(() => {
        // Fetch resources data from the provided URL
        fetch(' https://intern-first-server-farjanaakterlaila.vercel.app/files')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Filter resources based on your condition
                const filteredResources = data.filter((resource) =>
                    resource.batchName === userData.Batch || resource.className === userData.Class
                );
                setResources(filteredResources);
            })
            .catch((error) => {
                console.error('Error fetching resources data:', error);
            });
    }, [userData]);

    return (
        <div>
            <h1>Resources:</h1>
            <ul>
                {resources.map((resource) => (
                    <li key={resource._id}>
                        <a href={` https://intern-first-server-farjanaakterlaila.vercel.app/download/${resource.filename}`} download>
                            {resource.filename} (Download)
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Resources;
