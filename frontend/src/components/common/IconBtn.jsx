import React from "react";

const IconBtn = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center justify-center gap-x-2 rounded-md py-2 px-5 font-semibold transition-all duration-200 ${
        outline
          ? "border border-blue-500 bg-transparent text-blue-500"
          : "bg-blue-500 text-white"
      } ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-blue-500"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;