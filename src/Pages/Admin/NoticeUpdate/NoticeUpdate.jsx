import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import AdminTotal from '../AdminTotal/AdminTotal';

const NoticeUpdate = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className='flex flex-col items-center gap-10 ml-8'>
            <div>
                <h1 className='text-3xl text-center lg:text-start font-bold'>Hey, <span className='text-indigo-600'>{user ? user.displayName : 'Guest'}</span></h1>
                <div className='mt-10'>
                    <AdminTotal></AdminTotal>
                </div>
            </div>
            <div className='flex flex-col gap-5 bg-indigo-100 p-5 items-center w-full mr-10 rounded-xl'>
                <h1 className='text-center w-full text-3xl bg-purple-500 text-white px-5 py-2 rounded-xl font-semibold border-b-4 border-black'>Send Notice / Information</h1>
                <div className="dropdown dropdown-hover mt-5">
                    <label tabIndex={0} className="btn m-1">Select Batch</label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-slate-100 rounded-box w-52">
                        <li><a>Batch 1</a></li>
                        <li><a>Batch 2</a></li>
                    </ul>
                </div>
                <textarea placeholder="Write your Notice" className="textarea textarea-bordered textarea-lg text-white w-full max-w-screen-lg" ></textarea>
                <button className='btn btn-primary w-4/5 font-semibold'>Send Notice</button>
            </div>
        </div>
    );
};

export default NoticeUpdate;