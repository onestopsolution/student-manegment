import React, { useState , useEffect} from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {

   
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
  
  
    useEffect(() => {
      // Fetch data from the provided URL
      fetch(`  https://intern-first-server-farjanaakterlaila.vercel.app/post-toy?email=${user?.email}`)
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
    // console.log(userData);
    const navigate = useNavigate();
    return (
        <div className='flex mt-8 lg:mt-0 flex-col lg:flex-row items-center justify-around gap-10 lg:gap-20 min-h-screen w-11/12 my-5 ml-4 lg:ml-14 rounded-3xl'>
            <div data-aos="fade-right" data-aos-duration="3000" className='w-fit md:w-96 bg-gradient-to-b from-[#8EC5FC] to-[#E0C3FC] px-5 lg:px-10 py-8 rounded-xl flex flex-col items-center border-y-4 border-black'>
                <img src={userData ? userData.Image : 'https://i.ibb.co/X58Dht9/businesswoman-standing-thinking-near-big-question-mark-isolated-white-background.jpg'} className="w-52 h-52 rounded-xl shadow-lg shadow-black" />
                <div className='mt-5'>
                    <h1 className='text-3xl font-bold text-center'>About Myself</h1>
                    <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum id dolorum soluta nulla, illum rerum exercitationem tempore officiis sit odio totam fuga et illo vitae. Beatae numquam tempore quisquam velit iste minus atque veniam veritatis vero! Ad illo, ab enim asperiores sapiente deserunt veniam quaerat quis quia molestiae beatae id.</p>
                    
                        <button className='bg-gradient-to-r from-[#B721FF] to-[#21D4FD] px-8 py-2 flex items-right justify-right gap-2 rounded-full text-white font-semibold shadow-2xl shadow-black border-x-4 border-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' ><FaEdit/></button>
                   
                </div>
            </div>
            <div data-aos="fade-left" data-aos-duration="3000" className='w-4/5'>
                <h1 className='text-3xl text-white font-bold text-center bg-gradient-to-r from-[#B721FF] to-[#21D4FD] rounded-full py-2 border-b-4 border-black'>My Profile</h1>
                {/* <h3 className='mt-5 text-3xl ml-10'><span className='font-semibold'>Hey,</span> This is <span className='font-bold'>{user ? user.displayName : 'Guest'}</span></h3> */}
                <div data-aos="fade-down" data-aos-duration="3000" className='mt-5 bg-gradient-to-t from-[#B5FFFC] to-[#FFDEE9] px-5 lg:px-10 py-8 flex flex-col gap-5 text-xl mx-1 lg:mx-10 rounded-2xl border-x-4 border-black'>
                    <p className='font-semibold lg:font-bold'>Name : <span>{userData.name }</span></p>
                    <p className='font-semibold lg:font-bold'>Father's Name : <span>{userData.fatherName}</span></p>
                    <p className='font-semibold lg:font-bold'>Mother's Name : <span>{userData. motherName}</span></p>
                    <p className='font-semibold lg:font-bold'>School : <span>{userData.instituteName}</span></p>
                    <p className='font-semibold lg:font-bold'>Contact : <span>{userData.WhatsAppNumber}</span></p>
                    <p className='font-semibold lg:font-bold'>Batch : <span>{userData.Batch }</span></p>
                    <p className='font-semibold lg:font-bold'>Location : <span>{userData.location }</span></p>
                    <p className='font-semibold lg:font-bold'>Date of Birth : <span>{userData.brithday }</span></p>
                    <div className='w-full flex items-center justify-center mt-5'>
                        <button className='bg-gradient-to-r from-[#B721FF] to-[#21D4FD] px-8 py-2 flex items-center justify-center gap-2 rounded-full text-white font-semibold shadow-2xl shadow-black border-x-4 border-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' onClick={() => navigate(`/edit/${userData._id}`)}><FaEdit/>Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;