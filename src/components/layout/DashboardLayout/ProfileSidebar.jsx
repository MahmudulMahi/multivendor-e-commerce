import {
  FaUser,
  FaBoxOpen,
  FaSignOutAlt,
  MdOutlineLocationOn, 
  CiFaceSmile,
  BiLockAlt
} from "@/icons";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { ROUTES } from "@/constants/route";
import { useRouter } from "next/router";
import Image from "next/image";
export default function AccountSidebar() {
  const { user, logout } = useAuth();
  const { pathname } = useRouter();

  return (
    <div className="shrink-0 p-4 border rounded-md shadow-sm bg-white h-screen md:h-[calc(100vh-142px)]">
      <div className="mb-4">
        {/* <p className="text-gray-600 text-sm">Hello,</p> */}
        <div className="flex justify-center">
          <div className="flex w-25 justify-center aspect-square">
            <Image
              src={`${process?.env.NEXT_PUBLIC_API_SERVER}${user?.image}`}
              priority
              width={100}
              height={100}
              className="rounded-full object-cover w-25 h-25"
              alt="loading..."
            />
          </div>
        </div>
        <p className="font-semibold text-gray-800"> {user?.name} </p>
        <span className="inline-block mt-1 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
          Verified Account
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <h1 className="text-gray-700 font-medium flex items-center gap-2">
            <FaUser className="text-gray-500" />
            Manage My Account
          </h1>
          <div className="ml-6 mt-1 space-y-2 ">
            <Link
              href={ROUTES?.ACCOUNT}
              className={` ${
                ROUTES?.ACCOUNT === pathname ? "text-primary" : "text-gray-700"
              } font-medium cursor-pointer hover:underline flex items-center gap-1`}
            >
              <CiFaceSmile   /> My Profile
            </Link>
            <Link
              href={ROUTES?.ADDRESS}
              className={` ${
                ROUTES?.ADDRESS === pathname ? "text-primary" : "text-gray-700"
              } font-medium cursor-pointer flex items-center gap-1 hover:underline`}
            >
              <MdOutlineLocationOn />
              Addresses
            </Link>
            <Link
              href={ROUTES?.CHANGE_PASSWORD}
              className={` ${
                ROUTES?.CHANGE_PASSWORD === pathname ? "text-primary" : "text-gray-700"
              } font-medium cursor-pointer flex items-center gap-1 hover:underline`}
            >
              <BiLockAlt />
              Change Password
            </Link>
          </div>
        </div>
        <div>
          <Link
            href={ROUTES?.ORDERS}
            className={` ${
              ROUTES?.ORDERS === pathname ? "text-primary" : "text-gray-700"
            } font-medium cursor-pointer flex items-center gap-1 hover:underline`}
          >
            <FaBoxOpen className="text-gray-500" />
            My Orders
          </Link>
          <div className="ml-6 mt-1 space-y-1">
            {/* <Link href={""} className={` ${ROUTES?.ADDRESS===pathname?'text-primary':'text-gray-700'} font-medium cursor-pointer flex items-center gap-1 hover:underline`}>
              <BiRefresh />
              My Returns
            </Link>
            <Link href={""} className={` ${ROUTES?.ADDRESS===pathname?'text-primary':'text-gray-700'} font-medium cursor-pointer flex items-center gap-1 hover:underline`}>
              <MdCancel />
              My Cancellation
            </Link> */}
          </div>
        </div>
        <div>
          <h1
            className="text-gray-700 font-medium flex items-center gap-2 cursor-pointer hover:underline"
            onClick={() => logout()}
          >
            <FaSignOutAlt className="text-gray-500" />
            Logout
          </h1>
        </div>
      </div>
    </div>
  );
}
