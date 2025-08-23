import { privateRequest } from "@/lib/axios";
import { networkErrorHandeller } from "@/utils/helpers";
import { notifySuccess } from "@/utils/toast";
import { useState } from "react";
import Spinner from "../loader/Spinner";

const DefaultAddress = ({
  setOpenDrawer,
  setOpenType,
  addressData,
  refetch,
}) => {
  const [address, setAddress] = useState({});
  const [selectedAddressId, setSelectedAddressId] = useState(
    addressData.find((a) => a.default_address === 1)?.id
  );
  // default address change area 
  const [btnLoading,setBtnLoading] = useState(false);
  const handleDefaultAddressChange = async () => {
    if (!selectedAddressId) return Toastify.Error("Please Select address");
    setBtnLoading(true)
    try {
      const response = await privateRequest.post("user/address/default", {
        address_id: address?.id,
      });
      if (response?.status) {
        setBtnLoading(false)
        notifySuccess(response?.data?.message);
        refetch(); 
        setOpenDrawer(false);
      }
    } catch (error) {
      networkErrorHandeller(error);
      setBtnLoading(false)
    }
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Shipping Address
        </h2>
        <button
          onClick={() => {
            setOpenType("create");
            setOpenDrawer(true);
          }}
          className="text-blue-600 hover:underline text-sm"
        >
          Add new address
        </button>
        {/* create modal  */}
      </div>

      {/* Address List */}
      {addressData.map((address, index) => (
        <div
          key={index}
          className={`border rounded-lg p-5 mb-4 cursor-pointer ${
            selectedAddressId === address?.id ||
            (!selectedAddressId && address?.default_address)
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300"
          }`}
          onClick={() => {
            setAddress(address);
            setSelectedAddressId(address?.id);
          }}
        >
          <div className="flex items-start gap-4">
            <input
              type="radio"
              name="address"
              className="mt-1 accent-blue-500 cursor-pointer"
              checked={
                selectedAddressId === address?.id ||
                (!selectedAddressId && address?.default_address)
              }
              onChange={() => {
                setAddress(address);
                setSelectedAddressId(address?.id);
              }}
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="text-base font-medium text-gray-800">
                  {address?.name}
                  <span className="text-gray-500 text-sm">
                    {address?.phone}
                  </span>
                </div>
                <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded">
                  {address?.type}
                </span>
              </div>
              {!address?.default_address && (
                <p className="text-sm text-gray-600 mt-1 bg-blue-100 px-1 py-0.5 rounded-md">
                  Use as default shipping address
                </p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Region: {address?.address_line1}
                <br />
                {address?.area?.name},{address?.city?.name},
                {address?.division?.name}
              </p>
              {address?.default_address === 1 && (
                <div className="mt-3 flex gap-2">
                  <button className="text-xs px-3 py-1 border border-blue-500 text-blue-600 rounded hover:bg-blue-50">
                    Default Shipping Address
                  </button>
                  <button className="text-xs px-3 py-1 border border-blue-500 text-blue-600 rounded hover:bg-blue-50">
                    Default Billing Address
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6   bg-white">
        {/* <button
          onClick={() => setOpenDrawer(false)}
          className="px-6 py-2 border rounded text-gray-600 border-gray-300 hover:bg-gray-100"
        >
          CANCEL
        </button> */} 
        <button
          onClick={handleDefaultAddressChange}
          className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition duration-200 h-12 flex justify-center items-center"
          disabled={btnLoading}
        >
          {!btnLoading ? "SAVE" : <Spinner />}
        </button>
      </div>
    </>
  );
};

export default DefaultAddress;
