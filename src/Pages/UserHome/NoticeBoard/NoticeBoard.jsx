import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { reload } from 'firebase/auth';

const NoticeBoard = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [resources, setResources] = useState([]);

    useEffect(() => {
        // Fetch user data from the provided URL
        fetch(`https://intern-first-server-farjanaakterlaila.vercel.app/post-toy?email=${user?.email}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data[0]);
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
        fetch('https://intern-first-server-farjanaakterlaila.vercel.app/adminDashboard/notice')
            .then((response) => response.json())
            .then((data) => {
                console.log(data.selectedClass);
                // Filter resources based on your condition
                const filteredResources = data.filter(
                    (resource) =>
                        resource.selectedBatch === userData.Batch && resource.selectedClass === userData.Class
                );
                setResources(filteredResources);
            })
            .catch((error) => {
                console.error('Error fetching resources data:', error);
            });
    }, [userData]);

    return (
        <div className='mt-8 mb-8 lg:mb-0 flex flex-col items-center'>
            <div data-aos="flip-up" className='bg-gradient-to-r from-indigo-200 to-blue-700 py-1 rounded-xl border-b-4 border-black w-4/5'>
                <h1 className='text-center text-3xl uppercase font-bold text-white'>Notice Board</h1>
            </div>
            <div data-aos="flip-down" data-aos-duration="2000" className='flex justify-around w-full'>
                <div className="divider divider-horizontal bg-black h-5 w-1"></div>
                <div className="divider divider-horizontal bg-black h-5 w-1"></div>
            </div>
            <div data-aos="fade-down" data-aos-duration="3000" className="artboard artboard-horizontal w-3/5 max-h-screen py-5 bg-gradient-to-r from-indigo-100 to-blue-200 hover:bg-gradient-to-r hover:from-cyan-200 hover:to-blue-300 rounded-xl">
                <div className='flex flex-col items-center gap-5 '>
                    {resources.map((notice) => (
                        <div key={notice._id} className='bg-white w-4/5 px-3 text-center py-1 font-semibold rounded-xl transition ease-in-out  hover:-translate-y-1 hover:scale-110 '>
                            {notice.noticeText}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NoticeBoard;
