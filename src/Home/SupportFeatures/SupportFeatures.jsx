import React from "react";
import img1 from "../../assets/live-tracking.png";
import img2 from "../../assets/safe-delivery.png";

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment journey and get instant status updates for complete peace of mind.",
    image: img1,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: img2,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need it!",
    image: img2,
  },
];

const SupportFeatures = () => {
  return (
    <section className="py-12 my-14 max-w-6xl mx-auto border-dashed border-y border-gray-400 ">
      <div className="space-y-10">
        {features.map((feature, index) => (
          <div
        //   data-aos="flip-left"
        //   data-aos-easing="ease-out-cubic"
        //   data-aos-duration="2000"
            key={index}
            className="bg-white rounded-2xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
          >
            {/* Image */}
            <div className="w-full md:w-1/4 flex justify-center">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-36 h-auto object-contain"
              />
            </div>

            {/* Divider (horizontal for mobile) */}
            <div className="block md:hidden w-full h-px bg-gray-300 my-4" />

            {/* Divider (vertical for desktop) */}
            <div className="hidden md:block w-px h-24 bg-gray-300" />

            {/* Text */}
            <div className="w-full md:w-3/4">
              <h3 className="text-xl font-semibold text-[#00313d] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupportFeatures;
