// email or phone validation rules
export const validateEmailPhone = {
  required: "Email or phone is required",
  validate: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const bdPhoneRegex = /^(?:\+88)?01[3-9]\d{8}$/;
    if (!value) return "This field is required";
    if (!emailRegex.test(value) && !bdPhoneRegex.test(value)) {
      return "Enter a valid email or Bangladeshi phone number";
    }
    return true;
  },
};

// password validation rules
export const validatePassword = {
  required: "Password is required",
  validate: (value) => {
    if (value.length < 6) return "At least 6  characters";
    if (value.length > 20) return "Max 20 characters";
    return true;
  },
};
// password validation rules
export const validateName = {
  required: "Name is required",
  validate: (value) => {
    if (value.length < 2) return "At least 6  characters";
    if (value.length > 20) return "Max 20 characters";
    return true;
  },
};
export const getValidateConfirmPassword = (watch) => ({
  required: "Password is required",
  validate: (value) => {
    if (value.length < 6) return "At least 6 characters";
    if (value.length > 20) return "Max 20 characters"; 
    return true;
  },
});
