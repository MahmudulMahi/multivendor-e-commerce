import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import { PasswordInput, TextInput } from "@/components/ui/Input";
import { CiLock, FiPhone } from "@/icons";
import { validateEmailPhone, validatePassword } from "@/utils/validation";
import { login } from "@/lib/api/auth/auth";
import { networkErrorHandeller, responseHandler } from "@/utils/helpers";
import { notifySuccess } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/route";

const Login = () => {
  const router = useRouter();
  const { login: userLogin } = useAuth();
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
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    let loginData = { password: data?.password };
    if (isEmail) {
      loginData = { ...loginData, email: data.email };
    } else {
      loginData = { ...loginData, phone: data.email };
    }
    // login api integrate here
    try {
      const response = await login(loginData);
      if (responseHandler(response)) {
        setSuccess({
          loading: false,
          success: true,
        });
        notifySuccess(response?.data?.message);
        userLogin(response?.data?.data?.token);
        router?.push(
          router?.query?.redirectTo ? router?.query?.redirectTo : "/"
        );
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
          Don&apos;t have an account ?{" "}
          <Link href={ROUTES?.REGISTER} aria-label="bajar.net" className="hover:underline">
            {" "}
            SignUp Now
          </Link>
        </div>
      }
      footer={<Link href={ROUTES?.FORGET_PASSWORD} aria-label="bajar.net" className="hover:underline">Fogot Password?</Link>}
      text="Welcome to Baajar. Login"
    >
      <TextInput
        register={register}
        name="email"
        label={
          <p className="px-3 flex items-center text-white gap-2 font-semibold text-sm ">
            {" "}
            <FiPhone /> Phone Number {" "}
          </p>
        }
        rules={validateEmailPhone}
        errors={errors}
        trigger={trigger}
        placeholder={"Phone Number"}
      />
      <PasswordInput
        register={register}
        name="password"
        label={
          <p className="px-3 flex items-center text-white gap-2 font-semibold text-sm ">
            {" "}
            <CiLock /> Password{" "}
          </p>
        }
        rules={validatePassword}
        errors={errors}
        trigger={trigger}
        placeholder={"Password"}
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
          Login
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Login;
