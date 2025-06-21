import React from 'react';
import banner1 from "../../assets/banner/banner1.png"
import banner2 from "../../assets/banner/banner2.png"
import banner3 from "../../assets/banner/banner3.png"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Banner = () => {
    return (
       <div className='max-w-7xl mx-auto mt-10'>
         <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
        <div>
            <img src={banner1} />
          
        </div>
        <div>
            <img src={banner2} />
            
        </div>
        <div>
            <img src={banner3} />
            
        </div>
    </Carousel>
       </div>
    );
};

export default Banner;