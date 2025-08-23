import React from "react";
import Spinner from "../loader/Spinner";

const InfinityLoadingButton = ({ loadingRef, infinityLoading }) => {
 
  return (
    <div ref={loadingRef} className={`flex justify-center ${infinityLoading&&'mt-3'}`} >
      {infinityLoading && (
        <button className="text-primary border border-primary rounded-full w-96 h-16 font-medium text-lg md:text-xl lg:text-2xl hover:bg-primary/10 flex items-center justify-center gap-1">
          Load More <Spinner />
        </button>
      )}
    </div>
  );
};

export default InfinityLoadingButton;
