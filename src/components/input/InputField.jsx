import React from "react";

const InputField = ({
  type = "text",
  placeholder = "",
  className = "",
  onChange,
  onKeyUp,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  );
};

export default InputField;
