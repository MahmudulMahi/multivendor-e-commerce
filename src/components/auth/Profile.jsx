import React, { useEffect, useState } from "react";
import { BiCamera } from "@/icons";
import { TextInput } from "../ui/Input";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { notifySuccess } from "@/utils/toast";
import { networkErrorHandeller, responseHandler } from "@/utils/helpers";
import { profileUpdate } from "@/lib/api/profile/profile";
import Button from "../ui/Button";
const Profile = ({ setIsOpen }) => {
  const { user, fetchProfile } = useAuth();
  const [success, setSuccess] = useState({
    loading: false,
    success: false,
  });
  const { register, setValue, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("/profile.png");
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file); // store actual file
      setPreviewUrl(URL.createObjectURL(file)); // store preview
    }
  };
  useEffect(() => {
    if (user?.name) {
      setValue("name", user.name);
      setPreviewUrl(`${process?.env.NEXT_PUBLIC_API_SERVER}${user?.image}`);
    }
  }, [user?.name, setValue]);
  const onsubmit = async (data) => {
    setSuccess({
      ...success,
      loading: true,
    });
    try {
      const formData = new FormData();
      formData.append("name", data?.name);
      if (image) formData.append("image", image);
      formData.append("_method", "PUT");
      const response = await profileUpdate(formData);
      console.log(response);
      if (responseHandler(response)) {
        setSuccess({
          loading: false,
          success: true,
        });
        fetchProfile();
        notifySuccess(response?.data?.message);
        setTimeout(() => {
          setSuccess({
            loading: false,
            success: false,
          });
        }, 700);
        setIsOpen(false);
      }
    } catch (error) {
      networkErrorHandeller(error);
      setSuccess({
        loading: false,
        success: false,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <label className="relative w-32 h-32 mx-auto cursor-pointer block">
        {/* Profile Image */}
        <div className="w-full h-full rounded-full border-4 border-dashed border-blue-400 p-1 flex justify-center items-center  ">
          <img
            src={previewUrl} // Replace with your image path
            alt="Profile"
            className="w-full h-full object-cover rounded-full "
          />
        </div>
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          className="hidden h-full"
          onChange={handleUpload}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-blue-600 p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-700">
          <BiCamera className="text-white w-5 h-5" />
        </div>
      </label>
      <TextInput
        register={register}
        name="name"
        label={
          <p className="px-3 flex items-center text-black gap-2 font-semibold text-sm ">
            {" "}
            Full Name{" "}
          </p>
        }
      />
      <div className=" flex justify-center">
        <Button
          className="rounded-lg mt-8  font-bold !w-[188px]  !h-[48px]"
          type="submit"
          textSize="text-xs lg:text-sm"
          bgColor="bg-primary"
          color="text-white"
          isLoading={success?.loading}
          isSuccess={success?.success}
        >
          Profile Update
        </Button>
      </div>
    </form>
  );
};

export default Profile;
