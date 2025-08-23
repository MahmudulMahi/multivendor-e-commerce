import useAreaById from "@/hooks/api/address/useArea";
import useCityById from "@/hooks/api/address/useCity";
import useDivision from "@/hooks/api/address/useDivision";
import useFetchSingAddressById from "@/hooks/api/address/useFetchSingleAddress";
import { privateRequest } from "@/lib/axios";
import { networkErrorHandeller, responseHandler } from "@/utils/helpers";
import { notifySuccess } from "@/utils/toast";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Spinner from "../loader/Spinner";
const EditAddress = ({ refetch, setOpenDrawer, addressId }) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { data: singleAddress } = useFetchSingAddressById(addressId);
  const [divisionId, setDivisionId] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const { data, loading, error } = useDivision();
  const { data: cityData, loading: cityLoading } = useCityById(
    selectedDivision?.value
  );
  const { data: areaData, loading: areaLoading } = useAreaById(
    selectedCity?.city_id
  );
  //   division change state
  const handleMainSelectChange = (e) => {
    // setDivisionId(e?.id);
    setSelectedDivision(e);

    if (e.id !== selectedDivision?.value) {
      setSelectedCity(null);
      setSelectedArea(null);
    }
  };
  //   city select logic
  const handleCitySelect = (e) => {
    setSelectedCity(e);
    if (e.id !== selectedCity?.city_id) {
      setSelectedArea(null);
    }
  };
  //   area select logic
  const handleAreaSelect = (e) => {
    setSelectedArea(e);
  };
  // submit address form
  const [btnLoading, setBtnLoading] = useState(false);
  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      city_id: selectedCity?.value,
      area_id: selectedArea?.value,
      division_id: divisionId || selectedDivision?.value,
      country: "bangladesh",
      _method: "PUT",
    };
    setBtnLoading(true);
    try {
      const response = await privateRequest.post(
        `/user/address/${addressId}`,
        payload
      );
      if (responseHandler(response)) {
        setBtnLoading(false);
        notifySuccess(response?.data?.message);
        setOpenDrawer(false);
        refetch();
      }
    } catch (error) {
      networkErrorHandeller(error);
      setBtnLoading(false);
    }
  };

  // set previous value
  useEffect(() => {
    setValue("type", singleAddress?.type);
    setValue("name", singleAddress?.name);
    setValue("phone", singleAddress?.phone);
    setValue("address_line1", singleAddress?.address_line1);
    setValue("postal_code", singleAddress?.postal_code);
    setValue("division_id", singleAddress?.singleAddress?.division?.id);
    setValue("city_id", singleAddress?.city?.id);
    setValue("area_id", singleAddress?.area?.id);
    setSelectedDivision({
      label: singleAddress?.division?.name,
      value: singleAddress?.division?.id,
    });
    setSelectedCity({
      label: singleAddress?.city?.name,
      value: singleAddress?.city?.city_id,
      city_id: singleAddress?.city?.city_id,
    });
    setSelectedArea({
      label: singleAddress?.area?.name,
      value: singleAddress?.area?.id,
    });
  }, [singleAddress]);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto p-2    rounded-md space-y-3"
      >
        {/* Address Type (Radio Buttons) */}
        <div>
          <label className="block font-medium mb-1">Address Type</label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="home"
                {...register("type", {
                  required: "Please select address type",
                })}
                className="form-radio text-blue-600"
              />
              <span>Home</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="office"
                {...register("type", {
                  required: "Please select address type",
                })}
                className="form-radio text-blue-600"
              />
              <span>Office</span>
            </label>
          </div>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>
        <div className="flex justify-between gap-2">
          {" "}
          {/* Name */}
          <div className="w-full">
            <label className="block font-medium text-sm mb-1">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className={`w-full border p-2 rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* Phone */}
          <div className="w-full">
            <label className="block font-medium mb-1 text-sm">Phone</label>
            <input
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
              className={`w-full border p-2 rounded-md ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
        {/* Address */}
        <div className="w-full">
          <label className="block font-medium mb-1 text-sm">Address</label>
          <input
            {...register("address_line1", {
              required: "Address is required",
            })}
            className={`w-full border p-2 rounded-md ${
              errors.address_line1 ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your address"
          />
          {errors.address_line1 && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address_line1.message}
            </p>
          )}
        </div>
        <div className="flex justify-between gap-2">
          {" "}
          {/* Postal Code */}
          <div className="w-full">
            <label className="block font-medium mb-1 text-sm">
              Postal Code
            </label>
            <input
              {...register("postal_code", {
                required: "Postal Code is required",
                pattern: {
                  value: /^[0-9]{4,6}$/,
                  message: "Enter a valid postal code",
                },
              })}
              className={`w-full border p-2 py-1.5 rounded-md ${
                errors.postal_code ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your postal code"
            />
            {errors.postal_code && (
              <p className="text-red-500 text-sm mt-1">
                {errors.postal_code.message}
              </p>
            )}
          </div>
          {/* Main Category */}
        </div>
        <div className="w-full">
          <label className="block font-medium mb-1 text-sm">Division</label>
          <Select
            options={data}
            onChange={handleMainSelectChange}
            value={selectedDivision}
          />
        </div>

        {/* City */}
        <div>
          <label className="block font-medium mb-1 text-sm">City</label>
          <Select
            options={cityData}
            value={selectedCity}
            onChange={handleCitySelect}
            placeholder="Select a city"
            isDisabled={!cityData?.length}
          />
        </div>

        {/* Area */}
        <div>
          <label className="block font-medium mb-1 text-sm">Area</label>
          <Select
            options={areaData}
            value={selectedArea}
            onChange={handleAreaSelect}
            placeholder="Select an area"
            isDisabled={!areaData?.length || !cityData?.length || !selectedCity}
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition duration-200 h-12 flex justify-center items-center"
          disabled={btnLoading}
        >
          {!btnLoading ? "Submit" : <Spinner />}
        </button>
      </form>
    </div>
  );
};
export default EditAddress;
