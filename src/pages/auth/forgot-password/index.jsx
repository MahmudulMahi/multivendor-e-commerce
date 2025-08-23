import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Input";
import { FiPhone } from "@/icons";
import { validateEmailPhone } from "@/utils/validation";
import { forgotPassword } from "@/lib/api/auth/auth";
import { networkErrorHandeller, responseHandler } from "@/utils/helpers";
import { notifySuccess } from "@/utils/toast";
import { ROUTES } from "@/constants/route";

const ForgotPassword = () => {
  const router = useRouter();
  const [success, setSuccess] = useState({
    loading: false,
    success: false,
  });
  // hook form use
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const onSubmit = async (data) => {
    setSuccess({
      ...success,
      loading: true,
    });

    // ForgotPassword api integrate here
    try {
      const response = await forgotPassword(data);
      console.log(response);
      if (responseHandler(response)) {
        setSuccess({
          loading: false,
          success: true,
        });
        notifySuccess(response?.data?.message);
        router.push(`/auth/forgot-otp?number=${response?.data?.data?.phone}`);
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
    <AuthLayout
      onsubmit={handleSubmit(onSubmit)}
      icon
      link={
        <div className="flex items-center font-normal text-sm md:text-[15px]">
          Already have an account ?
          <Link
            href={ROUTES?.LOGIN}
            aria-label="bajar.net"
            className="hover:underline"
          >
            {" "}
            Sign In Now
          </Link>
        </div>
      }
      text="Welcome to Baajar. ForgotPassword"
    >
      <TextInput
        register={register}
        name="phone"
        label={
          <p className="px-3 flex items-center text-white gap-2 font-semibold text-sm ">
            {" "}
            <FiPhone /> Phone Number  {" "}
          </p>
        }
        rules={validateEmailPhone}
        errors={errors}
        trigger={trigger}
        placeholder={"enter phone number"}
      />

      <div className=" flex justify-center">
        <Button
          className="rounded-lg mt-8  font-bold !w-[188px]  !h-[48px]"
          type="submit"
          textSize="text-xs lg:text-sm"
          bgColor="bg-white"
          color="text-primary"
          isLoading={success?.loading}
          isSuccess={success?.success}
        >
          Send OTP{" "}
        </Button>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
