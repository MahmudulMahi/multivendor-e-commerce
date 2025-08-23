import React from "react";
import { returnPagination } from "@/utils/pagination";
import { MdOutlineNavigateNext, GrFormPrevious } from "@/icons";
const Pagination = ({ page, setPage, totalPage }) => {
  const handleChange = (e) => {
    if (e == "prev") {
      if (page > 1) {
        setPage(page - 1);
      }
    } else if (e == "next") {
      if (page < totalPage) {
        setPage(page + 1);
      }
    } else {
      if (e == " ...") {
        setPage(1);
      } else if (e == "... ") {
        setPage(totalPage);
      } else {
        setPage(e);
      }
    }
  };

  return (
    <div className="flex  items-center justify-end mt-4 space-x-2">
      <Paginations
        totalPage={totalPage}
        page={page}
        limits={10}
        siblings={1}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Pagination;

const Paginations = ({ totalPage, page, limits, siblings, handleChange }) => {
  const arr = returnPagination(totalPage, page, limits, siblings);
  return (
    <div className="flex justify-end  ">
      <div>
        <div className="pag flex gap-2 ">
          <button
            onClick={(e) => handleChange("prev")}
            className="px-1 w-10 py-2 text-sm  bg-gray-200 text-black rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-400  text-center flex justify-center items-center "
          >
            <GrFormPrevious />
          </button>

          {arr.map((item, index) => (
            <button
              onClick={(e) => handleChange(item)}
              key={index}
              className={`px-1 py-2 text-sm    rounded disabled:opacity-50 disabled:cursor-not-allowed   w-10 ${
                page == item
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-black"
              }  ${page === item ? "hover:bg-blue-500" : "hover:bg-blue-400"}`}
            >
              {item}
            </button>
          ))}

          <button
            onClick={(e) => handleChange("next")}
            className="px-1 py-2 text-sm w-10    rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-400   bg-gray-200 text-black flex justify-center items-center"
          >
            <MdOutlineNavigateNext />
          </button>
        </div>
      </div>
    </div>
  );
};
