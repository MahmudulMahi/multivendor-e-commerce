import React, { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import { useAuth } from "@/context/AuthContext";
import { useDeleteModal } from "@/context/DeleteModalContext";
import { privateRequest } from "@/lib/axios";
import { networkErrorHandeller, responseHandler } from "@/utils/helpers";
import { notifyError, notifySuccess } from "@/utils/toast";
import useAddress from "@/hooks/api/address/useAddress";
import EditAddress from "@/components/address/EditAddress";
import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import useDefaultAddress from "@/hooks/api/address/useDefaultAddress";
import AddressSkeleton from "@/components/loader/skeleton/AccountSkeleton/AddressSkeleton";
import CreateAddress from "@/components/address/CreateAddress";
const Address = () => {
  const { user } = useAuth();
  const { openModal } = useDeleteModal();
  const { data: addressData, loading, refetch } = useAddress();
  // address edit area code
  const [addressId, setAddressId] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openType, setOpenType] = useState("");
  const handleOpenDrawer = () => {
    setOpenType("default");
    setOpenDrawer(!openDrawer);
  };
  //  REMOVE ADDRESS
  const removeAddress = async (id) => {
    try {
      const response = await privateRequest.delete(`/user/address/${id}`);
      if (responseHandler(response)) {
        notifySuccess(response?.data?.message);
        refetch();
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  //   change default address
  const { handleDefaultAddress, data, error } = useDefaultAddress(); 
  useEffect(() => {
    if (!loading && responseHandler(data)) {
      notifySuccess(data?.data?.message);
      refetch();
    }
    if (error) {
      notifyError("Default address not set");
    }
  }, [data]);
  return (
    <>
      {" "}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4 mb-10">
          {Array.from({ length: 9 }).map((_, idx) => (
            <AddressSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <div className="   mx-auto text-[#030712] border-[#E5E7EB]">
          <Drawer
            open={openDrawer}
            onClose={handleOpenDrawer}
            direction="right"
            style={{
              width: "100%",
              maxWidth: "450px",
            }}
            className="w-full sm:w-[450px]"
          >
            {/* CREATE ADDRESS  */}
            {openType === "create" && (
              <CreateAddress refetch={refetch} setOpenDrawer={setOpenDrawer} />
            )}
            {/* EDIT ADDRESS  */}
            {openType === "edit" && (
              <EditAddress
                refetch={refetch}
                setOpenDrawer={setOpenDrawer}
                addressId={addressId}
              />
            )}
          </Drawer>

          <div className="flex justify-between pb-6">
            <h1 className="text-2xl font-semibold  ">Address Book</h1>
           <button
                    className="text-blue-600 text-sm px-2 py-1 border border-gray-500 rounded-lg"
                    onClick={() => {
                      setOpenType("create");
                      setOpenDrawer(true); 
                    }}
                  >
                    Add New Address
                  </button>
          </div>
          {/* Profile & Address Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 mb-10">
            {/* Address Book */}
            {addressData?.map((address, idx) => (
              <div
                className={`bg-white shadow pb-10 px-4 pt-4 rounded border relative ${
                  address?.default_address === 1
                    ? "border-primary"
                    : "border-[#E5E7EB]"
                } `}
                key={idx}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Address Book</h3>
                  <button
                    className="text-blue-600 text-sm"
                    onClick={() => {
                      setOpenType("edit");
                      setOpenDrawer(true);
                      setAddressId(address?.id);
                    }}
                  >
                    EDIT
                  </button>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* Shipping Address */}
                  <div>
                    {address?.default_address === 1 && (
                      <h1 className="text-sm font-semibold text-gray-600 mb-1">
                        DEFAULT SHIPPING ADDRESS
                      </h1>
                    )}

                    <p className="font-semibold">{address?.name}</p>
                    <p className="font-semibold">{address?.adress_lin1}</p>
                    <p>
                      {address?.division?.name} - {address?.city?.name} -{" "}
                      {address?.area?.name}
                    </p>
                    <p>(+88) {address?.phone}</p>
                    <div className="w-full flex justify-between   absolute bottom-2 left-0 px-4 gap-2">
                      <button
                        className="w-full text-center text-[#030712] items-center text-nowrap text-sm border px-2 py-1 rounded-md border-[#E5E7EB] bg-primary/20 hover:bg-primary/80 hover:text-white"
                        onClick={() =>
                          openModal(() => removeAddress(address?.id))
                        }
                      >
                        🗑 Remove
                      </button>
                      {address?.default_address !== 1 && (
                        <button
                          className="  text-[#030712] items-center text-nowrap text-sm border px-2 py-1 rounded-md border-[#E5E7EB] hover:bg-green-500/20 w-full"
                          onClick={() => {
                            handleDefaultAddress({ address_id: address?.id });
                          }}
                        >
                          {" "}
                          Default{" "}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
Address.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Address;
