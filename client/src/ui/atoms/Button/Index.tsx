import React from "react";
import { Cn } from "../../../utils/twCn";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={Cn(
        "inline-block outline-none rounded-full px-10 py-3 bg-bright-yellow  border border-overlay-light text-[18px] font-[500]",
        className,
        { ...props }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
