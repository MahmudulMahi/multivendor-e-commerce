import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible, FaCheck } from "@/icons";
import clsx from "clsx";
export const TextInput = ({
  label,
  name,
  register,
  required,
  errors = {},
  minLength,
  maxLength,
  placeholder,
  rules = {},
  trigger,
  className,
  ...rest
}) => {
  const registered = register ? register(name, rules) : {};
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 font-semibold text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        type="text"
        placeholder={placeholder}
        {...registered}
        onChange={(e) => {
          register && registered?.onChange(e); // call RHF's onChange
          trigger && trigger(name); // trigger validation
        }}
        onBlur={(e) => {
          register && registered?.onBlur(e); // call RHF's onBlur
          trigger && trigger(name); // trigger validation
        }}
        className={`w-full bg-[#F3F4F6] px-3 h-[46px]  rounded-md outline-0 placeholder:text-[#6B7280] text-black/70  ${
          errors[name] ? "border-red-500" : " " 
        } ${  className&& className}`}
        {...rest}
      />

      {errors[name] && (
        <p className="text-sm text-gray-300  px-2">{errors[name].message}</p>
      )}
    </div>
  );
};
export const PasswordInput = ({
  label,
  name,
  register,
  required,
  errors = {},
  minLength,
  maxLength,
  placeholder,
  rules = {},
  trigger,
  errorColor="text-gray-300",
  ...rest
}) => {
  const [show, setShow] = useState(false);
  const registered = register ? register(name, rules) : {};
  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 font-semibold text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...registered}
        onChange={(e) => {
          registered.onChange(e); // call RHF's onChange
          trigger && trigger(name); // trigger validation
        }}
        onBlur={(e) => {
          registered.onBlur(e); // call RHF's onBlur
          trigger && trigger(name); // trigger validation
        }}
        className={`w-full bg-[#F3F4F6] px-3 h-[46px]  rounded-md outline-0 placeholder:text-[#6B7280] text-black/70   ${
          errors[name] ? "border-gray-500 border" : " "
        }`}
        {...rest}
       
      />

      {errors[name] && (
        <p className={`text-sm  ${errorColor?errorColor:'text-gray-300'} px-2`}>{errors[name].message}</p>
      )}
      <div
        onClick={() => setShow((prev) => !prev)}
        className={clsx(
          "absolute right-3 transform -translate-y-1/2 text-xl text-gray-500 cursor-pointer",
          !errors[name] && label && "top-6/9",
          !label || (errors[name] && "top-1/2")
        )}
      >
        {show ? <AiFillEyeInvisible /> : <AiFillEye />}
      </div>
    </div>
  );
};
// custom checkbox
export const Checkbox = ({ checked, onChange,label }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none ">
      <input
        type="checkbox"
        checked={checked}
        onChange={ onChange }
        className="hidden"
      />

      <div
        className={`border-[#D1D5DB] w-5 h-5 border-2 flex items-center justify-center rounded-md transition-all duration-200 ${
          checked ? "bg-red-600 border-red-600" : "bg-white border-gray-400"
        }`}
      >
        {checked && <FaCheck className="text-white text-lg" />}
      </div>
      {label &&<span className="text-sm text-[#323232] font-medium ">{label}</span>}
    </label>
  );
};
