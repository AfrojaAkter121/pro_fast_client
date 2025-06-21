import React, { useEffect } from 'react';
import boxImage from "../../assets/location-merchant.png"
import  AOS  from 'aos';


const BeMarChant = () => {
    
        useEffect(() => {
          AOS
          .init({ duration: 1000 });
        }, []);
    return (
        <section
        data-aos="flip-left"
         className="bg-[#003c3b] bg-no-repeat bg-[url(assets/be-a-merchant-bg.png)] max-w-6xl mx-auto text-white rounded-2xl p-10 my-10 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 max-w-7xl mx-auto">
          
          {/* Left Text Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Merchant and Customer Satisfaction <br />
              is Our First Priority
            </h2>
            <p className="text-sm text-gray-200 mb-6">
              We offer the lowest delivery charges with the highest value along with
              100% safety of your product. Profast courier delivers your parcel in every
              corner of Bangladesh right on time.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-5 py-2 rounded-full transition">
                Become a Merchant
              </button>
              <button className="border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black font-semibold px-5 py-2 rounded-full transition">
                Earn with Profast Courier
              </button>
            </div>
          </div>
  
          {/* Right Image Side */}
          <div className="relative w-full h-full">
            {/* White top overlay */}
            <div className="absolute -top-16 -left-16 w-[150%] h-40 bg-gradient-to-tr from-white/40 to-transparent rounded-full rotate-[15deg] pointer-events-none z-10" />
            
            {/* Actual Image */}
            <img
              src={boxImage}
              alt="Boxes with location"
              className="relative z-0 w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </section>
    );
};

export default BeMarChant;