 

import { useState } from "react";
import clsx from "clsx";
import PageLayout from "@/components/ui/PageLayout";

const faqData = [
  {
    question: "How can I become a vendor on the platform?",
    answer:
      "To become a vendor, simply register on our platform, provide necessary business information, and submit for approval. Once approved, you can start listing your products.",
  },
  {
    question: "Are there any fees for listing products?",
    answer:
      "We offer a free basic plan for new vendors. For premium features and higher visibility, please check our pricing plans under the vendor dashboard.",
  },
  {
    question: "How does order management work?",
    answer:
      "Vendors can manage orders through the vendor panel where you can track, update, and fulfill customer orders efficiently.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "Our platform supports multiple payment gateways including credit cards, PayPal, and mobile wallets like bKash for seamless transactions.",
  },
  {
    question: "Can I integrate my own shipping method?",
    answer:
      "Yes, vendors can configure shipping options in their dashboard or integrate with supported logistics partners.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-6  font-poppins">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqData.map(({ question, answer }, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center p-5 focus:outline-none"
                aria-expanded={isActive}
                aria-controls={`faq-content-${index}`}
                id={`faq-header-${index}`}
              >
                <span className="text-lg font-semibold text-gray-800">
                  {question}
                </span>
                <span
                  className={clsx(
                    "text-2xl font-bold text-primary select-none transition-transform duration-300",
                    {
                      "rotate-45": isActive,
                    }
                  )}
                >
                  +
                </span>
              </button>

              {/* Content wrapper with max-height animation */}
              <div
                id={`faq-content-${index}`}
                role="region"
                aria-labelledby={`faq-header-${index}`}
                className={clsx(
                  "px-5 pb-5 text-gray-600 overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out",
                  {
                    "max-h-96 opacity-100": isActive,
                    "max-h-0 opacity-0": !isActive,
                  }
                )}
                style={{ transitionProperty: "max-height, opacity" }}
              >
                <p>{answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </PageLayout>
  );
}
