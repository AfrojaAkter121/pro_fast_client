import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const Mainlayout = () => {
    return (
        <div className='bg-gray-200 min-h-screen'>
            <div className=''>
            <Navbar></Navbar>
            </div>
            <div className='min-h-screen'>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Mainlayout;