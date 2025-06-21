// src/components/TestimonialSlider.jsx

import { useState } from "react";
import {
  BiChevronLeft,
  BiChevronRightCircle,
} from "react-icons/bi";

const testimonials = [
  {
    name: "Awlad Hossin",
    role: "Senior Product Designer",
    message:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Nasir Uddin",
    role: "CEO",
    message:
      "ProFast delivery exceeded my expectations. Quick, reliable, and always on time!",
  },
  {
    name: "Rasel Ahamed",
    role: "CTO",
    message:
      "The service is top-notch! I use ProFast for all my business deliveries now.",
  },
  {
    name: "Mithila Khan",
    role: "Operations Lead",
    message:
      "Scheduling deliveries has never been easier. Love the real-time tracking too!",
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

  const nextSlide = () =>
    setCurrent((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-20">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          What our customers are saying
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mt-2">
          Enhance posture, mobility, and well-being effortlessly with ProFast delivery.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative flex items-center justify-center overflow-hidden min-h-[250px]">
        {testimonials.map((testimonial, index) => {
          const isActive = index === current;
          const isPrev =
            index === (current - 1 + testimonials.length) % testimonials.length;
          const isNext = index === (current + 1) % testimonials.length;

          let classNames =
            "transition-all duration-500 ease-in-out absolute top-0 left-0 w-full md:w-1/3 px-4";
          if (isActive) {
            classNames += " opacity-100 translate-y-0 z-20";
          } else if (isPrev) {
            classNames +=
              " opacity-30 translate-y-4 -translate-x-[120%] z-10";
          } else if (isNext) {
            classNames +=
              " opacity-30 translate-y-4 translate-x-[120%] z-10";
          } else {
            classNames += " opacity-0 pointer-events-none";
          }

          return (
            <div key={index} className={classNames}>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <p className="text-gray-600 mb-4">
                  “{testimonial.message}”
                </p>
                <div className="text-teal-700 font-semibold">
                  {testimonial.name}
                </div>
                <div className="text-gray-500 text-sm">
                  {testimonial.role}
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-16 bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-100 z-30"
        >
          <BiChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-16 bg-lime-400 rounded-full p-2 hover:bg-lime-500 z-30"
        >
          <BiChevronRightCircle size={24} className="text-white" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === current ? "bg-lime-400" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
}
