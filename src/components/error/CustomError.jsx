import React from "react";
import { FiAlertTriangle } from "@/icons";
import PageLayout from "../ui/PageLayout";

const CustomError = ({ message }) => {
  const handleReset = () => {
    window.location.reload();
  };
  return (
    <PageLayout>
      <div className="min-h-[300px] flex flex-col items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg shadow-inner animate-fade-in">
        <FiAlertTriangle className="text-red-500 text-5xl mb-4 animate-bounce" />
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          কিছু একটা ভুল হয়েছে!
        </h2>
        <p className="text-gray-700 mb-4 text-sm text-center max-w-md">
          {message || "দুঃখিত, এই অংশটি এখন লোড করা যাচ্ছে না।"}
        </p>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-all duration-200"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    </PageLayout>
  );
};

export default CustomError;
 
