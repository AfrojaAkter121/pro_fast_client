import React from 'react';
import Banner from './Header/Banner';
import HowItWorks from './HowItWorks/HowItWorks';
import OurServices from './OurServices/OurServices';
import SupportFeatures from './SupportFeatures/SupportFeatures';
import BrandLogos from './BrandLogos/BrandLogos';
import BeMarChant from './BeMarChant/BeMarChant';
import FaqSection from './FaqSection/FaqSection';
import TestimonialSlider from './TestimonialSlider/TestimonialSlider';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <BrandLogos></BrandLogos>
            <SupportFeatures></SupportFeatures>
            <BeMarChant></BeMarChant>
            <FaqSection></FaqSection>
            <TestimonialSlider></TestimonialSlider>
        </div>
    );
};

export default Home;