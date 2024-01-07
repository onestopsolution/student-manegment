import React, { useContext, useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { AuthContext } from '../../../Providers/AuthProvider';

const StudentTotal = () => {


    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
  
  
    useEffect(() => {
      // Fetch data from the provided URL
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
          console.error('Error fetching data:', error);
        });
    }, [user]);

    return (
        <div className='flex flex-col lg:flex-row flex-wrap justify-center gap-8 h-fit text-center mt-0 lg:mt-5'>
            <Tilt>
                <div data-aos='flip-left' data-aos-duration="3000" className="stats bg-gradient-to-r from-[#0093E9] to-[#80D0C7] bg-opacity-90 shadow-lg shadow-black w-50 px-2 py-3">

                    <div className="stat">
                        <div className="stat-title text-black font-bold">Enrolled Courses</div>
                        <div className="stat-value text-black">10</div>
                    </div>

                </div>
            </Tilt>
            <Tilt>
                <div data-aos="flip-up" data-aos-duration="3000" className="stats bg-gradient-to-r from-[#0093E9] to-[#80D0C7] bg-opacity-90 shadow-lg shadow-black w-50 px-2 py-3">

                    <div className="stat">
                        <div className="stat-title text-black font-bold">Due Payment</div>
                        <div className="stat-value text-black">{userData.dueamount} BDT</div>
                    </div>

                </div>
            </Tilt>
            <Tilt>
                <div data-aos='flip-right' data-aos-duration="3000" className="stats bg-gradient-to-r from-[#0093E9] to-[#80D0C7] bg-opacity-90 shadow-lg shadow-black w-50 px-2 py-3">

                    <div className="stat">
                        <div className="stat-title text-black font-bold">Last Payment Date</div>
                        <div className="stat-value text-black">{userData.paydate}</div>
                    </div>

                </div>
            </Tilt>
        </div>
    );
};

export default StudentTotal;