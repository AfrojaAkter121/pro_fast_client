// src/components/FaqSection.jsx

import { useState } from "react";

import { BiChevronDown, BiChevronDownCircle } from "react-icons/bi";

const faqs = [
  {
    question: "How does ProFast delivery service work?",
    answer:
      "ProFast ensures quick and reliable delivery by partnering with local couriers. Once an order is placed, it is processed and dispatched to the nearest delivery partner for rapid fulfillment.",
  },
  {
    question: "What areas do you deliver to?",
    answer:
      "We currently deliver to all major cities and towns. To check availability, enter your postal code at checkout.",
  },
  {
    question: "Can I schedule a delivery time?",
    answer:
      "Yes, we offer scheduled deliveries in select areas. Choose your preferred time slot during checkout.",
  },
  {
    question: "What if my order is late?",
    answer:
      "If your order is delayed, our support team will notify you via SMS or email. You may also be eligible for compensation depending on the delay.",
  },
  {
    question: "How do I track my delivery?",
    answer:
      "Once your order ships, you'll receive a tracking link via SMS or email to monitor its progress in real-time.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className=" py-12 ">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-center text-gray-600 mt-2 mb-8">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className=" rounded-xl bg-white shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? -1 : index)
                }
                className="w-full flex justify-between items-center px-4 py-4 font-medium text-left text-gray-800"
              >
                {faq.question}
                <BiChevronDownCircle
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold py-2 px-6 rounded-full flex items-center gap-2 mx-auto">
            See More FAQ’s
            <span className="bg-black p-1 rounded-full text-white">
              <BiChevronDown size={16} className="rotate-45" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
