import React from 'react';
import { Outlet } from 'react-router-dom';
import ParticlesBg from 'particles-bg'
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div className=''>
            <ParticlesBg type="polygon" bg={true} />
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;