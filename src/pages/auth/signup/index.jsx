import AuthLayout from "@/components/auth/AuthLayout";
import { TextInput } from "@/components/ui/Input";
import { ROUTES } from "@/constants/route";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form"; 
import { validateEmailPhone, validateName } from "@/utils/validation";
import Button from "@/components/ui/Button";
import {  signup } from "@/lib/api/auth/auth";
import { networkErrorHandeller, responseHandler } from "@/utils/helpers";
import { useRouter } from "next/router";
import { notifySuccess } from "@/utils/toast";
const SignUp = () => {
  const [success, setSuccess] = useState({
    loading: false,
    success: false,
  });
  const router = useRouter();
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
    // signup api integrate here
    try {
      const response = await signup(data); 
      if (responseHandler(response)) {
        setSuccess({
          loading: false,
          success: true,
        });
        notifySuccess(response?.data?.message); 
        router?.push(`/auth/verify-otp?number=${response?.data?.data?.phone}`);
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
      text="Create your Baajar Account"
      link={
        <div className="flex items-center font-normal text-sm md:text-[15px]">
          {" "}
          Already have an account ?{" "}
          <Link href={ROUTES?.LOGIN} aria-label="bajar.net" className="hover:underline">
            {" "}
            Sign In Now
          </Link>
        </div>
      }
      //   footer="Fogot Password?"
    >
      <TextInput
        register={register}
        name="name"
        label={
          <p className="px-3 flex items-center text-white gap-2 font-semibold text-sm ">
            {" "}
            Full Name{" "}
          </p>
        }
        rules={validateName}
        errors={errors}
        trigger={trigger}
        required={true}
        placeholder={"Full Name"}
      />
      <TextInput
        register={register}
        name="phone"
        label={
          <p className="px-3 flex items-center text-white gap-2 font-semibold text-sm ">
            {" "}
            Phone Number 
          </p>
        }
        rules={validateEmailPhone}
        errors={errors}
        trigger={trigger}
        placeholder={"Phone"}
      />
      <div className="font-normal text-sm lg:text-[15px] my-8">
        By clicking <span className="font-semibold">"SIGN UP"</span> I agree to <Link  aria-label="bajar.net"  href={ROUTES?.TERMS_CONDITION} className="font-semibold hover:underline cursor-pointer">Terms of Use</Link> and <Link href={ROUTES?.PRIVACY_POLICY}  aria-label="bajar.net" className="font-semibold hover:underline cursor-pointer">Privacy Policy</Link>
      </div>
      <div className=" flex justify-center">
        <Button
          className="rounded-lg    font-bold !w-[188px]  !h-[48px]"
          type="submit"
          textSize="text-xs lg:text-sm"
          bgColor="bg-white"
          color="text-primary"
          isLoading={success?.loading}
          isSuccess={success?.success}
        >
          SIGN UP
        </Button>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
