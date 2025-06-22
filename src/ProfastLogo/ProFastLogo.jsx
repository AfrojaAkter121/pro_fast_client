import React from 'react';
import logo from "../assets/logo.png"; // Assuming you have a logo image in the assets folder
import { Link } from 'react-router';

const ProFastLogo = () => {
    return (
        <Link to='/'>
            <div className="flex ">
            <img src={logo} alt=""/>
            <h1 className="text-2xl font-bold mt-5 -ml-3">Profast</h1>
        </div>
        </Link>
    );
};

export default ProFastLogo;