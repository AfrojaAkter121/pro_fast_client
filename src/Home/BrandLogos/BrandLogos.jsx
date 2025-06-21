import React from "react";
import Marquee from "react-fast-marquee";

// Replace these with your actual logos
import logo1 from "../../assets/brands/amazon.png";
import logo2 from "../../assets/brands/amazon_vector.png";
import logo3 from "../../assets/brands/casio.png";
import logo4 from "../../assets/brands/moonstar.png";
import logo5 from "../../assets/brands/randstad.png";
import logo6 from "../../assets/brands/start-people 1.png";
import logo7 from "../../assets/brands/start.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const BrandLogos = () => {
  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto text-center">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#00313d] mb-8">
      We've helped thousands of sales teams
      </h1>

      {/* Marquee Logo Slider */}
      <Marquee
        speed={60}
        gradient={true}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        <div className="flex gap-20 items-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                className=" w-auto object-contain transition duration-300"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default BrandLogos;
