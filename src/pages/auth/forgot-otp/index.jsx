import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import { forgot_otp, forgotPassword, resendOtp } from "@/lib/api/auth/auth";
import { networkErrorHandeller, responseHandler } from "@/utils/helpers";
import { notifySuccess } from "@/utils/toast"; 
const VerifyOtp = () => {
  const router = useRouter();
  const [success, setSuccess] = useState({
    loading: false,
    success: false,
  });
  // hook form use
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      otp: "XXXX",
    },
  });
  // api call for otp verify
  const onSubmit = async (data) => {
    setSuccess({
      ...success,
      loading: true,
    });
    try {
      const response = await forgot_otp({
        code: data?.otp,
        phone: router?.query?.number,
      });
      if (responseHandler(response)) {
        setSuccess({
          loading: false,
          success: true,
        });
        notifySuccess(response?.data?.message);
        router?.push(
          `/auth/forgot-password-setup?number=${router?.query?.number}&code=${data?.otp}`
        );
        // router?.push(
        //   router?.query?.redirectTo ? router?.query?.redirectTo : "/"
        // );
      }
    } catch (error) {
      networkErrorHandeller(error);
      setSuccess({
        loading: false,
        success: false,
      });
    }
  };
  // resend api call here
  const reSend = async (data) => {
    try {
      const value = { phone: router?.query?.number };
      const response = await forgotPassword(value);
      if (responseHandler(response)) {
        notifySuccess(response?.data?.message);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  return (
    <AuthLayout
      onsubmit={handleSubmit(onSubmit)}
      link={
        <div className="flex flex-col items-center font-normal text-sm md:text-[15px]">
          <p>Didn&apos;t get the OTP</p>
          <span
            onClick={reSend}
            aria-label="bajar.net"
            className="hover:underline cursor-pointer"
          >
            {" "}
            Resend Now
          </span>
        </div>
      }
      text="Verify your phone number"
    >
      <div className=" flex flex-col items-center justify-center">
        <p className="text-center pt-8 pb-5 font-normal">
          We have sent an OTP to your phone number <br />
          <span className="font-semibold text-white text-[15px]">
            {router?.query?.number}
          </span>
        </p>
        <p className="text-center text-white font-semibold text-[15px]">
          Enter OTP number*
        </p>
        <Controller
          name="otp"
          control={control}
          render={({ field, fieldState }) => (
            <OtpInput
              value={field.value}
              onChange={field.onChange}
              numInputs={4}
              renderSeparator={<span></span>}
              renderInput={(props) => (
                <input
                  defaultValue="X"
                  {...props}
                  style={{
                    width: "4rem",
                    height: "4rem",
                    margin: "0.25rem",
                    borderRadius: "0.5rem",
                    outline: "none",
                    backgroundColor: "#fff",
                    textAlign: "center",
                    fontSize: "2rem",
                    border: "1px solid #ccc",
                  }}
                />
              )}
            />
          )}
        />

        <Button
          className="rounded-lg mt-8  font-bold !w-[188px]  !h-[48px]"
          type="submit"
          textSize="text-xs lg:text-sm"
          bgColor="bg-white"
          color="text-primary"
          isLoading={success?.loading}
          isSuccess={success?.success}
        >
          Verify
        </Button>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtp;
