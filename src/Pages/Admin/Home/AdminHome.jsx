import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import Acadeiccalender from '../AcademicCalender/Acadeiccalender';
import AdminTotal from '../AdminTotal/AdminTotal';
import ExpenseGraph from '../ExpenseGraph/ExpenseGraph';
import IncomeGraph from '../Income&ExpenseGraph/IncomeGraph';

const AdminHome = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className='mt-10 ml-10 flex flex-col items-center'>
            <h1 className='text-3xl text-center lg:text-start font-bold'>Welcome <span className='text-indigo-600'>{user ? user.displayName : 'Guest'}</span></h1>
            <div className='mt-10'>
                <AdminTotal></AdminTotal>
            </div>
            <div className='mt-10 w-4/5 mr-8 flex flex-col'>
                <IncomeGraph></IncomeGraph>
                <ExpenseGraph></ExpenseGraph>
                <Acadeiccalender></Acadeiccalender>
            </div>
        </div>
    );
};

export default AdminHome;