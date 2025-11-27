import { customService } from "@/constants/footer";
import { ROUTES } from "@/constants/route";
import useCategories from "@/hooks/api/Category/useCategory";
import { FaWhatsapp, FaPhoneAlt } from "@/icons";
import Link from "next/link";

export default function Footer() {
  const { data: categoryList } = useCategories();
  return (
    <footer className="bg-primary text-white z-20 py-10 overflow-hidden px-6 relative before:absolute before:-top-52 before:-right-48 before:bg-[#E03B3B]  before:w-[434px] before:h-[434px] before:rounded-full after:absolute after:-top-52 after:-right-48 after:border after:border-[#8B70D1]  after:w-[445px] after:h-[445px]   after:rounded-full">
      <div className="container-custom max-w-7xl  flex flex-col md:flex-row justify-between">
        {/* Left Section */}
        <div className="mb-8 md:mb-0 md:w-1/3">
          <h1 className="text-3xl font-bold leading-tight">
            Baajar
            <br />
            E-Com
          </h1>
          <div className="mt-6">
            <p className="font-semibold mb-2">Contact Us</p>
            <div className="flex items-center gap-2 mb-2">
              <FaWhatsapp />
              <span>
                Whats App
                <br />
                +1 202-918-2132
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt />
              <span>
                Call Us
                <br />
                +1 202-918-2132
              </span>
            </div>
          </div>
        </div>

        {/* Center Section */}
        <div className="mb-8 md:mb-0 md:w-1/3">
          <h1 className="font-semibold border-b border-white mb-4 inline-block">
            Most Popular Categories
          </h1>
          <div className="space-y-2 text-sm flex flex-col">
            {categoryList?.slice(0,7)?.map((category, idx) => (
              <Link
                href={ROUTES?.CATEGORY_DETAILS(category?.category_id)}
                aria-label="bajar.net"
                key={idx}
                className="hover:underline"
              >
                • {category?.category_name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3">
          <h1 className="font-semibold border-b border-white mb-4 inline-block">
            Customer Services
          </h1>
          <div className="space-y-2 text-sm flex flex-col">
            {customService.map((item, idx) => (
              <Link
                href={item?.href}
                aria-label="bajar.net"
                key={idx}
                className="hover:underline"
              >
                • {item?.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white mt-10 pt-4 text-center text-sm">
        © 2025 All rights reserved. Baajar Ltd.
      </div>
    </footer>
  );
}
