import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { FaCheck, FaSpinner } from "@/icons";
const Button = ({
  children,
  type = "button",
  //   variant = "",
  disabled = false,
  isLoading = false,
  isSuccess = false,
  bgColor = "bg-primary",
  color = "text-white/80",
  rounded = "rounded-full",
  textSize = "text-2xl",
  onClick = () => {},
  className = "",
}) => {
  const btnRef = useRef(null);
  const [isShrinking, setIsShrinking] = useState(false);
  const [showText, setShowText] = useState(true);
  const [showSuccessText, setShowSuccessText] = useState(false);
  const handleClick = (e) => {
    const button = btnRef.current;
    if (!button) return;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.className = "absolute bg-black/30 rounded-full animate-ripple";
    circle.style.left = `${
      e.clientX - button.getBoundingClientRect().left - radius
    }px`;
    circle.style.top = `${
      e.clientY - button.getBoundingClientRect().top - radius
    }px`;
    button.appendChild(circle);
    // Steps
    setTimeout(() => {
      circle.remove();
    }, 400);
  };
  useEffect(() => {
    if (isLoading) {
      setIsShrinking(true);
      setShowText(false);
      setShowSuccessText(false);
    } else if (isSuccess) {
      setIsShrinking(false);
      setShowSuccessText(true);
    } else {
      const resetTimeout = setTimeout(() => {
        setShowSuccessText(false);
        setShowText(true);
      }, 100); // Reset back to original text
      return () => clearTimeout(resetTimeout);
    }
  }, [isLoading, isSuccess]);
  //  button defualt class
  const baseStyles = `
  relative overflow-hidden flex items-center justify-center
  font-poppins  font-medium leading-5
  border transition-all duration-500 ease-in-out gap-1 lg:gap-1.5
    text-primary   focus:outline-none
  hover:opacity-85 cursor-pointer  
  ${isShrinking ? ` ` : "w-full h-12 px-6"}
`;

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={(e) => {
        handleClick(e), onClick(e);
      }}
      disabled={isLoading || isSuccess || disabled}
      //   disabled={disabled || loading}
      className={clsx(
        baseStyles,
        // variants[variant],
        disabled && "opacity-50 cursor-not-allowed",
        bgColor,
        color,
        rounded,
        textSize,
        className
      )}
      style={
        isShrinking && btnRef.current
          ? {
              width: `${btnRef.current.clientHeight}px`,
              height: `${btnRef.current.clientHeight}px`,
            }
          : {}
      }
    >
      {isLoading ? (
        <FaSpinner className={`${color?color:'text-primary'} animate-spin  text-lg`} />
      ) : isSuccess && showSuccessText ? (
        <span className="flex items-center gap-1 text-sm animate-fade-up">
          <FaCheck className="text-green-300" /> Success
        </span>
      ) : (
        showText &&  children 
      )}
    </button>
  );
};

export default Button;
