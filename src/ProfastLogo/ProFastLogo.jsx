import React from 'react';
import logo from "../assets/logo.png"; // Assuming you have a logo image in the assets folder

const ProFastLogo = () => {
    return (
        <div className="flex ">
            <img src={logo} alt=""/>
            <h1 className="text-2xl font-bold mt-5 -ml-3">Profast</h1>
        </div>
    );
};

export default ProFastLogo;