import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { reload } from 'firebase/auth';

const Resources = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [resources, setResources] = useState([]);
    const [selectedResource, setSelectedResource] = useState(0);

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
        }, [reload]);

        useEffect(() => {
        // Fetch resources data from the provided URL
        fetch('https://intern-first-server-farjanaakterlaila.vercel.app/homework')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Filter resources based on your condition
                const filteredResources = data.filter(
                    (resource) =>
                        resource.Batch === userData.Batch && resource.Class === userData.Class
                );
                console.log(filteredResources);
                setResources(filteredResources);
            })
            .catch((error) => {
                console.error('Error fetching resources data:', error);
            });

        // Ensure PDF.js worker is set up properly
    }, [userData]);

    const handleResourceClick = (resource) => {
        setSelectedResource(resource);
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 mt-8">
            {resources.map((resource) => (
                <div key={resource._id} className="card w-96 shadow-xl">
                    <figure>
                        <img className="w-full h-52" src={resource.Image} alt="Resource" />
                    </figure>
                    
                    <div className="card-body flex flex-col items-start">
                        <h2 className="card-title">Instruction: {resource.instruction}</h2>
                        <h2 className="card-title">Start date: {resource.startdate}</h2>
                        <p className="card-title">Last date: {resource.lastdate}</p>
                        
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Resources;
