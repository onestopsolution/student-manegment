import React from 'react';
import { Outlet } from 'react-router-dom';

const SecurityLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default SecurityLayout;