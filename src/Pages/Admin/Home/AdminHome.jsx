import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import AdminTotal from '../AdminTotal/AdminTotal';
import IncomeGraph from '../Income&ExpenseGraph/IncomeGraph';

const AdminHome = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className='mt-10 ml-10'>
            <h1 className='text-3xl text-start font-bold'>Welcome <span className='text-indigo-600'>{user ? user.displayName : 'Guest'}</span></h1>
            <div className='mt-10'>
                <AdminTotal></AdminTotal>
            </div>
            <IncomeGraph></IncomeGraph>
        </div>
    );
};

export default AdminHome;