import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/route";
import PageLayout from "@/components/ui/PageLayout";

const PageNotFound = () => {
  return (
    <PageLayout>
      <Link href={ROUTES?.HOME} aria-label="bajar.net" className="relative">
        <div className="w-full aspect-auto">
          {" "}
          <Image
            src={"/404.gif"}
            width={1000}
            height={1000}
            className="w-full h-full"
            alt="loading"
          />
        </div>
      </Link>
    </PageLayout>
  );
};

export default PageNotFound;
